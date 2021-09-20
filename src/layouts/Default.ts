export default class {
  params: string;

  constructor(params: string) {
    this.params = params;
  }

  setTitle(title: string) {
    // update page title
    document.title = title;
  }

  // layout pre template codes
  async getHtml() {
    return "";
  }
}
