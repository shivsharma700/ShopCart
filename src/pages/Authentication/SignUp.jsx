import { Link, useNavigate } from "react-router-dom";
import Auth from "../../components/Auth/Auth";
import './Auth.css';
import axios from "axios";
import  {signUp}  from "../../Api/FetchApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {

    const navigate = useNavigate();
    const notify = () => toast("Error!");

    async function onAuthFormSubmit(authArguments, resetForm) {
        try {
            await axios.post(signUp(), {
                username: authArguments.username,
                email: authArguments.email,
                password: authArguments.password
            });
            navigate('/signin');
        } catch(error) {
            notify();
            resetForm();
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
                <h4 className="text-center">Signup</h4>
                <Auth 
                    onSubmit={onAuthFormSubmit}
                />
                <div className="signup-btn text-center" id="showSignupBtn">
                    <Link  to="/signin">
                        Already have an Account? Sign In Here
                    
                    </Link>
                </div>
                
            </div>
        </div>
    )
}

export default Signup;