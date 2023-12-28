// library import
import { useContext, useEffect, useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
// CSS import
import './Header.css';
// Context import
import UserContext from '../../context/UserContext';
import CartContext from '../../context/CartContext';


function Header(props) {
  const [token,setToken, removeToken] = useCookies(['jwt-token']);
  const {user, setUser} = useContext(UserContext);
  const {cart} = useContext(CartContext);
  const [searchValue, setSearchValue] = useState();
  const navigate = useNavigate();

  
  function logout() {
    removeToken('jwt-token', {httpOnly: true});
    axios.get(`${import.meta.env.VITE_FAKE_STORE_URL}/logout`, {withCredentials: true});
    setUser(null);
  }

  function goToHome(){
    if(user){
      navigate("/")
    }else{
      navigate("/signin")
    }
  }

  function handleKeyDown(e){
    if(searchValue.length < 1)return
    if(e.key == 'Enter'){
      navigate(`/products?category=${searchValue}`)
    }
  }

  useEffect(() => {

  },[token,cart]);

  return (
    <div id='NavBar' >
      <Navbar {...props}>
        <NavbarBrand id="title">
          <span onClick={()=>goToHome()} >Shop Cart</span>

        </NavbarBrand>
          <div className="NavBar-search form-group">
            <input
             type="text"
             onChange={(e) => setSearchValue(e.target.value)}
             onKeyDown={handleKeyDown}
             value={searchValue} 
             placeholder="Search by name" 
             className="form-control" 
             id="searchInput" 
            />
          </div>

          <Nav className="" navbar>
            <NavbarText className='CartText' onClick={()=>navigate("/cart/")} >Cart{cart.length > 0 &&  `(${cart.length})`}</NavbarText>
            <UncontrolledDropdown nav inNavbar style={{marginRight: '2rem'}}>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                {/* {user && <DropdownItem>{<Link to={`/cart/${user?.id}`} >Cart {cart && cart.products && `(${cart.products.length})`}</Link>} </DropdownItem>} */}       
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  {user ? 
                     <Link onClick={() => {logout()}} to="/signin">
                        Logout
                     </Link> : 
                     <Link to="/signin">SignIn</Link>}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {user && <NavbarText>{user.username}</NavbarText>}
          </Nav>
      </Navbar>
    </div>
  );
}

export default Header;