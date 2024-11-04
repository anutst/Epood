// Impordin vajalikud funktsioonid ja klassid

import { fetchCategories, fetchProducts } from "./api.js";
import { navigate } from "./router.js";
import inventoryInstance from "./inventory.js";
import { Product } from "./product.js";
import { addToCart } from "./cart.js"; // Impordib addToCart funktsiooni ostukorvi haldamiseks

// Laoseisu algväärtustamine ja toodete lisamine laoseisu
async function initializeInventory() {
  const products = await fetchProducts();

  products.forEach((productData) => {
    const product = new Product(
      productData.id,
      productData.title,
      productData.price,
      productData.description,
      productData.image
    );
    // Lisab tootele juhusliku koguse laoseisu
    const randomStock = Math.floor(Math.random() * (20 - 5) + 5);
    inventoryInstance.addProduct(product, randomStock);
  });
}

// Kõigi toodete laadimine ja kuvamine
export const loadAllProducts = async () => {
  const products = await fetchProducts();
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";  // Tühjendab tooteala enne laadimist

  products.forEach((productData) => {
    const product = new Product(
      productData.id,
      productData.title,
      productData.price,
      productData.description,
      productData.image
    );

    // Loob tooteelemendi ja lisab selle HTMLi
    const productElement = document.createElement("div");
    productElement.classList.add("product-item");
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.price}€</p>
      <button id="add-to-cart-${product.id}">Lisa ostukorvi</button>
    `;

    // Lisab klikkimise sündmuse toote detailvaatesse liikumiseks
    productElement.onclick = () => navigate("product", product.id);

    // Lisab "Lisa ostukorvi" nupule vajaliku sündmuse
    const addToCartButton = productElement.querySelector(`#add-to-cart-${product.id}`);
    addToCartButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Väldib toote detailvaatesse suunamist
      addToCart(product);      // Lisab toote ostukorvi
      alert("Toode lisati ostukorvi!"); // Näitab kinnitust
    });

    productList.appendChild(productElement);
  });
};

// Toodete otsingufunktsioon
const searchProducts = async (searchTerm) => {
  const products = await fetchProducts();
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

// Kui otsing ei leidnud tulemusi või otsinguterminit pole, laeb kõik tooted
  if (filteredProducts.length === 0 && !searchTerm) {
    await loadAllProducts();
  } else {
    filteredProducts.forEach((productData) => {
      const product = new Product(
        productData.id,
        productData.title,
        productData.price,
        productData.description,
        productData.image
      );

// Loob tooteelemendi ja lisab  selle  HTMLi
      const productElement = document.createElement("div");
      productElement.classList.add("product-item");
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.price}€</p>
        <button id="add-to-cart-${product.id}">Lisa ostukorvi</button>
      `;

// Lisab klikkimise sündmuse toote detailvaatesse liikumiseks
      productElement.onclick = () => navigate("product", product.id);

// Lisab "Lisa ostukorvi" nupule vajaliku sündmuse
      const addToCartButton = productElement.querySelector(`#add-to-cart-${product.id}`);
      addToCartButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Väldib toote detailvaatesse suunamist
        addToCart(product);      // Lisab toote ostukorvi
        alert("Toode lisati ostukorvi!"); // Näitab kinnitust
      });

      productList.appendChild(productElement);
    });
  }
};

// Rakenduse algväärtustamise funktsioon
const initApp = async () => {
// Kategooriate laadimine ja menüü loomine
  const categories = await fetchCategories();
  const categoryMenu = document.getElementById("category-menu");

// Stiili seadistamine kategooria menüü jaoks
  categoryMenu.style.display = "flex";
  categoryMenu.style.justifyContent = "center";
  categoryMenu.style.gap = "20px";
  categoryMenu.style.listStyleType = "none";

  categories.forEach((category) => {
    const categoryElement = document.createElement("li");
    categoryElement.textContent = category;
    categoryElement.onclick = () => navigate("category", category);

// Kategooria nuppude stiilid
    categoryElement.style.padding = "10px 15px";
    categoryElement.style.border = "1px solid #ddd";
    categoryElement.style.borderRadius = "8px";
    categoryElement.style.cursor = "pointer";
    categoryElement.style.transition = "background 0.3s, color 0.3s";
    categoryElement.style.fontSize = "14px";
    categoryElement.style.color = "#333";

// Hover-efekt
    categoryElement.addEventListener("mouseenter", () => {
      categoryElement.style.backgroundColor = "#2b6cb0";
      categoryElement.style.color = "white";
    });
    categoryElement.addEventListener("mouseleave", () => {
      categoryElement.style.backgroundColor = "transparent";
      categoryElement.style.color = "#333";
    });

    categoryMenu.appendChild(categoryElement);
  });

// Laeb kõik tooted lehe esmasel laadimisel
  await loadAllProducts();

// Seadistab ostukorvi nupu ja otsinguvälja funktsionaalsuse
  const cartButton = document.querySelector(".cart-icon");
  cartButton.onclick = () => navigate("cart");

  const searchBar = document.getElementById("search-bar");
  searchBar.addEventListener("input", (e) => {
    searchProducts(e.target.value);
  });
};

// Rakenduse käivitamine lehe täielikul laadimisel
document.addEventListener("DOMContentLoaded", initApp);
initializeInventory();
