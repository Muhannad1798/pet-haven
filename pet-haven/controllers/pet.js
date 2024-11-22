const express = require('express')
const router = express.Router()

const Pet = require('../models/pet')

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
  res.render(`applications/edit-pet.ejs`, { pet: pet })
})

router.put('/applications/:petId', async (req, res) => {
  const id = req.params.petId
  await Pet.findByIdAndUpdate(id, req.body)
  res.redirect('/show-pet')
})

module.exports = router
