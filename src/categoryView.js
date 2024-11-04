// Importin vajalikud osad

import { fetchProductsByCategory } from "./api.js";
import { addToCart } from "./cart.js";
import { navigate } from "./router.js";
import { Product } from "./product.js";

export const loadCategoryView = async (category) => {

  localStorage.setItem("lastCategory", category);

  const products = await fetchProductsByCategory(category);
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((productData) => {
    const product = new Product(
      productData.id,
      productData.title,
      productData.price,
      productData.description,
      productData.image
    );

    const productElement = document.createElement("div");
    productElement.classList.add("product-item");
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.price}€</p>
      <button class="add-to-cart-button" id="add-to-cart-${product.id}">Lisa ostukorvi</button>
    `;


    productElement.querySelector(".add-to-cart-button").addEventListener("click", (e) => {
      e.stopPropagation(); 
      addToCart(product); 
    });

    productElement.addEventListener("click", () => navigate("product", product.id));
    productList.appendChild(productElement);
  });
};
