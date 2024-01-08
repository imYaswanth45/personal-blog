import axios from "axios";
import { useContext, useState } from "react"
import { Context } from "../../context/Context"
import "./Settings.css"

const Settings = () => {
  const {user,dispatch } = useContext(Context);
  const [file,setFile] = useState(null);
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [success,setSuccess] = useState(false);
 
  const PF = `http://localhost:${process.env.PORT || 8080}/images/`

//UPDATE
const handleSubmit =async (e)=>{
  e.preventDefault();
  dispatch({type:"UPDATE_START"});
  const updatedUser={
    userId:user._id,
    username,
    email,
    password,
  };
  if(file){
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append("name",filename)
    data.append("file",file)
    updatedUser.profilePic=filename;
    try {
      await axios.post("/upload",data);
      
    } catch (error) {
      console.log(error);
    }
  }
  try {
     
     const res=await axios.put("/users/"+user._id,updatedUser);
     //console.log(true);
    //window.location.replace("/post/"+res.data._id);
    setSuccess(true);
  dispatch({type:"UPDATE_SUCCESS",payload:res.data});
  console.log(user);

  } catch (error) {
    dispatch({type:"UPDATE_FAILURE"})
    //console.log(error);
  }
  
}

  return (
    <div className="setting">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update your account</span>
          <span className="settingsDeleteTitle">Delete your account</span>
        </div>
        <form  className="settingsForm" onSubmit={handleSubmit}>
          <label >Profile Picture</label>
          <div className="settingsPP">
            <img
             src={file ? URL.createObjectURL(file) : PF+user.profilePic} 
             alt="" 
            />
            <label htmlFor="fileInput">
            <i class="fa-solid fa-circle-user"></i>
            </label>
            <input 
              type="file" 
              id="fileInput" 
              style={{display:"none"}} 
              onChange={(e)=>setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} onChange={e=>setUsername(e.target.value)} />
          <label>Email</label>
          <input type="email" placeholder={user.email} onChange={e=>setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password"  onChange={e=>setPassword(e.target.value)} />
          <button className="settingsSubmit" type="submit">Update</button>
          {success && <span style={{color:"green",textAlign:"center",margin:"20px"}}>Profile has been Updated</span>}
        </form>
      </div>
    </div>
  )
}

export default Settings