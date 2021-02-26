import React from "react";
import logo from "../../images/logo.png";
import "./Header.css";
import shippingCost from '../../fakeData/shippingCosts';
const Header = () => {
  return (
    <div>
      <img src={logo} alt="" />
      <nav>
        <a href="/shop">shop</a>
        <a href="/review">Order Review</a>
        <a href="/manage">Manage Inventory Here</a>
      </nav>
    </div>
  );
};

export default Header;