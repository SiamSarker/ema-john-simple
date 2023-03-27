import React from 'react';
import './Cart.css';

const Cart = ({cart}) => {
    let total = 0;
    let shipping = 0;
    let grandTotal = 0;
    for (const product of cart) {
        total += product.price;
        shipping += product.shipping;
    }
    const tax = (total * 0.1).toFixed(2);
    grandTotal = total + shipping + parseFloat(tax);

    return (
        <div className='cart'>
            <h4>Order Summery</h4>
            <p>Selected Items: {cart.length}</p>
            <p>Total price: {total}</p>
            <p>Total Shipping: {shipping}</p>
            <p>Tax: {tax}</p>
            <p>Grand Total: {grandTotal}</p>
        </div>
    );
};

export default Cart;