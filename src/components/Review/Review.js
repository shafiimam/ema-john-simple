import React, { useEffect } from "react";
import { useState } from "react";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import fakeData from "../../fakeData/index";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import { Link } from "react-router-dom";
import happyImage from "../../images/giphy.gif";
const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState([]);

  const handlePlaceOrder = () => {
    setCart([]);
    setOrderPlaced(true);
    processOrder();
  };
  const removeProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });

    setCart(cartProducts);
  }, []);
  let thankYou;
  if (orderPlaced == true) {
    thankYou = (
      <img
        style={{ height: "200px", width: "200px" }}
        src={happyImage}
        alt=""
      />
    );
  }
  return (
    <div className="twin-container">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            removeProduct={removeProduct}
            product={pd}
            key={pd.key}
          ></ReviewItem>
        ))}
        {thankYou}
      </div>

      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button onClick={handlePlaceOrder} className="main-button">
              Place Order
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
