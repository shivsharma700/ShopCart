import axios from "axios";
import { getUserCart } from "../Api/FetchApi";

export async function fetchUserCart(userId, setCart) {
    const response = await axios.get(getUserCart(userId));
    setCart(response.data[0]);
}