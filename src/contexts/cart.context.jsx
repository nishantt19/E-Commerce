import { createContext, useEffect, useState } from "react";


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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount : 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [cartCount, setCartCount]= useState(0);

  useEffect(()=>{
const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0) ;
 setCartCount(newCartCount);
  },
  [cartItems])


//   function to add item to cart
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = { isCartOpen, setIsCartOpen , cartItems, addItemToCart, cartCount};
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
