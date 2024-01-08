const router = require("express").Router();
const User  =require("../models/User");
const bcrypt = require("bcryptjs");


//REGISTER
router.post("/register",async (req,res)=>{
   try {

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password,salt);
    //const hashedPass=req.body.password;
       const newUser = new User({
           username:req.body.username,
           email:req.body.email,
           password:hashedPass,
       });
       //if(req.body.password===req.body.username)
      // {
        //   alert("password and user name should be different");
      // }
     const user = await newUser.save();
     res.status(200).json(user);
   } catch (error) {
       res.status(500).json(error);
   }

})

//LOGIN
router.post("/login",async (req,res)=>{
    try {
        const user =await User.findOne({username:req.body.username});
        !user && res.status(400).json("Invalid credentials")

        //const validated = (req.body.password === user.password)
        const validated = await bcrypt.compare(req.body.password,user.password);
        validated && res.status(400).json(`${user.password}`)
        
        //console.log(req.body.password);
        //console.log(user.password);
        //res.status(200).json(validated);
        //We will have everything but password
        const {password,...others}=user._doc;
        res.status(200).json(others);
        //res.status(200).json(req.body.password);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports=router;