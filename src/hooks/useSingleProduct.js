import axios from "axios";
import { useEffect, useState } from "react";
import { getSingleProduct } from "../Api/FetchApi";

function useSingleProduct(id){
    const [product, setProduct] = useState(null);

    async function downloadCategories(){
        const response = await axios.get(getSingleProduct(id));
        setProduct(response?.data);
    }

    useEffect(() => {
        downloadCategories();
    },[])

    return product;
}

export default useSingleProduct;