import "./Post.css"
import {Link} from "react-router-dom";
const Post = ({post}) => {
  const PF = `http://localhost:${process.env.PORT || 5000}/images/`;
  //console.log(process.env.PORT);
  return (
    <div className="post">
      {post.photo && (
        <img src={PF + post.photo} alt="" />
      )}
        
        <div className="postInfo">
            <div className="postCats">
               { post.categories.map((c)=>(
                 <span className="postCat">{c.name}</span>
               ))}
            </div>
            <Link to={`/post/${post._id}`} className="link">
                 <span className="postTitle">
                    {post.title}
                 </span>
            </Link>
            <hr />
            <span className="postDate">{new Date(post.createdAt).toDateString}</span>
        </div>
    </div>
  )
}

export default Post