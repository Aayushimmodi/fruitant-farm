
var mongoose = require('mongoose');
const {Schema} =  mongoose;

const orderSchema =  new Schema({
    order_name : String,
	order_mobile : String,
	order_address : String,
	order_date: Date,
	user_id : String
})

const orderModel = mongoose.model('order',orderSchema);
module.exports = orderModel;