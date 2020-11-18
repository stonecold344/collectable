const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order')
const { authenticateJWT } = require('../middleware/authenticator')



// router.get("/", authenticateJWT, async (req, res) => {
//   const orders = await Order.find({}).populate('user');
//   res.send(orders);
// });
// router.get("/mine", authenticateJWT, async (req, res) => {
//   const orders = await Order.find({ user: req.user._id });
//   res.send(orders);
// });

// router.get("/:id", authenticateJWT, async (req, res) => {
//   const order = await Order.findOne({ _id: req.params.id });
//   if (order) {
//     res.send(order);
//   } else {
//     res.status(404).send("Order Not Found.")
//   }
// });

// router.delete("/:id", authenticateJWT, async (req, res) => {
//   const order = await Order.findOne({ _id: req.params.id });
//   if (order) {
//     const deletedOrder = await order.remove();
//     res.send(deletedOrder);
//   } else {
//     res.status(404).send("Order Not Found.")
//   }
// });

router.post("/order", authenticateJWT, orderController.create);

// router.put("/:id/pay", authenticateJWT, async (req, res) => {
//   const order = await Order.findById(req.params.id);
//   if (order) {
//     order.isPaid = true;
//     order.paidAt = Date.now();
//     order.payment = {
//       paymentMethod: 'paypal',
//       paymentResult: {
//         payerID: req.body.payerID,
//         orderID: req.body.orderID,
//         paymentID: req.body.paymentID
//       }
//     }
//     const updatedOrder = await order.save();
//     res.send({ message: 'Order Paid.', order: updatedOrder });
//   } else {
//     res.status(404).send({ message: 'Order not found.' })
//   }
// });

export default router;