import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [{ basket, user }, ] = useStateValue();

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };

  const loginRoute = !user && "/login";
  
  return (
    <div className="Header">
     
      <Link to="/">
        <img
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon-logo"
          className="header__logo"
        />
      </Link>

      <div className="header__search">
        <input type="text" className="header__searchInput" />
        {/* Logo */}
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={loginRoute} style={{ textDecoration: "none" }}>
          <div onClick={handleAuth} id="login" className="header__option">
            <span className="header__optionLineOne">
              Hello {!user ? "Guest" : user.displayName},
            </span>

            <span className="header__optionLineTwo">
              {user ? "Log out" : "Log in"}
            </span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        <Link to="cart"  style={{ textDecoration: "none" }}>
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__basketCount">
              <strong>{basket?.length}</strong>
            </span>
          </div>
        </Link>
      </div>
    
    </div>
  );
}

export default Header;
