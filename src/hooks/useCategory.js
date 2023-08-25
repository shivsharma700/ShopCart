import axios from "axios";
import { useEffect, useState } from "react";
import { getAllCategories } from "../Api/FetchApi";

function useCategory(){
    const [categories, setCategories] = useState(null);

    async function downloadCategories(){
        const response = await axios.get(getAllCategories());
        setCategories(response?.data);
    }

    useEffect(() => {
        downloadCategories();
    },[])
    return [categories]
}

export default useCategory;