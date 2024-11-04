// API URL

const API_URL = "https://fakestoreapi.com";

// Funktsioon kõigi toodete toomiseks API-st
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error("API vastus pole õnnestunud");
    }
    return await response.json();  // Tagastab toodete andmed JSON kujul
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];  // Tagastab tühja massiivi vea korral
  }
};

// Funktsioon kategooriate toomiseks API-st
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    if (!response.ok) {
      throw new Error("API vastus pole õnnestunud");
    }
    return await response.json();  // Tagastab kategooriate andmed JSON kujul
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];  // Tagastab tühja massiivi vea korral
  }
};

// Funktsioon toodete toomiseks konkreetse kategooria järgi
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    if (!response.ok) {
      throw new Error("API vastus pole õnnestunud");
    }
    return await response.json();  // Tagastab kategooria toodete andmed JSON kujul
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];  // Tagastab tühja massiivi vea korral
  }
};

// Funktsioon toote toomiseks ID alusel
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("API vastus pole õnnestunud");
    }
    return await response.json();  // Tagastab konkreetse toote andmed JSON kujul
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;  // Tagastab nulli vea korral
  }
};
