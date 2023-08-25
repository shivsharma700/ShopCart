import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

// CSS import
import './style.css';

// component import
import ProductBox from '../../components/ProductBox/ProductBox';
import FilterProducts from '../../components/filter/FilterProducts';
import { getAllProductByCategory, getAllProducts } from '../../Api/FetchApi';

function ProductList() {
    const [productList, setProductList] = useState(null);
    const [query] = useSearchParams();
    
    async function downloadProducts(category) {
        const downLoadUrl = category ? getAllProductByCategory(category) : getAllProducts();

        const response = await axios.get(downLoadUrl);
        setProductList(response.data);
    }

    useEffect(() => {
        downloadProducts(query.get("category"));
    }, [query.get("category")])
    return (
        <div className='container'>
            <div className='row'>
                <h2 className='product-list-title text-center'>{query.get("category")}</h2>
                <div className='product-list-wrapper d-flex flex-row'>


                    <FilterProducts />

                        {/* list of products */}
                        <div className='product-list-box' id='productList'>

                        {productList && productList.map(
                                (product) => <ProductBox 
                                                id = {product.id}
                                                key={product.id} 
                                                name={product.title}
                                                price={product.price}
                                                productImage={product.image}
                                />)}

                    </div>


                </div>
            </div>
        </div>
    )
}

export default ProductList;