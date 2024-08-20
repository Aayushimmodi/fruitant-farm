var mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    product_name :  String,
    product_price : String,
    product_details : String,
    product_image : String,
    _category:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'category'
        }     
})

var productModel = mongoose.model("product",productSchema);
module.exports = productModel;