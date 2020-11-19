const Order = require('../models/Order')

exports.create = async(req, res) => {
    console.log(req)
    try{
        let newOrder = new Order()
        newOrder.user = req.user._id
        newOrder.orderItems = req.body.orderItems
        newOrder.shipping = req.body.shipping
        newOrder.payment = req.body.payment
        newOrder.itemsPrice = req.body.itemsPrice
        // newOrder.taxPrice = req.body.taxPrice
        newOrder.shippingPrice = req.body.shippingPrice
        newOrder.totalPrice = req.body.totalPrice
        newOrder = await newOrder.save()
        res.status(200).json({
            successMessage: "Order Created", data: newOrder 
        })
    }
    catch (err){
        console.log("Create order error:", err)
        res.status(500).json({
            errorMessage:"Please try again later!"
        })
    }
}

// exports.delete = async(req, res) => {
//     const order = await Order.findOne({ _id: req.params.id });
//     if (order) {
//       const deletedOrder = await order.remove();
//       res.status(200).json({
//         successMessage: "Order was deleted"
//     })
//     } 
//     else {
//       res.status(404).json({
//           errorMessage:"Order Not Found!"
//         })
//     }
// }