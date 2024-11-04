// Importin vajalikud osad

import { getTotal, updateCartView } from "./cart.js";
import { navigate } from "./router.js";

export const loadCartView = () => {
  const mainContent = document.getElementById("product-list");
  mainContent.innerHTML = ""; // Tühjendab sisu

  // Loob ostukorvi konteineri
  const cartContainer = document.createElement("div");
  cartContainer.classList.add("cart-container");

  // Ostukorvi pealkiri
  const cartTitle = document.createElement("h1");
  cartTitle.classList.add("cart-title");
  cartTitle.textContent = "Sinu ostukorv";
  cartContainer.appendChild(cartTitle);

  // Ostukorvi toodete konteiner
  const cartItemsContainer = document.createElement("div");
  cartItemsContainer.classList.add("cart-items");
  cartItemsContainer.id = "cart-items";
  cartContainer.appendChild(cartItemsContainer);

  // Kogusumma ja tegevuspaneel
  const cartSummary = document.createElement("div");
  cartSummary.classList.add("cart-summary");
  cartSummary.innerHTML = `
    <div class="cart-total">
      <span>Kogusumma:</span>
      <span id="cart-total-price">€${getTotal()}</span>
    </div>
    <div class="cart-actions">
      <button class="checkout-button">Osta</button>
      <button class="continue-shopping-button">Jätka ostlemist</button>
    </div>
  `;
  cartContainer.appendChild(cartSummary);

  // Lisab kogu ostukorvi konteineri peamise sisu alasse
  mainContent.appendChild(cartContainer);

  // Kutsub `updateCartView`, et kuvada kõik ostukorvi tooted
  updateCartView();

  // Seadistab "Jätka ostlemist" nupu, et suunata avalehele
  const continueShoppingButton = cartContainer.querySelector(".continue-shopping-button");
  continueShoppingButton.addEventListener("click", () => navigate("home"));
};
