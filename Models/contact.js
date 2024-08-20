var mongoose =  require('mongoose');
const {Schema} = mongoose

const contactSchema =  new Schema({
    contact_name :  String,
    contact_email :  String,
    contact_subject : String,
    contact_number :  String,
    contact_message :  String
})

var contactModel  = mongoose.model("contact",contactSchema);
module.exports = contactModel;