const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session')

const isSignedIn = require('./middleware/is-signed-in')
const passUserToView = require('./middleware/pass-user-to-view')

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000'

const path = require('path')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }))
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'))
// Morgan for logging HTTP requests
app.use(morgan('dev'))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

app.use(passUserToView)

//require controllers
const authControllers = require('./controllers/auth')
//use controllers
app.use('/auth', authControllers)

app.use((req, res, next) => {
  if (req.session.message) {
    res.locals.message = req.session.message
    req.session.message = null
  } else {
    res.locals.message = null
  }
  next()
})
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`)
})

//Landing page
app.get('/', async (req, res) => {
  //res.send('Hello...')

  res.render('index.ejs')
})

const petController = require('./controllers/pet')
const removeController = require('./controllers/remove')
const orderController = require('./controllers/order')

app.use('/', petController)
app.use('/remove-pet', removeController)
app.use('/order-pet', orderController)

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
// registrations
// /registrations index
// /registrations/:id show
// URL -> router url. res.redirect , HTML <a href=

app.get('/vip-lounge', isSignedIn, (req, res) => {
  res.send(`Welcome to the party ${req.session.user.username}`)
})
