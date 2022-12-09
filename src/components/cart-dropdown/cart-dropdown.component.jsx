import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";
import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import { createUserWithEmailAndPassword } from "firebase/auth";

const CartDropdown = () => {

const {cartItems} = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" >
        {cartItems.map((item)=>
        <CartItem cartItem={item} key={item.id}/>
        )}
      </div>

      <Button>Go to Checkout</Button>
    </div>
  );
};

export default CartDropdown;
