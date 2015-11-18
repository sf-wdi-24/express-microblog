//re quire mongoose and passport-local-mongoose
var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new Schema({
	firstname: String,
	lastname: String,
	email: String,
	avatar: String,
	username: String,
	password: String
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", UserSchema);
module.exports = User;