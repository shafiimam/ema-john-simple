import React from 'react';
import fakeData from "../../fakeData/index";
const Inventory = () => {
const handleAddProduct = () => {
    const product = 
    fetch('http://localhost:3100/addProduct',{
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(fakeData)
    })
}
    return (
        <div>
            <form action="">
                <p><span>Name:</span><input type="text"/></p>
                <p><span>Price:</span><input type="text"/></p>
                <p><span>Quantity:</span><input type="text"/></p>
                <p><span>Product Image</span><input type="file"/></p>
            </form>
        </div>
    );
};

export default Inventory;