import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css'
const Cart = (props) => {
    const cart = props.cart;
   // const totalPrice = cart.reduce((total,prd)=>total + prd.price ,0);
   let total = 0;
   for (let i = 0; i < cart.length; i++) {
       const product = cart[i];
       total = total + product.price * (product.quantity || 1);
       
   }
   let shipping = 0;
   if(total>35){
       shipping= 0;
   }
   else if(total>15){
       shipping = 4.99;
   }
   else if(total >0){
       shipping = 12.99;
   }
   
   const tax = total/10;
   const grandTotal = (total+ shipping + Number(tax)).toFixed(2);

   const formatNumber = num =>{
       const precision  = num.toFixed(2);
       return Number(precision)

   }
    return (
        <div className="cart px-2 my-2">
            <h4>Order Summery</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>shipping cost: {shipping}</p>
            <p>product price:{formatNumber(total)}</p>
            <p><small>tax+ vat: {formatNumber(tax)}</small></p>
            <h5 className="text-danger font-weight-bold">Total: {grandTotal}$</h5>
            <br/>
                {
                    props.children
                }
        </div>
    );
};

export default Cart;