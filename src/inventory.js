// Impordin product klassi, et veenduda, et laoseisu lisatavad objektid oleksid õiged

import { Product } from "./product.js";

// Inventory klass, mis hoiab ja haldab toodete laoseisu

class Inventory {
  constructor() {
// Laoseisu objekt, kus võtmed on toote IDd ja väärtused on kogused
    this.stock = {};
  }

// Funktsioon uue toote lisamiseks laoseisu kindla kogusega

  addProduct(product, quantity) {
// Kontroll, et lisatav objekt oleks Product klassi instance
    if (!(product instanceof Product)) {
      throw new Error("Toode peab olema Product klassi instants.");
    }
// Lisab toote laoseisu või suurendab kogust, kui toode on olemas
    this.stock[product.id] = (this.stock[product.id] || 0) + quantity;
  }

// Funktsioon toote saadavuse kontrollimiseks laoseisus

  isAvailable(productId, quantity = 1) {
// Tagastab tõeväärtuse, kas toode on saadaval antud koguses
    return (this.stock[productId] || 0) >= quantity;
  }

// Funktsioon toote laoseisu vähendamiseks pärast ostukorvi lisamist

  reduceStock(productId, quantity = 1) {
// Vähendab laoseisu ainult siis, kui soovitud kogus on saadaval
    if (this.isAvailable(productId, quantity)) {
      this.stock[productId] -= quantity;
    } else {
      throw new Error("Laoseis on ebapiisav.");
    }
  }

// Funktsioon laoseisu tagastamiseks konkreetse toote jaoks

  getStock(productId) {
// Tagastab toote koguse laoseisus või 0, kui toodet ei ole olemas
    return this.stock[productId] || 0;
  }
}

// Ekspordib Inventory klassi ühe instancei, et kogu rakendus kasutaks sama laoseisu

const inventoryInstance = new Inventory();
export default inventoryInstance;
