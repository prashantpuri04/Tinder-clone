const express = require('express');
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();


requestRouter.post("/sendConnectionRequest",userAuth, async(req,res)=>{
    console.log("Sending connection request");
    try{
        const user = req.user;
        res.status(200).send({
            message: user.firstName + "Connection request sent successfully!",
            user
        }); 
    }
    catch (error) {

    }

})

module.exports = requestRouter;