
import { useState } from 'react'
import './App.css'

import Header from './components/Header/Header'
import Footer from './components/footer/Footer'
import MainRoutes from './routes/MainRoutes'
import UserContext from './context/UserContext'
import CartContext from "./context/CartContext";
import { useEffect } from 'react'

import Navcontext from './context/Navcontext'
 

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // we will store id and quantity of added product in this cart
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
  }, [user])

  return (
    <UserContext.Provider value={{user,setUser}}>
      <CartContext.Provider value={{cart,setCart}}>
        <Navcontext.Provider value={{showNav, setShowNav}}>
           <div className='app-wrapper'>
            {/* showNav is bolean varible for avoiding Header inside login page */}
              {showNav && <Header color="light" light={true} expand="md" container="md"/>}
              <MainRoutes/>
              <Footer/>
           </div> 
        </Navcontext.Provider>
      </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default App
