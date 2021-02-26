import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const cart = props.cart;
   // const totalPrice = cart.reduce((total,prd)=>total + prd.price ,0);
   let total = 0;
   for (let i = 0; i < cart.length; i++) {
       const product = cart[i];
       total = total + product.price;
       
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
        <div>
            <h4>Order Summery</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>shipping cost: {shipping}</p>
            <p>product price:{formatNumber(total)}</p>
            <p><small>tax+ vat: {formatNumber(tax)}</small></p>
            <p>total: {grandTotal}$</p>
        </div>
    );
};

export default Cart;