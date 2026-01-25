import { updateCartCount, loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.js";

// Cargar header y footer
loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
// Solo inicializar ProductList si el elemento existe
if (element) {
  const productList = new ProductList(category, dataSource, element);
  productList.init();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const alert = new Alert("main");
  alert.init();
});
