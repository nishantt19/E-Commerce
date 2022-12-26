import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import "./navigation.styles.scss";


import { useSelector, useDispatch } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from "../../store/user/user.action";




// import { signOutUser } from "../../utils/firebase/firebase.utils";


import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";


import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';

const Navigation = () => {
 const dispatch = useDispatch();
  
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

 const signOutUser =()=> dispatch(signOutStart());
  
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo"/>
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {
            currentUser ? <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
            : <Link className="nav-link" to="/auth">
            SIGN IN
          </Link>
          }
          <CartIcon />
          
           
        </div>
        { isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
