const mongoose = require('mongoose')

let UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
}, {
	collection: "auth_app"
})

let user = mongoose.model('user', UserSchema)
module.exports=user