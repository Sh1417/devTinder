const express = require("express");
const app = express();
const {connectDb} = require("./config/database.js")
const User = require("./models/user.js")

app.use(express.json());

app.post("/signUp", async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save();
        res.send("User saved successfully")
    }catch(err){
        res.status(400).send("It's a bad request")
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

