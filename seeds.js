var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var campgroundSeeds = [
  {
    name: 'Texas',
    image_url: 'http://yotourist.com/wp-content/uploads/2011/07/camping-in-texas-and-more.jpg',
    description: 'ec sem id sem molestie porttitor. Proin mattis odio eu velit fringilla, sollicitudin elementum tortor dictum. Vivamus ut nunc venenatis, fringilla odio quis, efficitur arcu. Phasellus aliquet nisi id nulla commodo, non rhoncus felis feugiat. Nullam consequat mauris velit, eget pretium liguvestibulum. Quisque non nisl nec tellus porta dictum. Vivamus ut sapien sit amet urna imperdiet convallis nec non lacus. In efficitur viverra risus, ut congue dui feugiat in. Ut et tortor sed ante alitortor at placerat. Quisque euismod tempor accumsan. Fusce neque orci, varius sit amet tincidunt in, ultrices non elit. Donec a justo augue. Vivamus at consectetur ante. Praesent porta dui et sem sodales iaculis. Phasellus mollis elem'
  },
  {
    name: 'Michigan',
    image_url: 'http://patperry.net/uploads/blog/2010/09/camping-etc-1-of-1-21.jpg',
    description: 't fringilla, sollicitudin elementum tortor dictum. Vivamus ut nunc venenatis, fringilla odio quis, efficitur arcu. Phasellus aliquet nisi id nulla commodo, non rhoncus felis feugiat. Nullam consequat mauris velit, eget pretium ligula porttitor quis. Aliquam fringilla posuere consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Integer consequat faucibus sapien et vestibulum. Quisque non nisl nec tellus p'
  },
  {
    name: 'South Dakota',
    image_url: 'http://www.campsd.org/sites/sdcoa/files/images/camping/Camping00010_1.jpg',
    description: 'ilia Curae Integer consequat faucibus sapien et vestibulum. Quisque non nisl nec tellus porta dictum. Vivamus ut sapien sit amet urna imperdiet convallis nec non lacus. In efficitur viverra risus, ut congue dui feugiat in. Ut et tortor sed ante aliquam elementum quis a ligula. Integer vulputate vel tortor at placerat. Quisque euismod tempor accumsan. Fusce neque orci, varius sit amet tincidunt in, ultrices non elit. Donec a justo augue.'
  },
  {
    name: 'Oregon',
    image_url: 'http://visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg',
    description: 'nsequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Integer consequat faucibus sapien et vestibulum. Quisque non nisl nec tellus porta dictum. Vivamus ut sapien sit amet urna imperdiet convallis nec non lacus. In efficitur viverra risus, ut congue dui feugiat in. Ut et tortor sed ante aliquam elementum quis a ligula. Integer vulputate vel tortor at placerat. Quisque euismod tempor accumsan. Fusce neque orci, varius sit amet tincidunt in, ultrices non elit. Donec a justo augue. Vivamus at consectetur ante. Praesent porta dui et sem sodales iaculis. Phasellus mollis elem'
  },
  {
    name: 'Nebraska',
    image_url: 'https://s-media-cache-ak0.pinimg.com/originals/de/5a/d7/de5ad7933888f8932b264a761a55fbb4.jpg',
    description: 'ec sem id sem molestie porttitor. Proin mattis odio eu velit fringilla, sollicitudin elementum tortor dictum. Vivamus ut nunc venenatis, fringilla odio quis, efficitur arcu. Phasellus aliquet nisi id nulla commodo, non rhoncus felis feugiat. Nullam consequat mauris velit, eget pretium ligula porttitor quis. Aliquam fringilla posuere consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Integer consequat faucibus sapien et vestibulum. Quisque non nisl nec tellus porta dictum. Vivamus ut sapien sit amet urna imperdiet convallis nec non lacus. In efficitur viverra risus, ut congue dui feugiat in. Ut et tortor sed ante aliquam elementum quis a ligula. Integer vulputate vel tortor at placerat. Quisque euismod tempor accumsan. Fusce neque orci, varius sit amet tincidunt in, ultrices non elit. Donec a justo augue. Vivamus at consectetur ante. Praesent porta dui et sem sodales iaculis. Phasellus mollis elem'
  },
]

function seedDb() {
  Campground.remove({}, (err, result) => {
    if (err) return console.log(err);
    campgroundSeeds.forEach( (seed) => {
      Campground.create(seed, (err, campground) => {
        if (err) return console.log(err);
        console.log('created campground seed');
        Comment.create({
          text: 'Ive been here.. this place is great!',
          author: 'Nate'
        }, (err, comment) => {
          if (err) return console.log(err);
          campground.comments.push(comment);
          campground.save();
          console.log('created comment seed');
        }); 
      });
    });
  });
}

module.exports = seedDb;
