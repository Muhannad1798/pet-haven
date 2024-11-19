const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      minlength: [5, 'Name must be more than 3 characters'],
      maxlength: [20, 'Dude change your name']
    },
    password: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true,
      minlength: [12, 'write a valid email']
    },
    isAdmin: { type: Boolean, required: true, default: false },
    img: String,
    phone: {
      type: Number,
      minlength: [7, 'write a valid phone number'],
      maxlength: [10, 'write a valid phone number'],
      require: true
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)
module.exports = User
