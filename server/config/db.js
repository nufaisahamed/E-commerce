const mongoose = require("mongoose");

const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("database conncted");
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDB;