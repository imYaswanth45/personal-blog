import Post from "../post/Post"
import "./Posts.css"

const Posts = ({posts}) => {
  console.log("posts");
  return (
    <div className="posts">
      {
        posts.map((p) =>(
          <Post post={p} />
        ))
        //<h1>Posts</h1>
      }
    </div>
  )
}

export default Posts