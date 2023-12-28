// CSS imports
import './FilterProducts.css';

import useCategory from '../../hooks/useCategory';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function FilterProducts({resetProductList, clearFilter}) {

    const minPriceOptions = [0, 10, 20, 50, 100, 200];
    const maxPriceOptions = [0, 10, 20, 50, 100, 200, 1000];

    const [filterPriceDetail, setFilterPriceDetail] = useState({
        radioButtonValue: "",
        minPrice: "",
        maxPrice: ""
    });

    function filterProductList(){
        resetProductList(filterPriceDetail)
    }

    const [categories] = useCategory(); 

    return (
        <div className="product-list-sidebar d-flex flex-column">

            <div className="sidebar-title fw-bold">Categories</div>
            <div id="categoryList">
                {categories && categories.map((category) => 
                   <Link to={`/products?category=${category}`}
                     key={category}
                     className='d-flex text-decoration-none'
                   >
                      {category} 
                   </Link>
                )}
            </div>


            <div className="sidebar-title">Filter by price</div>
            <div className="price-filter">
                <div className="price-filter-select d-flex flex-row justify-content-between">
                    <div className="form-group">
                        <select
                          onChange={(e)=> setFilterPriceDetail({...filterPriceDetail, minPrice: e.target.value})}
                          name="minPrice" 
                          className="form-select" 
                          id="minPrice"
                        >
                            {minPriceOptions.map(optionValue => 
                                <option key={optionValue} value={optionValue}>{optionValue}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <select 
                          onChange={(e)=> setFilterPriceDetail({...filterPriceDetail, maxPrice: e.target.value})}
                          name="maxPrice" 
                          className="form-select" 
                          id="maxPrice"
                        >
                        {maxPriceOptions.map(optionValue => 
                                <option key={optionValue} value={optionValue}>{optionValue}</option>)}
                        </select>
                    </div>
                </div>
                <div className="price-filter-title d-flex flex-row justify-content-between">
                    <div id="price-filter-label-min">Min Price</div>
                    <div id="price-filter-label-max">Max Price</div>
                </div>
                <div className=' Radios d-flex flex-row justify-content-around' >
                  <input
                    type="radio"
                    name="filterPrice"
                    value="LowToHigh"
                    onChange={() => setFilterPriceDetail({...filterPriceDetail, radioButtonValue: "LowToHigh"})}
                  />
                  <input
                    type="radio"
                    name="filterPrice"
                    value="HighToLow"
                    onChange={() => setFilterPriceDetail({...filterPriceDetail, radioButtonValue: "HighToLow"})}
                  />
                </div>
                <div className=' RadiosText d-flex flex-row justify-content-between' >
                    <div id="price-filter-label-min">Low To High</div>
                    <div id="price-filter-label-max">High To Low</div>
                </div>
            </div>
            <button onClick={filterProductList} className="btn btn-warning clear-filter" id="search">Submit</button>
            <button onClick={()=>{clearFilter()}} className="btn btn-danger clear-filter" id="clear">Clear Filters</button>
        </div>
    )
}

export default FilterProducts;