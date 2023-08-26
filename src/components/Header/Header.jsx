import { useContext, useEffect, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

// CSS import
import './Header.css';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import UserContext from '../../context/UserContext';
import CartContext from '../../context/CartContext';

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken, removeToken] = useCookies(['jwt-token'])
  const toggle = () => setIsOpen(!isOpen);
  const {user, setUser} = useContext(UserContext);
  const {cart} = useContext(CartContext);

  useEffect(()=>{
  },[token])

  return (
    <div>
      <Navbar {...props} >
        <NavbarBrand  id="title">
          <Link to={"/"} >Shop Cart</Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <UncontrolledDropdown nav inNavbar style={{marginRight: '2rem'}}>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Cart{cart.products.length}</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  {token["jwt-token"] ? <Link onClick={()=>{
                    removeToken('jwt-token');
                    setUser(null)
                  }} to={"/signin"} >Logout</Link> : <Link to={"/signin"} >SignIN</Link>}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {user && <NavbarText>{user.username}</NavbarText>}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;