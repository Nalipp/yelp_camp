var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/users_play");

var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
});

var User = mongoose.model("User", userSchema);

User.remove({}, function(err) { 
   console.log('collection removed') 
});

User.create({ 
  firstName: 'bill', 
  lastName: 'grey', 
  email: 'bill@grey.com'}, function(err, result) {
  if (err) return console.log(err);
  console.log(result); 
});

User.create({ 
  firstName: 'betty', 
  lastName: 'thomas', 
  email: 'betty@grey.com'}, function(err, user) {
  if (err) return console.log(err);
  console.log(user); 
});

// User.find({ firstName: 'bill'}, function (err, user) {
//   if (err) return console.error(err);
//   console.log(user);
// });

