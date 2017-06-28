var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDb = require('./seeds');

mongoose.connect("mongodb://localhost/yelp_camp");

// seedDb();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campgrounds', function(req, res) {
  Campground.find({}, function(err, result) {
    if (err) console.log(err);
    else res.render('campgrounds/index', {campgrounds: result});
  })
});

app.post('/campgrounds', function(req, res) {
  Campground.create({
    name: req.body.name, 
    image_url: req.body.image,
    description: req.body.description
  });
  res.redirect('/campgrounds/index');
});

app.get('/campgrounds/new', function(req, res) {
  res.render('campgrounds/new');
});

app.get('/campgrounds/:id', function(req, res) {
  Campground.findById(req.params.id)
    .populate('comments')
      .exec( (err, result) => {
        if (err) {
          console.log(err);
          res.redirect('/');
        } else {
          res.render('campgrounds/show', {campground: result});
        }
  });
});

app.get('/campgrounds/:id/comments/new', function(req, res) {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      req.redirect('/campgrounds')
    } else {
      res.render('comments/new', {campground: campground});
    }
  });
});

app.post('/campgrounds/:id/comments', function(req, res) {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body, (err, comment) => {
        if (err) {
          res.redirect('/campgrounds')
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + req.params.id);
        }
      })
    }
  });
});

app.listen(3000, function() {
  console.log('up and runnon on localhost 3000');
});
