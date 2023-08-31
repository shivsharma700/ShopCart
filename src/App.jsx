
import { useState } from 'react'
import './App.css'

import Header from './components/Header/Header'
import Footer from './components/footer/Footer'
import MainRoutes from './routes/MainRoutes'
import UserContext from './context/UserContext'
import CartContext from "./context/CartContext";
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios'
import { fetchUserCart } from './helper/fetchUserCartHelper'
 

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({});
  const [token, setToken] = useCookies(['jwt-token']);

 async function accessToken() {
      const res = await axios.get(`${import.meta.env.VITE_FAKE_STORE_URL}/accesstoken`, {withCredentials: true})
      setToken('jwt-token', res.data.token, {httpOnly: true});
      const tokenDetails = jwt_decode(res.data.token);
      setUser({username: tokenDetails.user, id: tokenDetails.id});
  }

  async function load(){
    if(!user){
      await  accessToken();
    }
    if(user){
      await fetchUserCart(user.id, setCart);
    }
  }

  useEffect(() => {
    load();
  }, [user])

  return (
    <UserContext.Provider value={{user,setUser}}>
      <CartContext.Provider value={{cart, setCart}}>
        <div className='app-wrapper'>
           <Header color="light" light={true} expand="md" container="md"/>
           <MainRoutes/>
           <Footer/>
        </div> 
      </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default App
