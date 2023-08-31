// CSS imports
import './Auth.css';
// library imports
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useRef } from 'react';
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// component imports
import Auth from '../../components/Auth/Auth';
// api imports
import { sigin } from '../../Api/FetchApi';
// context import
import UserContext from '../../context/userContext';

function Login() {

    const notify = () => toast("Error!");

    const authRef = useRef(null);
    const navigate = useNavigate();
    const [token, setToken] = useCookies(['jwt-token']);
    const {setUser} = useContext(UserContext);
    async function onAuthFormSubmit(formDetails) {
        try {
            const response = await axios.post(sigin(), {
                username: formDetails.username,
                email: formDetails.email,
                password: formDetails.password
            }, {withCredentials: true}); 
            const tokenDetails = jwt_decode(response.data.token);
            setUser({username: tokenDetails.user, id: tokenDetails.id});
            setToken('jwt-token', response.data.token, {httpOnly: true});
            navigate('/');
        } catch (error) {
            authRef.current.resetFormData();
            notify();
        }
    }

    return (
        <div className="container">
            <ToastContainer/>
            <div className="row">
                <h2 className="home-title text-center">
                    Welcome to Shop Cart
                </h2>
            </div>
            <div className="login-wrapper" id="loginForm">
                <h4 className="text-center">Login</h4>
                <Auth onSubmit={onAuthFormSubmit} ref={authRef} />
                <div className="signup-btn text-center" id="showSignupBtn">
                    <Link  to="/signup">
                     Donot have an Account? Sign Up Here
                    </Link>
                </div>
                
            </div>
        </div>
    )
}

export default Login;