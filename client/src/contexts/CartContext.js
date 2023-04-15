// CartContext
import { createContext } from "react";

export const CartContext = createContext({
  products: [],
  addToCart: () => { },
  removeFromCart: () => { },
  emptyCart: () => { },
  getProductsQuantity: () => { },
  getCartItemsCount: () => { },
  getTotalPrice: () => { },
  changeQuantity: () => { }
});