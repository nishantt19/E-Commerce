import { createContext, useEffect, useState } from "react";
import { useAsyncError } from "react-router-dom";


// to check if the item we are going to add is already in the cart or not and if it is in the cart, then just increment the quantity , otherwise add the item to our cart.
const addCartItem = (cartItems, productToAdd) => {
  const existingCardItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCardItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

//   this is to add the new item to the cart.
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem =(cartItems, cartItemToRemove)=>{
    const existingCardItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
      );

      if(existingCardItem.quantity===1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
      }

      return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }

  const clearCartItem =(cartItems, cartItemToClear)=>{
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
  }



export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart : ()=>{},
  clearItemFromCart : ()=>{},
  cartCount : 0,
  cartTotal :0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [cartCount, setCartCount]= useState(0);
  const [cartTotal, setCartTotal]= useState(0);


  useEffect(()=>{
const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0) ;
 setCartCount(newCartCount);
  },
  [cartItems]);

  useEffect(()=>{
const newCartTotal = cartItems.reduce((total, cartItem)=> total + cartItem.quantity*cartItem.price, 0) ;
 setCartTotal(newCartTotal);
  },
  [cartItems]);


//   function to add item to cart
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

//   function to remove a item from the cart
  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

//   function to clear the item from the cart
  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = { isCartOpen, setIsCartOpen , cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, cartTotal};
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
