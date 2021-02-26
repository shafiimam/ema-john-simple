import React, { useState } from "react";
import fakeData from "../../fakeData/index";
import Product from "../Product/Product";
import './Shop.css'
const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);

  const handleAddProduct = () =>{
    console.log('product added');
  }

  return (
    <div className="shop-container">
      <div className="product-container">
          {
              products.map(pd=><Product
                handleAddProduct ={handleAddProduct}
                product={pd}></Product>)
          }
      </div>
      <div className="card-container">
          <h3>this is cart</h3>
      </div>
    </div>
  );
};

export default Shop;
