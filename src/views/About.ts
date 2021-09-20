import Default from "../layouts/Default";

export default class extends Default {
  constructor(params: string) {
    super(params);
    // set page title
    this.setTitle("About");
  }

  async getHtml() {
    return `
<div class="text-center">
      <h1 class="text-9xl">ABOUT US!!!</h1>
          <p class="text-2xl">We\'re Here</p>
<a class="text-red-500" href="/" data-link>Go back Home</a>
</div>
    `;
  }
}
