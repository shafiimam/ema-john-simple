import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/index';
import Product from '../Product/Product';

const ProductDetail = () => {

    const {productKey} = useParams();
    const product = fakeData.find(pd=>pd.key === productKey);
    
    return (
        <div>
            <h1>Product Details</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};
export default ProductDetail;