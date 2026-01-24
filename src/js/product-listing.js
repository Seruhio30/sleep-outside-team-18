import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

// Obtener la categoría del URL
const category = getParam("category");

// CAMBIAR EL TÍTULO DINÁMICAMENTE
if (category) {
  const titleElement = document.querySelector(".listing-title");

  // "sleeping-bags" → "Sleeping Bags"
  const formattedCategory = category
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  titleElement.textContent = `Top Products: ${formattedCategory}`;
}

// Inicializar listado
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

const myList = new ProductList(category, dataSource, listElement);
myList.init();
