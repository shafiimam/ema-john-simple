import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price} = props.product;
    const reviewItemStyle ={
        height:'200px',
        borderBottom:"1px solid lightgray",
        padding:'5px',
        marginBottom:'5px'
    }
    return (
        <div style={reviewItemStyle}>
           <h4 className="product-name">{name}</h4> 
           <p>Quantiy:{quantity}</p>
           <p><small>price:{price}</small></p>
           <br/>
           <button onClick={()=>props.removeProduct(key)} className="main-button">remove</button>
        </div>
    );
};

export default ReviewItem;