const adminAuth = (req,res,next) =>{
    const token = "xyz";
    const isAuthoriedUser = token === "xyz";
    if(!isAuthoriedUser){
        res.status(401).send("Unauthorized User")
    }else{
        next();
    }
}

module.exports = { adminAuth }