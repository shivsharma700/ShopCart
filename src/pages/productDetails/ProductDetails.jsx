// CSS imports
import { useContext } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import useSingleProduct from '../../hooks/useSingleProduct';
import CartContext from '../../context/CartContext';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import { addProductToUserCart } from '../../Api/FetchApi';

function ProductDetails() {

    const {id} = useParams();
    const {cart, setCart} = useContext(CartContext);
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const product = useSingleProduct(id);

    async function addProductToCart(){
        if(!user) return;
        const response = await axios.put(addProductToUserCart(), {userId: user.id, productId: id});
         setCart({...response.data});
        navigate(`/cart/${user.id}`);
    }
    
    return (
        product &&
        <div className="container">
            <div className="row">
                <div className="product-details-wrapper d-flex justify-content-between align-items-start flex-row">
                    <div className="product-img d-flex">
                        <img 
                            src={product?.image} 
                            alt="product image" 
                            id="product-img" 
                        />
                    </div>

                    <div className="product-details-box d-flex flex-column">
                        <div id="productDetails">
                            {/* <!-- product details --> */}
                            <div className="product-name" id="product-name">{product?.title}</div>
                            <div className="product-price fw-bold" id="product-price">${product?.price}</div>
                            <div className="product-description">
                                <div className="product-description-title fw-bold">Description</div>
                                <div className="product-description-data" id="product-description-data">
                                {product?.description}
                                </div>
                            </div>
                        </div>

                        <div
                           onClick={addProductToCart}
                           className="product-details-action btn btn-primary text-decoration-non">
                              Add to cart
                        </div>
                        <a onClick={()=>navigate("/cart/")} id="goToCartBtn" className="product-details-action btn btn-warning text-decoration-none">
                            Go to cart
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;