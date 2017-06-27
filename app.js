var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var seedDb = require('./seeds');

mongoose.connect("mongodb://localhost/yelp_camp");

seedDb();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campgrounds', function(req, res) {
  Campground.find({}, function(err, result) {
    if (err) console.log(err);
    else res.render('campgrounds', {campgrounds: result});
  })
});

app.post('/campgrounds', function(req, res) {
  Campground.create({
    name: req.body.name, 
    image_url: req.body.image,
    description: req.body.description
  });
  res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res) {
  res.render('campground_form');
});

app.get('/campgrounds/:id', function(req, res) {
  Campground.findById(req.params.id)
    .populate('comments')
      .exec( (err, result) => {
        if (err) {
          console.log(err);
          res.redirect('/');
        } else {
          console.log(result);
          res.render('campground', {campground: result});
        }
  });
});

app.listen(3000, function() {
  console.log('up and runnon on localhost 3000');
});
