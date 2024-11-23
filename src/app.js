const express = require("express");
const app = express();
const {connectDb} = require("./config/database.js")
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());

const {authRouter} = require("./routes/auth.js");
const {profileRouter} = require("./routes/profile.js");
const {requestRouter} = require("./routes/requests.js")

app.use("/",authRouter);
app.use("/",profileRouter)



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

