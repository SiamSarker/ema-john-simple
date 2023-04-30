import { getShoppingCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () => {
    const productsData = await fetch('products.json');
    const products = await productsData.json();

    const savedCart = getShoppingCart();
    const previousCart = [];

    for (const id in savedCart){
        const addProduct = products.find(product => product.id === id);
        if(addProduct){
            const quantity = savedCart[id];
            addProduct.quantity = quantity;
            previousCart.push(addProduct);
        }
    }

    return {products, previousCart};
}