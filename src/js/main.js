//import Alert from "./Alert.js";
//import { updateCartCount, loadHeaderFooter } from "./utils.mjs";
import { loadHeaderFooter, initLogoAnimation } from "./utils.mjs";

loadHeaderFooter().then(() => {
  initLogoAnimation();
});
