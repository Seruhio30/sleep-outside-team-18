import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        
        // add listener to Add to Cart button
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart(product) {
        // Leer lo que ya hay en localStorage
        let cart = JSON.parse(localStorage.getItem("so-cart"));
        // Si no existe o no es array, inicializarlo
        if (!Array.isArray(cart)) {
            cart = [];
        }
        // Agregar el nuevo producto
        cart.push(product);

        // Guardar el array completo
        setLocalStorage("so-cart", cart);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    return `<section class="product-detail">
        <h3>${product.Brand.Name}</h3>
//      <h2 class="divider">${product.NameWithoutBrand}</h2>
//      <img
//          class="divider"
//          src="${product.Image}"
//          alt="${product.NameWithoutBrand}"
//      />
//      <p class="product-card__price">$${product.FinalPrice}</p>
//      <p class="product__color">${product.Colors[0].ColorName}</p>
//      <p class="product__description">
//          ${product.DescriptionHtmlSimple}
//      </p>
//      <div class="product-detail__add">
//          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//      </div></section>`;
}