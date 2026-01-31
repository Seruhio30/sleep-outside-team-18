import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "../js/CheckoutProcess.mjs";
loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".summary");
checkout.init();
checkout.calculateOrderTotal();  