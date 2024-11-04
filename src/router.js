// Impordin funktsioonid, mis laevad erinevad vaated

import { loadCategoryView } from "./categoryView.js";
import { loadProductView } from "./productView.js";
import { loadCartView } from "./cartView.js";
import { loadAllProducts } from "./app.js";

// Funktsioon, mis vastutab vaadete vahel navigeerimise eest

export const navigate = (view, param) => {

// Defineerin objektis erinevad vaated ja nendele vastavad laadimisfunktsioonid

  const views = {
    category: () => loadCategoryView(param),
    product: () => loadProductView(param),
    cart: () => loadCartView(),
    home: () => loadAllProducts(),
  };

// Kontrollin, kas vaade on olemas ja käivitan vastava funktsiooni

  if (views[view]) {
    views[view]();
    const encodedParam = param ? encodeURIComponent(param) : "";

    // Uuendan URL hashi, et kuvada aktiivne vaade
    window.location.hash = `#/${view}/${encodedParam}`;
  }
};

// Funktsioon, mis käivitub hashi muutmisel, nt siis, kui kasutaja kasutab tagasi või edasi nuppu

window.addEventListener("hashchange", () => {
  const path = window.location.hash.slice(1).split("/");
  const view = path[1] || "home";  // Kui hash on tühi, navigeerime esilehele
  const param = path[2];

// Navigeerin määratud vaatesse ja decode parameeter

  navigate(view, decodeURIComponent(param || ""));
});

// Lehe alglaadimisel käivitatav sündmus, mis tagab, et õige vaade laeb kohe ära

window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.hash.slice(1).split("/");
  const view = path[1] || "home";  // Kui hash on tühi, navigeerib esilehele
  const param = path[2];

// Navigeerib määratud vaatesse ja decode parameeter

  navigate(view, decodeURIComponent(param || ""));
});
