import { Link } from "react-router-dom"
import "./Login.css"
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
const Login = () => {

  const userRef = useRef();
  const passwordRef = useRef()
  const {dispatch,isFetching} = useContext(Context)


  const handleSubmit = async (e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try {
      console.log("STarted");
      const res =await axios.post("/auth/login",{
        username:userRef.current.value,
        password:passwordRef.current.value,
      });
      dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    } catch (error) {
      //console.log(error);
      dispatch({type:"LOGIN_FAILURE"});
    }
  }
  //console.log(user);
  //console.log(isFetching);
  return (
    <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" className="loginInput" placeholder="Username" ref={userRef} />
            <label>Password</label>
            <input type="Password" placeholder="password" className="loginInput" ref={passwordRef} />
            <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
        </form>
        <button className="loginRegisterButton">
            <Link to="/register" className="link">Register</Link>
        </button>
    </div>

  )
}

export default Login