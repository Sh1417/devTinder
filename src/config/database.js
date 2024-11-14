const mongoose = require("mongoose");


const connectDb = async () =>{
    await mongoose.connect("mongodb+srv://NamasteSharath:azg0hLxZ6mC9TMVH@namastesharath.jzji7.mongodb.net/devTinder");
}


module.exports = { connectDb };