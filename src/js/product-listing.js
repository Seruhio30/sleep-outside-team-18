import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

// 1️Obtener la categoría desde la URL (?category=backpacks)
const category = getParam('category');

//  Cambiar el título de la página dinámicamente
if (category) {
  const titleElement = document.querySelector('.listing-title');

  // Convertir "sleeping-bags" → "Sleeping Bags"
  const niceCategory = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  titleElement.textContent = `Top Products: ${niceCategory}`;
}

// Crear el data source (API)
const dataSource = new ProductData();

//  Elemento donde se renderiza la lista
const listElement = document.querySelector('.product-list');

// Crear y ejecutar el listado
const myList = new ProductList(category, dataSource, listElement);
myList.init();
