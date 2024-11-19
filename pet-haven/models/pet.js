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
      require: yes
    },
    img: String
  },
  {
    timestamps: true
  }
)

const Pet = mongoose.model('Pet', userSchema)
module.exports = Pet
