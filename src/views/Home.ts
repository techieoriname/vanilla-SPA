import Default from "../layouts/Default";

export default class extends Default {
  constructor(params: string) {
    super(params);
    //set page title
    this.setTitle("Home page");
  }

  // template to be served
  async getHtml() {
    return `
<div class="text-center">
      <h1 class="text-9xl">BOOM!!!</h1>
          <p class="text-2xl">We\'re Here</p>
<a class="text-red-500" href="/about" data-link>Goto About</a>
<img class="w-4/12 mx-auto mt-5" src="/coding.gif" alt="coding">
</div>
    `;
  }
}
