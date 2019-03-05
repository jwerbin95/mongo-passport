const express = require('express')
const passport = require('passport');
const User = require('./models/user')
const path = require('path')
const router = express.Router()

function isLogged(request, response, next){
	if(request.user){
		next()
	}else{
		response.redirect('/login')
	}
}

router.get('/register', (request, response, next)=>{
	response.sendFile(path.join(__dirname+'/views/Register.html'))
})

router.get('/profile', isLogged, (request, response)=>{
	response.send(request.user.username)
})

router.get('/login', (request, response)=>{
	response.sendFile(path.join(__dirname+'/views/login.html'))
})

router.post('/register', (request, response, next)=>{
	User.register(new User({username: request.body.username}), request.body.password, (error)=>{
		if(error){
			console.log(error.stack)
			return next(error)
		}
		console.log('Succesfully registered user!')

		response.redirect('/profile')
	})
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), (request, response)=>{
	response.redirect('/profile')
})

module.exports=router