import { useEffect, useState } from "react";

export const useCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {

    const item = cart.find((item) => item.id === product.id && item.color === product.color);
    if (item) {
      const newCart = cart.map((item) => {
        if (item.id === product.id && item.color.code === product.color.code) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
      setCart(newCart);

      localStorage.setItem("cart", JSON.stringify(newCart));

    } else {
      const newCart = [...cart, { ...product, quantity }];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }

  };

  const removeFromCart = (id, color) => {

    const index = cart.findIndex((item) => item.id === id && item.color.code === color);

    let newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);

    localStorage.setItem("cart", JSON.stringify(newCart));

  };

  const getProductsQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.length;
  };

  const emptyCart = () => {
    setCart([]);

    localStorage.removeItem("cart");
  };

  const changeQuantity = (product, quantity) => {

    const newCart = cart.map((item) => {
      if (item.id === product.id && item.color === product.color) {
        return { ...item, quantity };
      }
      return item;
    });

    setCart(newCart);

    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((acc, item) => {
      if (item.discount > 0) {
        return (
          acc +
          (item.price - (item.price * item.discount) / 100) *
          item.quantity
        );
      }
      return acc + item.price * item.quantity;
    }
      , 0);

  };

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);

  return { cart, addToCart, removeFromCart, emptyCart, getProductsQuantity, getCartItemsCount, getTotalPrice, changeQuantity };
}