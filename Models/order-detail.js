var mongoose =  require('mongoose');
const {Schema} =  mongoose;

const orderdetailSchema = new Schema ({
    product_id:String,
    product_name :  String,
    product_price : String,
    product_image : String,
    product_quantity :  String,
    user_id :  String
})

const orderdetailModel  = mongoose.model("order-detail",orderdetailSchema)
module.exports = orderdetailModel; 