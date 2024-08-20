var mongoose =  require('mongoose');
const{Schema} = mongoose;

const categorySchema =  new Schema({
    category_name : String
})

var categoryModel = mongoose.model("category",categorySchema);

module.exports = categoryModel;