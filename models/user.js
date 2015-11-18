var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

    var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  username: String,
  password: String
});

// passportLocalMongoose takes care of hashing and 
// salting the user's plain-text password when they 
// sign up. It also takes of comparing the password 
// the user enters at login to their hashed and salted 
// password stored in the database.

UserSchema.plugin(passportLocalMongoose);


var User = mongoose.model('User', UserSchema);
module.exports = User;