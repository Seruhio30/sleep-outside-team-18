import { renderListWithTemplate } from "./utils.mjs";


function productCardTemplate(product) {
  // ✅ DEFINIR imageUrl DENTRO de la función
  const imageUrl = product.Images?.PrimaryMedium || "";

  const discount = calculateDiscount(
    product.SuggestedRetailPrice,
    product.FinalPrice
  );

  let priceHTML = "";
  if (discount > 0) {
    priceHTML = `
      <p class="product-card__price">
        <span class="discount-badge">${discount}% OFF</span>
        <span class="original-price">$${product.SuggestedRetailPrice}</span>
        <span class="final-price">$${product.FinalPrice}</span>
      </p>
    `;
  } else {
    priceHTML = `<p class="product-card__price">$${product.FinalPrice}</p>`;
  }

  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${imageUrl}" alt="${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        ${priceHTML}
      </a>
    </li>
  `;
}

// Función para calcular el porcentaje de descuento
function calculateDiscount(suggestedPrice, finalPrice) {
    if (suggestedPrice > finalPrice) {
        const discount = ((suggestedPrice - finalPrice) / suggestedPrice) * 100;
        return Math.round(discount);
    }
    return 0;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);

        this.renderList(list);
    }

    renderList(list) {
       
        // apply use new utility function instead of the commented code above
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}