import Alert from "./Alert.js";
import { updateCartCount, loadHeaderFooter } from "./utils.mjs";

// Cargar header y footer
loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const alert = new Alert("main");
  alert.init();
});
