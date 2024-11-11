const express = require("express");
const app = express();


app.use("/test",(req,res)=>{
    res.send("I will give response only when you hit /test")
})

app.use("/home",(req,res)=>{
    res.send("I will give response only when you hit /home")
})

app.use((req,res)=>{
    res.send("Hello I have given the response");
})


app.listen(7777, ()=>{
    console.log("Hello from port 7777")
});
