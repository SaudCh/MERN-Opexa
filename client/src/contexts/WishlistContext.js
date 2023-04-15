// 
import { createContext } from "react";

export const WishlistContext = createContext({
  wishList: [],
  addToWishlis: () => { },
  removeFromWishlist: () => { },
  inWishlist: () => { },
  removeAll: () => { },
  getProduct: () => { },
});