var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var campgroundSeeds = [
  {
    name: 'Texas',
    image_url: 'http://yotourist.com/wp-content/uploads/2011/07/camping-in-texas-and-more.jpg',
    description: 'Many great things to do in the big sky of texas'
  },
  {
    name: 'Michigan',
    image_url: 'http://patperry.net/uploads/blog/2010/09/camping-etc-1-of-1-21.jpg',
    description: 'Often underappreciated but many great lakes.. get it great lakes!!'
  },
  {
    name: 'South Dakota',
    image_url: 'http://www.campsd.org/sites/sdcoa/files/images/camping/Camping00010_1.jpg',
    description: 'Lots of native american culture and easy to find desolation'
  },
  {
    name: 'Oregon',
    image_url: 'http://visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg',
    description: 'Some of the most beautiful treed mountains and pristine lakes in the country'
  },
  {
    name: 'Nebraska',
    image_url: 'https://s-media-cache-ak0.pinimg.com/originals/de/5a/d7/de5ad7933888f8932b264a761a55fbb4.jpg',
    description: 'This is just where I am from, but actually has a unique beauty of its own'
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
          text: 'empty text',
          author: 'empty author'
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
