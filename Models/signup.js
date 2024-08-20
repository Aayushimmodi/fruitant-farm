var mongoose  = require('mongoose')
const {Schema} = mongoose;

const userSchema  = new Schema({
  user_name :  String,
  user_number : String,
  user_email : String,
  user_password : String
}) 

var userModel = mongoose.model("signup",userSchema);

module.exports = userModel;