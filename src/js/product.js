import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // get existing cart or create a new one
  const cart = getLocalStorage("so-cart") || [];

  // get current total price or initialize to 0
  let totalPrice = getLocalStorage("so-cart-total") || 0;

  // check if product already exists in cart
  const item = cart.find((i) => i.Id === product.Id);

  if (item) {
    // increment quantity if item already exists
    item.qty = (item.qty || 1) + 1;
    totalPrice += item.price; // add one item's price
  } else {
    // add new item with initial quantity
    cart.push({ ...product, qty: 1 });
    totalPrice += product.price; // add new item's price
  }

  // save updated cart and total price
  setLocalStorage("so-cart", cart);
  setLocalStorage("so-cart-total", totalPrice);

  return totalPrice;
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
