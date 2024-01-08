const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors")
//Routes
const authRoute = require("./Routes/auth");
const userRoute = require("./Routes/users");
const postRoute = require("./Routes/posts");
const categoryRoute = require("./Routes/categories");

//uploading imgs
const multer = require('multer');
const path = require("path");

app.use(cors());
dotenv.config();

app.use("/images",express.static(path.join(__dirname,"/images")))

//we can send any json files
app.use(express.json());
mongoose.connect(process.env.MONGO_URL)
.then(console.log("connected to MongoDB"))
.catch((err)=> console.log(err));

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,req.body.name);
    },
});

const upload = multer({storage:storage});
app.post("/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded");
})


//Routing
app.use("/auth",authRoute)
app.use("/users",userRoute);
app.use("/posts",postRoute);
app.use("/categories",categoryRoute);

const port = process.env.PORT || 5000;

//For Deployement
/*if(process.env.NODE_ENV ==="production" ){
    app.use(express.static("client/build"))
}*/
/*
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
  console.log("Here");
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
    console.log("There");
  }
  
  if(process.env.NODE_ENV === 'production'){    
    app.use(express.static('client/build'))  // set static folder 
    //returning frontend for any route other than api 
    app.get('*',(req,res)=>{     
        res.sendFile (path.join(__dirname,'client','build',         
                      'index.html' ));    
    });  
}*/

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})
