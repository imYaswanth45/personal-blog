import "./Topbar.css"
import {Link } from 'react-router-dom'
import { useContext } from "react";
import { Context } from "../../context/Context";

const Topbar = () => {
  const PF = `http://localhost:5000/images/`
  
  console.log("Topbar");
   
  const {user,dispatch} = useContext(Context);
 const  handleLogout =()=>{
   //console.log("logout");
  dispatch({type:"LOGOUT"});
 }
 //console.log(user);
  return (
    <div className="top">
        <div className="topLeft">
        <i className="topIcon fa-brands fa-facebook"></i>
        <i className="topIcon fa-brands fa-twitter"></i>
        <i className="topIcon fa-brands fa-instagram"></i>
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li className="topListItem">
                  <Link className="link" to="/"  >HOME</Link>
                </li>
                <li className="topListItem">
                <Link className="link" to="/"  >ABOUT</Link>
                </li>
                <li className="topListItem">
                <Link className="link" to="/"  >CONTACT</Link>
                </li>
                <li className="topListItem">
                <Link className="link" to="/write"  >WRITE</Link>
                </li>
                <li className="topListItem" onClick={handleLogout}>
                {
                  user && "LOGOUT"
                }
                </li>
            </ul>
        </div>
        <div className="topRight">
          {
            user ? (
              <Link to="/settings" >
              <img className="topImg" src={PF+user.profilePic} alt="" />
              </Link>
            ) : (
              <ul className="topList">
                <li className="topListItem">
                <Link className="link" to="/login"  >LOGIN</Link>
                </li>
              <li className="topListItem">
              <Link className="link" to="/register"  >REGISTER</Link>
              </li>
              </ul>
            )
          }
            
            <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        </div>
    </div>
    
  )
}

export default Topbar