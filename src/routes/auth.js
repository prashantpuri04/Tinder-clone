const express = require("express");

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const authRouter = express.Router();
authRouter.use(cookieParser());


authRouter.post("/signup", async (req, res) => {
    console.log(req.body);
    try{
        console.log(req.body);
        //validateSignupData(req);
        const { firstName, lastName, emailId } = req.body;
        const {password} = req.body;

        const passwordHash = await bcrypt.hash(password, 10);
        console.log("Password hash generated successfully:", passwordHash);
        const user = await User.create({
            firstName, lastName, emailId, password: passwordHash
        });
        res.status(201).send({
            message: "User created successfully!",
            user
        });
    } catch (error) {
        res.status(500).send({
            message: "Error creating user!",
            error
        });
    }
});

authRouter.post("/login", async (req, res) => {
    console.log("Login request received");
    try{
        const { emailId, password } = req.body;
        console.log("Email and password received:", emailId, password);
        const user = await User.findOne({ emailId });
        if (!user) {
            console.log("User not found with email:", emailId);
            return res.status(404).send({
                message: "User not found with the provided email!"
            });
        }
       // const isPasswordValid = await bcrypt.compare(password, user.password);
       const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            //const token  = jwt.sign({_id:user._id, name: user.firstName }, "DEV@Tinder$780", { expiresIn: "1d" });
            const token = await user.getJWT();
            console.log("Login successful, token generated:", token);
            res.cookie("token", token);
            res.status(200).send({
            message: "Login successful!",
            user
        });
            
        }
       
    } catch (error) {
        res.status(500).send({
            message: "Error during login!",
            error
        });
    }
});

authRouter.post("/logout", async(req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logout successful!");
})

module.exports = authRouter;