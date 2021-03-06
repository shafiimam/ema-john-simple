import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity} = props.product;
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
           <br/>
           <button className="main-button">remove</button>
        </div>
    );
};

export default ReviewItem;