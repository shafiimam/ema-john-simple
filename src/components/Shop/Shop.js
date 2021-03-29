import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fakeData from "../../fakeData/index";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import './Shop.css'
const Shop = () => {
  document.title = 'shop'
  const [products,setProducts] = useState([]);
  const [cart,setCart]  = useState([]);

  useEffect(() => {
    fetch('http://localhost:3100/products')
    .then(res => res.json())
    .then(data => setProducts(data))
  },[])

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
    fetch('http://localhost:3100/productsByKeys',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(productKeys)
    })
    .then(res=>res.json())
    .then(data =>setCart(data));
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


