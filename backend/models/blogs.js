const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    postId:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String
    },
    body:{
        type:[{}],
        require:true
    },
    tags:{
        type:[String],
        require:true
    },
    username:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0

    },
    posted_at:{
        type:Date,
        require:true
    }
});

module.exports = mongoose.model("blogData",blogSchema);
