const express = require("express");
const app = express();
const {userAuth} = require("./middlewares/auth");
const connectDB = require("./config/database");
//const {userAuth} = require("./middlewares/auth");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
const bcrypt = require("bcrypt");
//const { validateSignupData } = require("./utils/validataion");

const PORT = 3000;

//app.use("/admin", adminAuth);
//app.use("/user", userAuth);


app.get("/profile", userAuth, async(req, res) => {
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
     
   
app.get("/user",async (req, res) => {
    console.log("Fetching all users");
    try{
        const userEmail = req.body.emailId;
        console.log("User email from request body:", userEmail);
        const users = await User.findOne({ emailId: userEmail });
        if (!users) {
            console.log("User not found with email:", userEmail);
            return res.status(404).send({
                message: "User not found with the provided email!"
            });
        }else{
             res.status(200).send({
            message: "User fetched successfully!",
            users
        });
        }
       
    }catch (error) {
        res.status(500).send({
            message: "Error fetching users!",
            error
        });
    }
});

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.post("/sendConnectionRequest",userAuth, async(req,res)=>{
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


app.get("/feed", async(req,res)=>{
    console.log("Fetching user feed");
    try{
        const users = await User.find();
        res.status(200).send({
            message: "User feed fetched successfully!",
            users
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Error fetching user feed!",
            error
        });
    }
});

app.delete("/user", async(req,res)=>{
    console.log("Deleting user");
    try{
       // const userEmail = req.body.emailId;
       // console.log("User email from request body:", userEmail);
        const deletedUser = await User.findOneAndDelete({ emailId: userEmail });
        if (!deletedUser) {
            console.log("User not found with email:", userEmail);
            return res.status(404).send({
                message: "User not found with the provided email!"
            });
        }else{
             res.status(200).send({
            message: "User deleted successfully!",
            deletedUser
        });
        }
       
    }catch (error) {
        res.status(500).send({
            message: "Error deleting user!",
            error
        });
    }
});

app.patch("/user/:userId", async(req,res)=>{
    console.log("Updating user");
    try{
        const userId = req.params?.userId;
        const data = req.body;
        const ALLOWED_UPDATES = ["firstName","lastName","password"];
        const isUpdateAllowed = Object.keys(data).every((update)=> ALLOWED_UPDATES.includes(update));
        if(!isUpdateAllowed){
            return res.status(400).send({
                message: "Invalid updates! Only firstName, lastName, and password can be updated."
            });
        }
        const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });
        if (!updatedUser) {
            console.log("User not found with id:", userId);
            return res.status(404).send({
                message: "User not found with the provided id!"
            });
        }else{
             res.status(200).send({
            message: "User updated successfully!",
            updatedUser
        });
        }
    }catch (error) {
        res.status(500).send({
            message: "Error updating user!",
            error
        });
    }
});


app.patch("/user", async(req,res)=>{
    console.log("Updating user");
    try{
        const userEmail = req.body.emailId;
        console.log("User email from request body:", userEmail);
        const updatedUser = await User.findOneAndUpdate({ emailId: userEmail }, req.body, { new: true });
        if (!updatedUser) {
            console.log("User not found with email:", userEmail);
            return res.status(404).send({
                message: "User not found with the provided email!"
            });
        }else{
             res.status(200).send({
            message: "User updated successfully!",
            updatedUser
        });
        }
       
    }catch (error) {
        res.status(500).send({
            message: "Error updating user!",
            error
        });
    }
});

// app.get("/admin/dashboard",(req,res)=>{
//     res.send("Welcome to the admin dashboard!");
// });

// app.get("/user",userAuth,(req,res)=>{
//     res.send({
//         name:"John Doe",
//         age:30,
//         email:"abc.com"
//     });
// });

// app.post("/user",(req,res)=>{
//     res.send({
//         message:"User created successfully!" ,
//     })
// });
// app.put("/user",userAuth,(req,res)=>{
//     res.send({
//         message:"User updated successfully!" ,
//     })
// }); 
// app.delete("/user",userAuth,(req,res)=>{
//     res.send({
//         message:"User deleted successfully!" ,  
//     })
// });

// app.use((req,res)=>{
//     res.send("Hello World from the server!");
// });

connectDB().then(()=>{
    console.log("Connected to the database successfully!");
    app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
}).catch((err)=>{
    console.error("Error connecting to the database:", err);
});

