const mongoose = require('mongoose')

const petSchema = new mongoose.Schema(
  {
    petname: {
      type: String,
      require: true,
      minlength: [3, 'Name must be more than 3 characters'],
      maxlength: [10, 'Dude change your name']
    },
    pettype: {
      type: String,
      require: true
    },
    bornon: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      require: true
    },
    userId: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    show: {
      type: Boolean,
      default: true
    },
    img: String
  },
  {
    timestamps: true
  }
)

const Pet = mongoose.model('Pet', petSchema)
module.exports = Pet
