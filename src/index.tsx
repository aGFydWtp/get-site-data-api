import { Hono } from 'hono';

import { OgpHandler, TitleHandler } from './handlers';

const days = 24 * 60 * 60;

type Bindings = {
  LINK_KV: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/api/site-data', async (c) => {
  const url = c.req.query('url');
  if (url === undefined) {
    return c.body('Bad Request', 400);
  }

  // KV にキャッシュがあるか見にいく
  const cachedData = await c.env.LINK_KV.get(url);
  if (cachedData) {
    c.header('Cache-Control', `public, s-maxage=${1 * days}`);
    return c.json(JSON.parse(cachedData));
  }

  const decodedUrl = decodeURIComponent(url);

  const siteRes = await fetch(decodedUrl);
  if (!siteRes.ok) {
    return c.body('Not Found', 404);
  }

  const titleHandler = new TitleHandler();
  const ogpHandler = new OgpHandler();
  const result = new HTMLRewriter().on('title', titleHandler).on('meta', ogpHandler).transform(siteRes);
  // stream なので待つ
  await result.text();

  const response = { ...titleHandler, ...ogpHandler };

  // KV に1週間のキャッシュを作成
  await c.env.LINK_KV.put(url, JSON.stringify(response), { expirationTtl: days * 7 });

  c.header('Cache-Control', `public, s-maxage=${1 * days}`);
  return c.json(response);
});

export default app;
