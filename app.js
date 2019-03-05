//required packages
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/user')
const session = require('express-session')
const morgan = require('morgan')
const path = require('path')
const routes = require('./routes')
const passport = require('passport')
 , LocalStrategy = require('passport-local').Strategy
const secret= require('./secret')
const PORT = 3000
const app = express()

//connect to client
mongoose.connect('mongodb://localhost:27017/auth_app', {useNewUrlParser: true})

//middleware
app.use(bodyParser.urlencoded({ extended:true }))
app.use(morgan('combined'))
app.use(session({
	secret: secret,
	cookie: {maxAge: 6000},
	resave: false,
	saveUninitialized: true
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//passport configs
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

//routes
app.use('/', routes)

//error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(PORT, ()=>{
	console.log("Server running on port: "+PORT)
})