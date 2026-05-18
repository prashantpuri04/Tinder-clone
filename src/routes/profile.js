const express = require("express");
const cookieParser = require("cookie-parser");
const {userAuth} = require("../middlewares/auth");

const { validateEditProfileData } = require("../utils/validataion");
const { validateSignupData } = require("../utils/validataion");

const profileRouter = express.Router();
profileRouter.use(cookieParser());

profileRouter.get("/profile", userAuth, async(req, res) => {
    try{
// const cookies = req.cookies;
    
//     const {token } = cookies;
//     if(!token){
//         throw new Error("Invalid Credentials!");
//     }
//     const decodedToken = await jwt.verify(token, "DEV@Tinder$780");
   
//     const {_id} = decodedToken;
    
    const user = req.user;
    
    if (!user) {
        throw new Error("User not found with the provided id!");
    }
    res.status(200).send({
        message: "User profile fetched successfully!",
        user
    });
    }
    catch (error) {
        res.status(500).send({
            message: "Error fetching user profile!",
            error
        });
    }
    
});

profileRouter.patch("/profile/edit",userAuth, async(req,res) => {
    try{
        if(!validateEditProfileData(req)){
            return res.status(400).send({
                message: "Invalid fields in request body! Only firstName, lastName, emailId, age, and skills can be updated."
            });
        }

        const loggedInUser = req.user;
        console.log("User from auth middleware:", loggedInUser);
        Object.keys(req.body).forEach(key => {
            loggedInUser[key] = req.body[key];
        });
        await loggedInUser.save();
        res.status(200).send({
            message: "User profile updated successfully!",
            user: loggedInUser
        });
    }
    catch(error){
        res.status(500).send({
            message: "Error updating user profile!",
            error
        });
    }
})


module.exports = profileRouter;