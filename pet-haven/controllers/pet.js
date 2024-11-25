const express = require('express')
const router = express.Router()

const Pet = require('../models/pet')
const User = require('../models/user')

router.get('/create-pet', async (req, res) => {
  res.render('applications/creat-pet.ejs')
})

router.post('/create-pet', async (req, res) => {
  req.body.userId = req.session.user._id
  await Pet.create(req.body)
  res.redirect('/create-pet')
})

router.get('/show-pet', async (req, res) => {
  const pets = await Pet.find()
  res.render('applications/show-pet.ejs', { pets: pets })
})

router.get('/applications/:petId/edit-pet', async (req, res) => {
  const id = req.params.petId
  const pet = await Pet.findById(id)
  const user = await User.findById(req.session.user._id)
  let isThere = false
  /*if (user.cart.some(id)) {
    isThere = true
  }*/
  console.log(user.cart)

  /*
  if (user.cart != []) {
    console.log('yes')
  } else {
    //if(){}
  }*/
  user.cart.forEach((c) => {
    if (c == id) {
      isThere = true
    }
  })
  res.render(`applications/edit-pet.ejs`, { pet: pet, isThere: isThere })
})

router.put('/applications/:petId', async (req, res) => {
  const id = req.params.petId
  await Pet.findByIdAndUpdate(id, req.body)
  res.redirect('/show-pet')
})

router.post('/applications/:petId', async (req, res) => {
  const id = req.params.petId
  const user = await User.findById(req.session.user._id)
  // const cart = []
  console.log('user.cart', user.cart)
  user.cart.push(id)
  await user.save()
  // cart.push(user.cart)
  /*
  cart.push(user.cart)
  cart.push(id)*/

  // const updateCart = await User.findByIdAndUpdate(req.session.user._id, {
  //   cart: user.cart
  // })

  res.redirect('/show-pet')
})

router.delete('/applications/:petId', async (req, res) => {
  const id = req.params.petId

  await Pet.findByIdAndDelete(id)
  res.redirect('/show-pet')
})

router.get('/my-pet', async (req, res) => {
  const pets = await Pet.find()
  const myPet = []

  pets.forEach((pet) => {
    if (pet.userId == req.session.user._id) {
      myPet.push(pet)
    }
  })
  res.render('applications/my-pet.ejs', { myPet: myPet })
})

/*
router.delete('/:listingId', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.listingId)
    if (listing.owner.equals(req.session.user._id)) {
      await listing.deleteOne()
      res.redirect('/listings')
    } else {
      res.send("You don't have permission to do that.")
    }
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})*/

module.exports = router
