const mangoose = require('mongoose');''
const orderSchema = new mangoose.Schema({
    orderID:{
        type:String,
        default:()=>Date.now(),

    },
    product:[
        {
            productId:{
                type:mangoose.Schema.Types.ObjectId,
                ref:'product',
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
            }
        }
    ],
    user:{
        type:mangoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    totalPrice:Number,
});
const order = mangoose.model('order',orderSchema);
module.exports = order;