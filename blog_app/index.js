const express = require('express');
const path = require('path');

const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const vendorRouter = require('./routes/vendor');

const mongoose = require ("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require('./models/blog');

const app = express();

app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/blogify').then( e => console.log("mongo db connected")).catch((err) => console.log('mongo error',err));

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use(express.urlencoded({ extended: false }));

app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/vendor', vendorRouter);
app.use(express.static(path.resolve('./public')))
app.get('/', async (req,res) => {
    const allBlogs = await Blog.find({});
    
    res.render('home',{
     user: req.user,
     blogs: allBlogs,
    });
});

app.listen(PORT, () => console.log(`SERVER RUNNING AT ${PORT}`))