import React, { useEffect } from "react";
import { useState } from "react";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import { Link, useHistory } from "react-router-dom";
import happyImage from "../../images/giphy.gif";
const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const history = useHistory()

  function handleProceedCheckout() {
    history.push('/shipment');
  }
  const removeProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch('https://morning-brook-56076.herokuapp.com/productsByKeys',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(productKeys)
    })
    .then(res=>res.json())
    .then(data =>setCart(data));
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
          
            <button onClick={handleProceedCheckout} className="main-button">
              Proceed checkout
            </button>
          
        </Cart>
      </div>
    </div>
  );
};

export default Review;
