import React from "react";
import logo from "../../images/logo.png";
import "./Header.css";
const Header = () => {
  return (
    <div>
      <img src={logo} alt="" />
      <nav>
        <a href="/shop">shop</a>
        <a href="/review">Order Review</a>
        <a href="/manage">Inventory</a>
      </nav>
    </div>
  );
};

export default Header;
