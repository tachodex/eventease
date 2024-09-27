const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phoneNo:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    coverImage:{
        type: String,
        required: false,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
},{ timestamps : true});

const Vendor = mongoose.model("vendor", vendorSchema);

module.exports = Vendor;