import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom"
import "./Register.css"
//const baseURL = "https://localhost:5000/api";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [[password], setPassword] = useState("");
  const [error,setError] = useState(false);


  const handleSubmit = async (e)=>{

    e.preventDefault();
    setError(false);
    
    try {
      const res =await axios.post(`/auth/register`,{
        username,email,password,
      });
     // console.log(res);
     //if no errror below one redirects to login page
      res.data && window.location.replace("/login");
    } catch (error) {
      //console.log(error);
      setError(true);
    }
    /*
    fetch('/auth/register', {
      method: 'POST',
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(username,email,password)
    }).then(function(response) {
      console.log(response)
      //return response.json();
    });
    */
    
  }
  return (
    <div className="Register">
        <span className="RegisterTitle">Register</span>
        <form className="RegisterForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input 
            type="text" 
            className="RegisterInput" 
            placeholder="Name" 
            onChange={e=>setUsername(e.target.value)}
            />
            <label>Email</label>
            <input 
            type="email" 
            className="RegisterInput" 
            placeholder="Email" 
            onChange={e=>setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
            type="Password" 
            placeholder="password" 
            className="RegisterInput" 
            onChange={e=>setPassword(e.target.value)}
            />
            <button className="RegisterButton" type="submit">Register</button>
        </form>
        <button className="RegisterLoginButton">
        <Link to="/register">Login</Link>
        </button>
        {error && <span style={{color:"red",marginTop:"10px"}}>Something went wrong</span>}
    </div>

  )
}

export default Register