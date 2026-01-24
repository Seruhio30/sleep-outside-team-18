import { setLocalStorage, updateCartCount } from "./utils.mjs";
//const baseURL = import.meta.env.VITE_SERVER_URL;
const baseURL = "https://wdd330-backend.onrender.com/";

export default class ProductDetails {
  constructor(productId, datasource) {
    this.productId = productId;
    this.product = {};
    this.datasource = datasource;
  }

  async init() {
    // use the datasource to get the details for the current product
    this.product = await this.datasource.findProductById(this.productId);

    // render the product details
    this.renderProductDetails();

    // add listener to the Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }


  addProductToCart() {
    let cart = JSON.parse(localStorage.getItem("so-cart"));

    if (!Array.isArray(cart)) cart = [];

    // Buscar si ya existe el producto en el carrito
    const existingItem = cart.find((item) => String(item.Id) === String(this.product.Id));

    if (existingItem) {
      //Si ya existe, incrementar cantidad
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      // Si no existe, agregar con quantity = 1
      const itemToAdd = { ...this.product, quantity: 1 };
      cart.push(itemToAdd);
    }

    setLocalStorage("so-cart", cart);
    updateCartCount();
  }
}

function productDetailsTemplate(product) {
  //document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  //const productImage = document.querySelector("img"); //solo selecciona la primera etiqueta <img> en toda la página
  const productImage = document.querySelector(".product-image"); //usamos el class para que la imagen sea dinamica
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;

  // Calcular descuento
  const discount = calculateDiscount(
    product.SuggestedRetailPrice,
    product.FinalPrice
  );
  const savings = product.SuggestedRetailPrice - product.FinalPrice;

  // Mostrar precio con descuento
  const priceElement = document.querySelector(".product-card__price");
  if (discount > 0) {
    priceElement.innerHTML = `
      <div class="price-container">
        <div class="discount-info">
          <span class="discount-badge">${discount}% OFF</span>
          <span class="savings-text">You save $${savings.toFixed(2)}!</span>
        </div>
        <div class="price-info">
          <span class="original-price">Was: $${product.SuggestedRetailPrice}</span>
          <span class="final-price">Now: $${product.FinalPrice}</span>
        </div>
      </div>
    `;
  } else {
    priceElement.textContent = `$${product.FinalPrice}`;
  }

  document.querySelector(".product__color").textContent =
    product.Colors[0].ColorName;
  document.querySelector(".product__description").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}

// Función para calcular el porcentaje de descuento
function calculateDiscount(suggestedPrice, finalPrice) {
  if (suggestedPrice > finalPrice) {
    const discount = ((suggestedPrice - finalPrice) / suggestedPrice) * 100;
    return Math.round(discount);
  }
  return 0;
}