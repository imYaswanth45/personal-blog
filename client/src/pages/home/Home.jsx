import "./Home.css"
import Header from "../../components/header/Header"
import Sidebar from "../../components/sidebar/Sidebar"
import Posts from "../../components/posts/Posts"
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [posts,setPosts] = useState([]);
  const {search} = useLocation();

  console.log("Home");
  
  useEffect(()=>{
    
    const fetchPosts=async ()=>{
      
        const res = await axios.get("/posts"+search);
        
        //const res = await axios.get("/posts");
        console.log(res.data);
        setPosts(res.data);
      
    }
    fetchPosts();
  },[search]);
  
 /*
  useEffect(()=>{
    fetch('/api/posts').then(res =>{
      if(res.ok){
        return res.json();
      }
    }).then(json => setPosts(json))
  },[])
  console.log(posts);
  console.log("postscheck");
  */
  return (
    <>
    <Header />
    <div className="home">
        <Posts posts={posts} />
        <Sidebar />
    </div>
    </>
  )
}

export default Home