var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

var campgroundSchema = new mongoose.Schema({
  name: String,
  image_url: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campgrounds', function(req, res) {
  Campground.find({}, function(err, result) {
    if (err) console.log(err);
    else res.render('index', {campgrounds: result});
  })
});

app.post('/campgrounds', function(req, res) {
  Campground.create({
    name: req.body.name, 
    image_url: req.body.image,
    description: req.body.description
  });
  res.redirect('/');
});

app.get('/campgrounds/new', function(req, res) {
  res.render('campground_form');
});

app.get('/campgrounds/:id', function(req, res) {
  Campground.findById(req.params.id, function(err, result) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.render('campground', {campground: result});
    }
  });
});

app.listen(3000, function() {
  console.log('up and runnon on localhost 3000');
});
