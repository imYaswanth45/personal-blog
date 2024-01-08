import axios from "axios";
import { useEffect, useState } from "react"
import "./Sidebar.css"
import {Link} from "react-router-dom"
const Sidebar = () => {
    const [cats,setCats] =useState([]);

    useEffect(()=>{
        const getCats= async()=>{
            //console.log("Sidebar")
            const res = await axios.get("/categories")
            
            setCats(res.data)
    }
    getCats();
    },[])
  return (
    <div className="sidebar">
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img  src="https://img.freepik.com/free-photo/front-view-male-student-wearing-black-backpack-holding-copybooks-files-blue-wall_140725-42636.jpg?size=626&ext=jpg&ga=GA1.2.2143815049.1640649600" alt="" />
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </p>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            
            <ul className="sidebarList">
                
                {/*cats.map((c)=>(
                    <Link to={`/?cat=${c.name}`} className="link">
                    <li className="sidebarListItem">{c.name}</li>
                    </Link>
                ))*/}
                
            </ul>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
                <i className="sidebarIcon fa-brands fa-facebook"></i>
                <i className="sidebarIcon fa-brands fa-twitter"></i>
                <i className="sidebarIcon fa-brands fa-instagram"></i>
            </div>
        </div>
    </div>
  )
}

export default Sidebar