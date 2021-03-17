import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import "./Header.css";
import { userContext } from '../../App';
const Header = () => {
  const [loggedInUser,setLoggedInUser] = useContext(userContext); 
  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <Link to="/shop">shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/inventory">Inventory</Link>
       {
         loggedInUser.isSignedIn &&  <button onClick={()=>setLoggedInUser({})}>sign out</button>
       }
      </nav>
    </div>
  );
};

export default Header;
