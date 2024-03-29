import "./Header.css"

const Header = () => {
  console.log("Header");
  return (
    <div className="header">
        <div className="headerTitles">
            <span className="headerTitleSm">React and Node</span>
            <span className="headerTitleLg">Blog</span>
        </div>
        <img className="headerImg" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="" />
    </div>
  )
}

export default Header