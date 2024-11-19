const express = require("express");
const app = express();
const {connectDb} = require("./config/database.js")
const User = require("./models/user.js");
const { validateSignUpData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");

app.use(express.json());

//SIGNUP-API
app.post("/signUp", async (req,res)=>{
    try{
    //Validate the data initially that we get from the request
    validateSignUpData(req);
    
    //ENCRYPT THE PASSWORD
    const{firstName, lastName, emailId, password} = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    console.log(passwordHash);

    const user = new User({
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
        password: passwordHash
    })
    
        await user.save();
        res.send("User saved successfully")
    }catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})

//LOGIN-API
app.post("/login",async(req,res)=>{
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId})
        console.log(user)

        if(!user){
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        console.log("The password is "+isPasswordValid)
        
        if(isPasswordValid){
            res.send("User login successfull")
        }else{
            throw new Error("Invalid credentials")
        }
    }catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
})

//Find by email id 
app.get("/user",async (req,res)=>{
    const userEmail = req.body.emailId; 

    try{
        const users = await User.find({emailId: userEmail})
        if(users.length === 0){
            res.send("User not found")
        }else{
            res.send(users)
        }
    }catch(err){
        res.status(400).send("Something went wrong")
    }
   
})

//FEED API - Get /feed
app.get("/feed", async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users)
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

//DELETE BY ID 
app.delete("/user",async(req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully")
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

//UPDATE DATA OF THE USER
app.patch("/update", async(req,res)=>{
    try{
        const data = req.body;
        const userId = req.body.userId;
        const ALLOWED_UPDATES = ["userId","skills","password","photoUrl","about"];
        const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k))
        if(!isUpdateAllowed){
            throw new Error("Update not allowed")
        }
        await User.findByIdAndUpdate(userId, data , {
            runValidators: true,
        });
        res.send("User updated successfully")
    }catch(err){
        res.status(400).send("UPDATE FAILED" +  err.message)
    }
})

connectDb()
.then(()=>{
    console.log("Database connection established.");
    app.listen(7777, ()=>{
        console.log("Hello from port 7777")
    });
    
})
.catch(err =>{
    console.error("Database cannot be connected");
})

