# Get Site Data Api

Stack:

- Hono
- Cloudflare Workers
- Cloudflare KV

## Usage

Install:

```
bun install
```

Setup:

```
$ wrangler kv:namespace create "LINK_KV"
$ wrangler kv:namespace create --preview "LINK_KV"
```

Dev:

```
npm run dev
```

Deploy:

```
npm run deploy
```
