import { useEffect, useState } from 'react';
import axios from 'axios';

// CSS import
import './style.css';

// component import
import ProductBox from '../../components/ProductBox/ProductBox';
import FilterProducts from '../../components/filter/FilterProducts';
import { getAllProductByCategory, getAllProducts } from '../../Api/FetchApi';
import { useSearchParams } from 'react-router-dom';

function ProductList() {
    const [productList, setProductList] = useState();

    // query is for to get the category
    const [query] = useSearchParams();
    const category = query.get("category");
    
    async function downloadProducts(category) {
        const downLoadUrl = category ? getAllProductByCategory(category) : getAllProducts();
        const response = await axios.get(downLoadUrl);
        setProductList(response?.data.products);
    }

    // on Clicking of filter submit button, this function will be called 
    function resetProductList(filterPriceDetail){
        let NewList = [...productList]

        if(filterPriceDetail.minPrice && filterPriceDetail.maxPrice){
            NewList = NewList.filter( product => product.price >= filterPriceDetail.minPrice && product.price <= filterPriceDetail.maxPrice)
        }

        if(filterPriceDetail.radioButtonValue == "LowToHigh"){
            NewList.sort((x,y) => x.price-y.price);
        }else if(filterPriceDetail.radioButtonValue == "HighToLow"){
            NewList.sort((x,y) => y.price - x.price);
        }

        setProductList(NewList);
    }

    // on Clicking of clear filter button, this function will be called 
    function clearFilter(){
        downloadProducts(query.get("category"));
    }

    useEffect(() => {
        downloadProducts(query.get("category"));
    }, [category])
    return (
        <div className='container'>
            <div className='row'>
                <h2 className='product-list-title text-center'>{!category ? "All Products" : query.get("category")}</h2>
                <div className='product-list-wrapper d-flex flex-row'>


                    <FilterProducts resetProductList={resetProductList} clearFilter={clearFilter} />

                        {/* list of products */}
                        <div className='product-list-box' id='productList'>
                        {productList && productList?.map(
                                (product) => <ProductBox 
                                                id = {product?.id}
                                                key={product?.id} 
                                                name={product?.brand}
                                                price={product?.price}
                                                productImage={product?.images[0]}
                                />)}

                    </div>


                </div>
            </div>
        </div>
    )
}

export default ProductList;