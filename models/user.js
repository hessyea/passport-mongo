
var mongoose = require('nedb');

module.exports = mongoose.model('User',{
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String
});
