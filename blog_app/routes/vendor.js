const { Router } = require('express');
const Vendor = require('../models/vendor');
const router = Router();

router.get("/",(req,res)=>{
    return res.render("vendor");
});

router.get("/:name",(req,res)=>{
    return res.render("vendorspecific");
});

module.exports = router;