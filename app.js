const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/user')
const session = require('express-session')
const PORT = 3000

const app = express()
mongoose.connect('mongodb://localhost:27017/auth_app')

app.use(bodyParser.urlencoded({ extended:true }))

app.use(session({
	secret: 'testing secret',
	resave: false,
	saveUninitialized: true
}))

app.use((request, response, next) => {
	if(!request.session.views){
		request.session.views = {}
	}

	request.session.views["/get_user"] = (request.session.views["/get_user"] || 0)+1

	next()
})

app.get('/get_user', (request, response)=>{
	let pageViews = request.session.views['/get_user']
	User.find().then(foundUser=>{
		response.send(foundUser + "You viewed this page "+pageViews+" times.")
	})
})



app.listen(PORT, ()=>{
	console.log("Server running on port: "+PORT)
})