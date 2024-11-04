// Impordin Product klassi ja Inventory instance

import { Product } from "./product.js";
import inventoryInstance from "./inventory.js";

// Ostukorvi hoidmiseks kasutatav massiiv
let cart = [];

// Funktsioon ostukorvi sisu tagastamiseks
export const getCart = () => cart;

// Funktsioon toote lisamiseks ostukorvi
export const addToCart = (product) => {
  const existingProduct = cart.find(item => item.id === product.id);
  
  if (existingProduct) {
// Kontrollib, et kogus ei ületaks laoseisu
    if (existingProduct.quantity < inventoryInstance.getStock(product.id)) {
      existingProduct.quantity++;
    } else {
      alert("Toode ei ole laos saadaval rohkem kui " + inventoryInstance.getStock(product.id) + " tk.");
    }
  } else {
// Lisab toote ostukorvi, kui seda seal veel ei ole
    cart.push({ ...product, quantity: 1 });
  }
  updateCartView(); // Uuendab ostukorvi vaadet kohe pärast toote lisamist
};

// Funktsioon toote eemaldamiseks ostukorvist

export const removeFromCart = (productId) => {
// Eemaldab toote täielikult ostukorvist
  cart = cart.filter(item => item.id !== productId);
  updateCartView(); // Uuendab ostukorvi vaate pärast eemaldamist
};

// Funktsioon ostukorvi vaate uuendamiseks
export const updateCartView = () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalPrice = document.getElementById("cart-total-price");

  if (cartItemsContainer && cartTotalPrice) {
    cartItemsContainer.innerHTML = ""; // Tühjendab ostukorvi vaate 
    let total = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

// Loob ostukorvi toote elemendi

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="cart-item-info">
          <h2>${item.title}</h2>
          <p class="cart-item-price">Hind: €${item.price}</p>
          <div class="cart-item-quantity">
            <label for="quantity-${item.id}">Muuda kogust:</label>
            <input id="quantity-${item.id}" type="number" min="1" max="${inventoryInstance.getStock(item.id)}" value="${item.quantity}" class="quantity-input">
          </div>
          <p>Kokku: €${itemTotal.toFixed(2)}</p>
          <button class="remove-button">Eemalda</button>
        </div>
      `;
      
// Lisab sündmused koguse muutmise ja eemaldamise nuppudele

      cartItem.querySelector(".quantity-input").addEventListener("change", (event) => {
        updateCartQuantity(item.id, event.target.value);
      });
      
      cartItem.querySelector(".remove-button").addEventListener("click", () => {
        removeFromCart(item.id);
      });

      cartItemsContainer.appendChild(cartItem);
    });

// Kuvab kogu summa allosas
    cartTotalPrice.textContent = `€${total.toFixed(2)}`;
  }
};

// Funktsioon toote koguse uuendamiseks ostukorvis
export const updateCartQuantity = (productId, newQuantity) => {
  const product = cart.find(item => item.id === productId);
  const quantity = parseInt(newQuantity);

  if (quantity > inventoryInstance.getStock(productId)) {
    alert("Toode ei ole laos saadaval antud koguses!");
  } else if (quantity <= 0) {
    removeFromCart(productId); // Kui kogus on 0 või vähem, eemaldab toote täielikult
  } else {
    product.quantity = quantity;
    updateCartView(); // Uuendab ostukorvi vaadet
  }
};

// Funktsioon kogusumma arvutamiseks ostukorvis

export const getTotal = () => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
};
