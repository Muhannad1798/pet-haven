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
router.get('/past-orders', async (req, res) => {
  const user = await User.findById(req.session.user._id).populate('order')

  res.render('applications/past-orders.ejs', { pets: user.order })
})
router.get('/show-pet', async (req, res) => {
  const pets = await Pet.find()
  res.render('applications/show-pet.ejs', { pets: pets })
})

router.get('/my-cart', async (req, res) => {
  const user = await User.findById(req.session.user._id).populate('cart')
  console.log(user)

  // const pets = []

  // user.cart.forEach(async(c) =>{
  //   const pet = await Pet.findById(c)
  //   pets.push()
  // })
  res.render('applications/my-cart.ejs', { pets: user.cart })
})

router.get('/applications/:petId/order-pet', async (req, res) => {
  const id = req.params.petId
  const pet = await Pet.findById(id)
  const user = await User.findById(req.session.user._id)
  /* user.order.push(id)
  await user.save()

  pet.show = false
  await pet.save()
  */
  res.render('applications/order-pet.ejs', { pet: pet })
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
  if (isThere == true) {
    res.render(`applications/remove-pet.ejs`, { pet: pet, isThere: isThere })
  } else {
    res.render(`applications/edit-pet.ejs`, { pet: pet, isThere: isThere })
  }
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
router.post('/applications/remove-pet/:petId', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.petId)
    const user = await User.findById(req.session.user._id)
    const i = user.cart.findIndex(req.params.petId)

    // user.cart.splice(i, 1)
    // await user.save()
    await User.findByIdAndUpdate(req.session.user._id, {
      $pull: { cart: req.params.petId }
    })
    res.redirect('/show-pet')
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})*/

module.exports = router
