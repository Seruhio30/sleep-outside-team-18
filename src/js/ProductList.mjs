import { renderListWithTemplate } from "./utils.mjs";


export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
  renderListWithTemplate(productCardTemplate, this.listElement, list);
}

}

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p>Precio: ${product.price}</p>
    </li>
  `;
}
