const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,

    },
    lastName:{
        type: String 
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(value + " is not a valid one")
            }
        }
    },
    password:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error(value + " is not a valid password")
            }
        }
        
    },
    age:{
        type: String,
        min:18,

    },
    gender:{
        type: String,
        validate(value){
            if(!['male','female','others'].includes(value)){
                throw new Error("Gender is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error(value + " is not a valid one")
            }
        }
    },
    about:{
        type: String,
        default: "This is a default about of the user"
    },
    skills:{
        type: [String],
    }
},{timestamps: true})

userSchema.methods.getJWT = async function (){
    const user = this
    const token = await jwt.sign({_id: this._id},"DEV@TINDER$790",{
        expiresIn: "7d"
    });
    console.log(token)
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const isPasswordValid = bcrypt.compare(passwordInputByUser , this.password);
    return isPasswordValid;

}

module.exports = mongoose.model("User", userSchema);

