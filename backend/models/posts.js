const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    blogId:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model("posts",postSchema);
