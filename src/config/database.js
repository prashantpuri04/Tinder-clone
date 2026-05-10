const mongoose = require('mongoose');

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://prashantpuri04:3FCJuDMz3aLmAoVE@namastenode.nec1j.mongodb.net/devTinder?appName=NamasteNode");
}



module.exports = connectDB;