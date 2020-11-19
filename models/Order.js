const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    orderItems: {
      type:Array,
      default:[]
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: { 
      type: String, required: true 
    },
    payment:{ 
      type:String,
      default: "Pay Pal"
    },
    itemsPrice: {
      type: Number
    },
    shippingPrice: {
       type: Number
    },
    totalPrice: {
       type: Number
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    paidAt: {
      type: Date
    },
  },
  {timestamps: true}
);

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
