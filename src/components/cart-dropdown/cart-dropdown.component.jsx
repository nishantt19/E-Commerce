import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";
import { useContext } from "react";

// this is a hook which gives access to navigation object
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import { createUserWithEmailAndPassword } from "firebase/auth";

const CartDropdown = () => {

const {cartItems} = useContext(CartContext);

const navigate = useNavigate();

const goToCheckoutHandler =()=>{
  navigate('/checkout');
}

  return (
    <div className="cart-dropdown-container" >
      <div className="cart-items" >
        {cartItems.map((item)=>
        <CartItem cartItem={item} key={item.id}/>
        )}
      </div>

      <Button  onClick={goToCheckoutHandler}>Go to Checkout</Button>
    </div>
  );
};

export default CartDropdown;
