import { Link } from "react-router-dom";
import "./style.css"

function CategoryItem({ itemName, filter = ""}) {
    return (
        <div id="category-item">
         <Link to={`/products?category=${filter}`}>
        <div className="category-item d-flex align-items-center justify-content-center">
           {itemName}
        </div>
         </Link>
        </div>
    );

}

export default CategoryItem;