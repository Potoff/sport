const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName : {type : String, require: true},
    lastName : {type : String, require: true},
    token : {type : String, require: true},
    salt : {type : String, require: true},
    hash : {type : String, require: true},
    dateOfBirth : {type : Date, require: true},
    role: {type: String,  default: "customer"},
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;