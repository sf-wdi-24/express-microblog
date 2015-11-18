var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
	username: String,
	password: String

});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);
module.exports = User;