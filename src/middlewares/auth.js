const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { Error } = require("mongoose");

const userAuth = async(req,res,next) =>{
    //READ THE TOKEN FROM THE REQUEST COOKIE 

    try{
    const { token } = req.cookies;
    if(!token){
        throw new Error("Token is not valid")
    }

    const decodedMessage = await jwt.verify(token, "DEV@TINDER$790");
    const {_id} = decodedMessage;
    
    const user = await User.findById({_id});

    if(!user){
        throw new Error("User not found")
    }
    req.user = user;
    next();
    }catch(err){
        res.status(404).send("ERROR1: "+err.message )
    }

    //VALIDATE THE TOKEN
    //FIND THE USER
}

module.exports = { userAuth }