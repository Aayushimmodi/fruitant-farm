// Insert in DB
var mongoose = require("mongoose");
const {Schema} = mongoose;

const adminSchema =  new Schema({
            admin_name :   String, 
            admin_email : String,
            admin_password : String
})

var adminModel =  mongoose.model("admin",adminSchema);

module.exports = adminModel;