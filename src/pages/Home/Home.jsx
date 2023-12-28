// CSS imports
import './Home.css';

import CategoryItem from '../../components/CategoryItem/CategoryItem';
import useCategory from '../../hooks/useCategory';
import { useContext } from 'react';
import UserContext from '../../context/UserContext'
import { useEffect } from 'react';
import Navcontext from '../../context/Navcontext';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [categories] = useCategory(); 
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const {setShowNav} = useContext(Navcontext);

    // after login setting showNav as true the value
    setShowNav(true);

    if(!user) navigate("/signin")

    useEffect(()=>{
    },[user])

    return (
        <div className="container welcome-wrapper">
            <div className="row">
                <h2 className="home-title text-center">Welcome to Shop Cart</h2>
                <div className="category-list d-flex flex-row justify-content-between align-items-center" id="categoryList">

                  <CategoryItem itemName="All Products" />
                    
                {categories && categories.map((category,idx) => {
                    if(idx < 5){
                        return    <CategoryItem itemName={category} key={category} filter={category} />
                    }
                })}
                    
                </div>
                <div className="category-title text-center">
                    Select a category to start Shopping
                </div>
            </div>
        </div>
    );
}

export default Home;