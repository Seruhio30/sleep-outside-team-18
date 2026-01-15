import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";



export default class ProductDetails {
    constructor(productId, datasource) {
        this.productId = productId;
        this.product = {};
        this.datasource = datasource;
    }

    async init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.datasource.findProductById(this.productId);

        // the product details are needed before rendering the HTML
        // once the HTML is rendered, add a listener to the Add to Cart button
        this.renderProductDetails();
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
        document.getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart(product) {
        // Leer lo que ya hay en localStorage
        let cart = JSON.parse(localStorage.getItem("so-cart"));
        // Si no existe o no es array, inicializarlo
        if (!Array.isArray(cart)) {
            cart = [];
        }
        // Agregar el nuevo producto
        cart.push(this.product);

        // Guardar el array completo
        setLocalStorage("so-cart", cart);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('productImage');
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.querySelector('.product-card__price').textContent = `$${product.FinalPrice}`;
  document.querySelector('.product__color').textContent = product.Colors[0].ColorName;
  document.querySelector('.product__description').innerHTML = product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;
}

