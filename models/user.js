var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//require passport locl mangoose
passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  username: String,
  password: String
});

UserSchema.plugin(passportLocalMongoose);

//export User
var User = mongoose.model('User', UserSchema);
module.exports = User;