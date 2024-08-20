var mongoose = require('mongoose');
const{Schema} =  mongoose;

const feedbackSchema  = new Schema({
    feedback_name :  String,
    feedback_details : String,
    user_name : String
})

var feedbackModel =  mongoose.model('feedback',feedbackSchema);
module.exports =  feedbackModel;