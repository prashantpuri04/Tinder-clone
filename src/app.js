const express = require("express");
const app = express();
const PORT = 3000;

app.get("/user",(req,res)=>{
    res.send({
        name:"John Doe",
        age:30,
        email:"abc.com"
    });
});

app.post("/user",(req,res)=>{
    res.send({
        message:"User created successfully!" ,
    })
});
app.put("/user",(req,res)=>{
    res.send({
        message:"User updated successfully!" ,
    })
}); 
app.delete("/user",(req,res)=>{
    res.send({
        message:"User deleted successfully!" ,  
    })
});

app.use((req,res)=>{
    res.send("Hello World from the server!");
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});