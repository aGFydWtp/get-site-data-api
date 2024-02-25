export class OgpHandler {
  ogpTitle: string;
  ogpDescription: string;
  ogpImageUrl: string;
  ogpSiteName: string;

  constructor() {
    this.ogpTitle = '';
    this.ogpDescription = '';
    this.ogpImageUrl = '';
    this.ogpSiteName = '';
  }
  element(element: Element) {
    const property = element.getAttribute('property');

    switch (property) {
      case 'og:title':
        if (!this.ogpTitle) this.ogpTitle = element.getAttribute('content') ?? '';
        break;
      case 'og:description':
        if (!this.ogpDescription) this.ogpDescription = element.getAttribute('content') ?? '';
        break;
      case 'og:image':
        if (!this.ogpImageUrl) this.ogpImageUrl = element.getAttribute('content') ?? '';
        break;
      case 'image':
        if (!this.ogpImageUrl) this.ogpImageUrl = element.getAttribute('content') ?? '';
        break;
      case 'og:site_name':
        if (!this.ogpSiteName) this.ogpSiteName = element.getAttribute('content') ?? '';
        break;
      default:
        break;
    }
  }
}

export class TitleHandler {
  title: string;

  constructor() {
    this.title = '';
  }

  text(text: Text) {
    if (!this.title && text.text) {
      this.title = text.text;
    }
  }
}
