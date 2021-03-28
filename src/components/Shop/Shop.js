import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fakeData from "../../fakeData/index";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import './Shop.css'
const Shop = () => {
  document.title = 'shop'
  const first10 = fakeData.slice(0, 10);
  const [products] = useState(first10);

  const [cart,setCart]  = useState([]);
  const handleAddProduct = (product) =>{
    const sameProduct = cart.find(pd=> pd.key === product.key);
    let count = 1;
    let newCart;
    if(sameProduct){
      const toBeAddedKey = product.key;
      sameProduct.quantity = sameProduct.quantity +1;
      const others = cart.filter(pd=> pd.key !== toBeAddedKey);
      newCart = [...others,sameProduct];
      count = sameProduct.quantity;
    }
    else{
      product.quantity = 1;
      newCart=[...cart,product];
    }
    setCart(newCart);
    
    addToDatabaseCart(product.key,count);
  }
  useEffect(()=>{
    const savedCart = getDatabaseCart();
    const productKeys= Object.keys(savedCart);
    const previousCart = productKeys.map(existingKey=>{
      const product = fakeData.find(pd=> pd.key === existingKey);
      product.quantity = savedCart[existingKey];
      return product;
    })
    setCart(previousCart);
  },[])
  return (
    <div className="twin-container">
      <div className="product-container">
          {
              products.map(pd=><Product
                handleAddProduct ={handleAddProduct}
                product={pd} key={pd.key} showAddToCart={true}></Product>)
          }
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
            <Link to="/review">
            <button className="main-button">Review Order</button>
            </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
