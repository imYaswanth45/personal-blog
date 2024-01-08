import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import "./SinglePost.css"
import axios from "axios";
import { Context } from "../../context/Context";
const SinglePost = () => {

    const {user} = useContext(Context);
    const PF = `http://localhost:${process.env.PORT || 5000}/images/`


    const location = useLocation()
    //console.log(location.pathname.split("/")[2]);
    const path = location.pathname.split("/")[2];
    const [post,setPost] = useState({});

    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [updateMode,setUpdateMode] = useState(false);

    useEffect(()=>{
        const getPosts = async ()=>{
            const res =await axios.get("/api/posts/"+path);
            //console.log(res);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPosts();

    },[path]);
    console.log(post.username===user.username);
    //console.log();
   const handleDelete = async ()=>{
       try {
        await axios.delete(`/posts/${post._id}`,
        {data:{username:user.username}});
        window.location.replace("/");
       } catch (error) {
           
       }
       
   }
   const handleUpdate = async()=>{
    try {
        await axios.put(`/posts/${post._id}`,
        {username:user.username,title,desc});
       // window.location.reload();
       setUpdateMode(false);
       } catch (error) {
           
       }
   }
  return (
    <div className="singlePost">
        <div className="singlePostWarpper">
            {post.photo && (
                <img className="singlePostImg" src={PF+post.photo} alt="" />
            )}
            {updateMode ? (
                <input type="text" 
                value={title} 
                className="singlePostTitleInput"
                onChange={(e)=>setTitle(e.target.value)}
                 />
            ):(
                <h1 className="singlePostTitle">
                {title} 

                {post.username === user?.username && (
                    <div className="singlePostEdit">
                    <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
                    <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                </div>
                )}
                
            </h1>
            )}
            
            <div className="singlePostInfo">
                <span className="singlePostAuthor">Author:
                <Link to={`/?user=${post.username}`} className="link">
                <b>{post.username}</b>
                </Link>
                 </span>
                <span className="singlePostDate">{new Date(post.createdAt).toDateString}</span>
            </div>
            {updateMode ? (
            <textarea className="singlePostDescInput"
             value={desc} 
             onChange={(e)=>setDesc(e.target.value)}
             />
             ):(
                <p className="singlePostDesc">
                {desc}
               </p>
            )}
            {updateMode && (
                <button className="singlePostButton" onClick={handleUpdate}>Update</button>
            )}
            
            
        </div>
    </div>
  )
}

export default SinglePost