import { Link } from "react-router-dom";
// CSS imports
import './style.css';
function ProductBox({id, productImage, name, price }) {
    const Name = name.slice(0,16);
    return (
        <Link  to={`/products/${id}`} 
            className="product-item text-decoration-none d-inline-block">
            <div className="product-img">
                <img src={productImage} alt="" />
            </div>
            <div className="product-name text-center">{Name}</div>
            <div className="product-price text-center">&#8377; {price}</div>
        </Link>
    )
}

export default ProductBox;