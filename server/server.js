const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');

// const session = require('express-session');
// const mongoSession = require('connect-mongodb-session')(session);

const user = require('./model/user.js');
const blog = require('./model/blogs');
// const post = require('./model/posts');

// "mongodb+srv://sourav:sourav@seminarproject.mmuzm.mongodb.net/blogwebsite?retryWrites=true&w=majority"
const MONGODB_URI = "mongodb+srv://sourav:sourav@seminarproject.mmuzm.mongodb.net/blogwebsite";

// const store = new mongoSession({
//     uri: MONGODB_URI,
//     collection: 'sessions'
// });

// app.use(session({ secret: 'seminar project', resave: false, saveUninitialized: true, cookie: { secure: false, httpOnly:false }}));

app.use(express.json());
app.use(cors());

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true });

let isLoggedin = false;
let usrname = "";

app.get("/user", (req, res) => {
    try {
        res.status(200).json({userStatus : isLoggedin});
    } catch (err) {

    }
})

//registering a new user 
app.post("/signin", async (req, res) => {
    const Email = req.body.email;
    const Password = req.body.password;
    const Username = req.body.username;
    const Tags = req.body.tags;
    const userDetails = new user({ email: Email, password: Password, username: Username, tags: Tags });

    try {
        await userDetails.save();
        res.status(200).json({ inserted: true });
    } catch (err) {
        // res.send(`this is the error :  ${err}`);
        res.status(500).json({ inserted: false });
    }
});



app.post("/postblog", async (req, res) => {
    let userName = usrname;

    const blogData = new blog(
        {
            postId: parseInt(Math.random() * 10000),
            title: req.body.title,
            description: req.body.description,
            body: req.body.body,
            tags: req.body.tags,
            username: userName,
            posted_at: new Date
        }
    );

    try {
        let blogPost = await blogData.save();

        let u = await user.updateOne({ username: userName }, { $push: { posts: parseInt(blogPost.postId) } });

        res.status(200).json({ inserted: true });

    } catch (err) {
        console.log(err);
    }
});



//logging in a user
app.post("/authenticate", async (req, res) => {

    const email = req.body.email;
    const pass = req.body.password;

    user.findOne({ $and: [{ email: email }, { password: pass }] })
        .then(result => {
            if (result !== null) {

                // req.session.isloggedin = true;
                // req.session.username = result.username;

                isLoggedin = true;
                usrname = result.username;

                res.json({ loggedin: true });
            } else {
                // sess.isloggedin = false;
                res.json({ loggedin: false });
            }
        })
        .catch((err) => { console.log(err) });

});


app.get("/blogs", (req, res) => {
    const userName = usrname;// set after login using session or etc.

    console.log(`session   -   ${userName}`);

    user.findOne({ username: userName }, async (err, data) => {
        blog.find({ $and: [{ tags: { $in: data.tags } }, { username: { $ne: userName } }] }, (error, blog) => {
            res.status(200).json(blog);
        });
    });
});


app.get("/getblog/:tag", async (req, res) => {
    const userName = usrname;
    const tags = req.params.tag;

    if (tags !== "All") {
        const data = await blog.find({ $and: [{ tags: { $in: tags } }, { username: { $ne: userName } }] })
            .sort({ posted_at: -1 })
            .limit(10);

        res.status(200).json(data);
    } else {
        const data = await blog.find({ $and: [{ tags: { $in: ["Sports", "Health", "Education", "Food", "Science"] } }, { username: { $ne: userName } }] })
            .sort({ posted_at: -1 })
            .limit(10);

        res.status(200).json(data);
    }

});

app.get("/show/:postid", async (req, res) => {

    let post = await blog.findOne({ postId: req.params.postid });

    res.status(200).send(post);

});

app.get("/logout", async(req, res) =>{
    isLoggedin = false;
    usrname = "";
    res.status(200).send(usrname);
});


//server port 
app.listen(3001, () => {
    console.log("express server running...");
});