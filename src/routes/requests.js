const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js")

//SEND CONNECTION REQUEST
requestRouter.post("/sendConnectionRequest",async(req,res)=>{

    //SENDING A CONNECTION REQUEST
    console.log("Sending a connection request");
    res.send("Connection request sent")
})

module.exports ={ requestRouter }