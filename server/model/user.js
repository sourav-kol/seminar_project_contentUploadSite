const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        requires:true
    },
    tags:{
        type:[String],
        required:true
    },
    posts:{
        type:[Number],
        required:false
    }
});

module.exports = mongoose.model("userData",userSchema);