const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    cartId: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
)

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
