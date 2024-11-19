const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true
    },
    petId: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
)

const Cart = mongoose.model('Cart', userSchema)
module.exports = Cart
