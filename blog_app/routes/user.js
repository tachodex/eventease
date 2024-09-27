const { Router } = require('express');
const User = require('../models/user');
const router = Router();

router.get("/signin",(req,res)=>{
    return res.render("signin");
});

router.get("/signup",(req,res)=>{
    return res.render("signup");
});

router.post("/signup", async (req,res)=>{

    const { firstName ,email, password }= req.body;
    await User.create({
        firstName,
        email,
        password,
    }).catch( (err) => console.log(err));

    return res.redirect("/");
});

router.post("/signin", async (req,res) => {
    const {email, password}= req.body;
    try{
    const token = await User.matchPasswordAndGenerateToken(email,password);
    return res.cookie('token',token).redirect("/");
    }
    catch(Error){
        return res.render("signin",{
            error: "INCORRECT EMAIL OR PASSWORD",
        });
    }

});

router.get('/logout', (req,res) => {
    res.clearCookie('token').redirect("/");
});

module.exports = router;