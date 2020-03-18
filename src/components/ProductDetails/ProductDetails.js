import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';

const ProductDetails = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);

    return (
        <div>
            <h3>{productKey} Product Details coming soon</h3>
        </div>
    );
};

export default ProductDetails;