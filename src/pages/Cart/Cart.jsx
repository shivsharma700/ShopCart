import OrderDetailsProduct from '../../components/orderDetailsProduct/OrderDetailsProduct';
import './Cart.css';
import { useContext, useEffect, useState} from 'react';
import CartContext from '../../context/CartContext';
import axios from 'axios';
import { getSingleProduct } from '../../Api/FetchApi';

function Cart(){
    
    
    const {cart} = useContext(CartContext);
    const [products, setProducts] = useState([]);

    async function downLoadCartProduct(cart){
        if(!cart || !cart?.products) return;

        const productQuantityMapping = {};
        cart.products.forEach(product => {
            productQuantityMapping[product.productId] = product.quantity;
        });
        const productPromise = cart?.products?.map(product => axios.get(getSingleProduct(product.productId)));
        const productPromiseResponse = await axios.all(productPromise);
        const downloadedProducts = productPromiseResponse.map(product => ({...product.data, quantity: productQuantityMapping[product.data.id]}));
        setProducts(downloadedProducts)
    }

    useEffect(()=>{
        downLoadCartProduct(cart);
    },[cart])

    return (
        <div className="container">
            <div className="row">
                <h2 className="cart-title text-center">Your cart</h2>
                <div className="cart-wrapper d-flex flex-row">
                    <div className="order-details d-flex flex-column" id="orderDetails">
                        <div className="order-details-title fw-bold">Order Details</div>
                        <div>
                            {products.length > 0 && products.map(product => <OrderDetailsProduct
                                                                             key={product.id}
                                                                             title= {product.title}
                                                                             price= {product.price}
                                                                             image= {product.image}
                                                                             quantity= {product.quantity}
                                                                            />)}
                        </div>
                    </div>
    
                    <div className="price-details d-flex flex-column" id="priceDetails">
                        <div className="price-details-box">
    
                            <div className="price-details-title fw-bold">Price Details</div>
                            <div className="price-details-data">
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Price</div>
                                    <div id="total-price"></div>
                                </div>
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Discount</div>
                                    <div>10</div>
                                </div>
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Delivery Charges</div>
                                    <div>FREE</div>
                                </div>
                                <div className="price-details-item d-flex flex-row justify-content-between">
                                    <div>Total</div>
                                    <div id="net-price"></div>
                                </div>
                            </div>
    
                        </div>
                        <div className="price-details-btn-group">
                            <a href="productList.html" className="continue-shopping-btn btn btn-info text-decoration-none">
                                Continue Shopping
                            </a>
                            <a href="checkout.html" className="checkout-btn btn btn-primary text-decoration-none">
                                Checkout
                            </a>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;