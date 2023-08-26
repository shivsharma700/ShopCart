
import { useState } from 'react'
import './App.css'

import Header from './components/Header/Header'
import Footer from './components/footer/Footer'
import MainRoutes from './routes/MainRoutes'
import UserContext from './context/UserContext'
import CartContext from "./context/CartContext";
 

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({products: []});

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
