import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
      fetch('products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
    }, []);

    const [cart, setCart] = useState([]);

    const addtoCart = (selectedProduct) => {
        let newCart = [];
        const exists = cart.find(c => c.id === selectedProduct.id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        } 
        else {
            const rest = cart.filter(c => c.id !== selectedProduct.id);
            exists.quantity += 1;
            newCart = [...rest, exists]; 
        }
    
        setCart(newCart);
        addToDb(selectedProduct.id);
    }

    useEffect(() => {
      const shoppingCart = getShoppingCart();
      const savedCart = [];
      for (const id in shoppingCart) {
        const addedProduct = products.find(p => p.id === id);
        if (addedProduct) { 
            const quantity = shoppingCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
      }
      setCart(savedCart);
    }, [products]);
    
    
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => 
                        <Product 
                        key={product.id}
                        product={product}
                        addtoCart={addtoCart}
                        ></Product>)
                }
            </div>

            <div className="cart-container">
            <Cart cart={cart}></Cart> 
            </div>
        </div>
        
    );
};

export default Shop;