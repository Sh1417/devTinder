const express = require("express");
const authRouter =  express.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//SIGNUP-API
authRouter.post("/signUp", async (req,res)=>{
    try{
    //Validate the data initially that we get from the request
    validateSignUpData(req);
    
    //ENCRYPT THE PASSWORD
    const{firstName, lastName, emailId, password} = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

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
authRouter.post("/login",async(req,res)=>{
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId})
        console.log("the user is"+user)

        if(!user){
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = user.validatePassword(password)
        console.log("is the password valid:" + isPasswordValid)
        
        if(isPasswordValid){

            //Create  JWT TOKEN
            // const token = await jwt.sign({_id: user._id},"DEV@TINDER$790");
            //SEND A COOKIE 
            const token = await user.getJWT();
            console.log("The token is :"+token)

            res.cookie("token",token )
            res.send("User login successfull")
        }else{
            throw new Error("Invalid credentials")
        }
    }catch(err){
        res.status(400).send("ERROR2: " + err.message)
    }
})

module.exports = { authRouter }