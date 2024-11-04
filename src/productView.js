// Importin vajalikud osad

import { fetchProductById } from "./api.js";
import { addToCart } from "./cart.js";
import inventoryInstance from "./inventory.js";
import { Product } from "./product.js";
import { navigate } from "./router.js";

export const loadProductView = async (productId) => {
  const productData = await fetchProductById(productId);

  if (!productData) {
    console.error("Toote andmeid ei leitud");
    return;
  }

  const product = new Product(
    productData.id,
    productData.title,
    productData.price,
    productData.description,
    productData.image
  );

  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; 

  const productDetailElement = document.createElement("div");
  productDetailElement.classList.add("product-detail-container");
  productDetailElement.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.title}">
    </div>
    <div class="product-info">
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <p class="price">Hind: ${product.price}€</p>
      <p>Laos: ${inventoryInstance.getStock(product.id)} ühikut</p>
      <div class="quantity">
        <label for="quantity">Kogus:</label>
        <input id="quantity" type="number" min="1" max="${inventoryInstance.getStock(product.id)}" value="1">
      </div>
      <button class="btn-add-to-cart" id="add-to-cart-${product.id}">Lisa ostukorvi</button>
      <button class="btn-back" id="back-to-category">Tagasi kategooriasse</button>
    </div>
  `;

  productList.appendChild(productDetailElement);

  document.getElementById(`add-to-cart-${product.id}`).onclick = () => {
    const quantity = parseInt(document.getElementById("quantity").value);
    if (quantity > inventoryInstance.getStock(product.id)) {
      alert("Toode ei ole laos saadaval antud koguses!");
    } else {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      navigate("cart");
    }
  };

  document.getElementById("back-to-category").onclick = () => {
    const lastCategory = localStorage.getItem("lastCategory");
    if (lastCategory) {
      navigate("category", lastCategory);
    } else {
      navigate("home"); 
    }
  };
};
