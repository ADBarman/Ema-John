import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import '../Review/Review.css';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';

const Review = () => {

const [cart, setCart] = useState([]);

const [orderPlaced, SetOrderPlaced] = useState(false);

const handlePlaceOrder = () => {
    SetOrderPlaced(true);
    setCart([]);
    processOrder();
    //console.log("Order Placed");
}   

const removeProduct = (productKey) => {
    //console.log(productKey);
    const newCart = cart.filter(pd => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
}

useEffect( () => {

    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    
    const cartProducts  = productKeys.map( key => {
        const product = fakeData.find(pd => pd.key === key);
        product.quantity = savedCart[key];
        return product;
    });
    //console.log(cartProducts);
    setCart(cartProducts);
}, []);

    let thankyou;
    if (orderPlaced) {
        thankyou = <img src={happyImage} alt=""/>
    }

    return (
        <div className="review-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem 
                        key = {pd.key}
                        removeProduct = {removeProduct}
                        product={pd}
                        ></ReviewItem>)
                }
                { thankyou }
            </div>
            
            <div>
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder}
                    className="main-button">Place Order</button>
                </Cart>
            </div>
        </div>

    );
};

export default Review;