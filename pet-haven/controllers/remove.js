const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Pet = require('../models/pet')

router.put('/applications/:petId', async (req, res) => {
  try {
    console.log('HERE...')
    const pet = await Pet.findById(req.params.petId)
    const user = await User.findById(req.session.user._id)
    // const i = user.cart.findIndex(req.params.petId)

    // user.cart.splice(i, 1)
    // await user.save()
    console.log('req.session.user._id', req.session.user._id)
    console.log(' req.params.petId', req.params.petId)
    await User.findByIdAndUpdate(req.session.user._id, {
      $pull: { cart: req.params.petId }
    })
    res.redirect('/show-pet')
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})

module.exports = router
