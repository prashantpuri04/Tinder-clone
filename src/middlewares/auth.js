const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = (req, res, next) => {
//     console.log("Admin auth middleware called");
//     const token = "xyz";
//     const isAdminAuthorized = token === "xyz";
//     if (!isAdminAuthorized) {
//         console.log("Admin not authorized");
//         res.status(401).send("Access denied. Admin privileges required.");
//     } else {
//         console.log("Admin authorized");
//         next();
//     }
 };

const userAuth = async(req, res, next) => {
    try{
    const {token} = req.cookies;
    if( !token){
        throw new Error("Token not valid !");
    }

    const decodedToken = jwt.verify(token, "DEV@Tinder$780");

    const {_id} = decodedToken;

    const user = await User.findById(_id);
    
    if (!user) {
        throw new Error("User not found with the provided id!");
    }
    req.user = user;
    next();
    }
    catch (error) {
        res.status(401).send("Access denied. User authentication required.");
    }

};

module.exports = {
    adminAuth,
    userAuth
};