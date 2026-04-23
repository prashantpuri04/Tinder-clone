const express = require("express");
const app = express();
const PORT = 3000;

app.use((req,res)=>{
    res.send("Hello World from the server!");
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});