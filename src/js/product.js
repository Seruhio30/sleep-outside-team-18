import { getParam, updateCartCount, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";

// Cargar header y footer
loadHeaderFooter();

const dataSource = new ProductData("tents");

const productId = getParam("product");

const productDet = new ProductDetails(productId, dataSource);
productDet.init();

// Update cart count in header on page load
document.addEventListener("DOMContentLoaded", updateCartCount);


