const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Pet = require('../models/pet')

router.put('/applications/:petId', async (req, res) => {
  console.log('here')

  const id = req.params.petId
  const pet = await Pet.findById(id)
  const user = await User.findById(req.session.user._id)
  user.order.push(id)
  await user.save()

  pet.show = false
  await pet.save()

  res.redirect('/my-cart')
})

module.exports = router
