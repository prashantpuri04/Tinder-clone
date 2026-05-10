const express = require("express");
const app = express();
const {adminAuth,userAuth} = require("./middlewares/auth");
const connectDB = require("./config/database");
//const {userAuth} = require("./middlewares/auth");

const User = require("./models/user");
app.use(express.json());
const PORT = 3000;

//app.use("/admin", adminAuth);
//app.use("/user", userAuth);


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
        
        const user = await User.create(req.body);
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

