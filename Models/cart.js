var mongoose =  require('mongoose');
const {Schema} =  mongoose;

const cartSchema = new Schema ({
    product_id:String,
    product_name :  String,
    product_price : String,
    product_image : String,
    product_quantity :  String,
   // user_id : String
   _user: {
        type : mongoose.Schema.Types.ObjectId,
        ref :  'signup'
   }
})

const cartModel  = mongoose.model("cart",cartSchema)
module.exports = cartModel; 