var mongoose = require('mongoose');
var User = require('./models/user');
var Post = require('./models/post');

mongoose.connect("mongodb://localhost/associations-practice");

User.create({
  email: 'bob@gmail.com',
  name: 'bob belcher'
}, (err, user) => {
  if (err) return console.log(err);
  user.save( (err, user) => {
    if (err) return console.log(err);
    console.log('user saved successfully'); 
    console.log(user);
  });
});

Post.create({
  title: 'Lets Go Camping!', 
  content: 'I want to go camping in Montana this summer!'
}, (err, post) => {
  if (err) return console.log(err);
  post.save( (err, post) => {
    if (err) return console.log(err);
    console.log(post); 
    User.findOne({email: 'bob@gmail.com'}, (err, user) => {
      if (err) return console.log(err);
      user.posts.push(post);
      console.log(user);
    });
  });
});
