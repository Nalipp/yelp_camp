var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/form', function(req, res) {
  // res.send('this is the form page');
  res.render('form');
});

app.post('/form', function(req, res) {
  console.log(req.body);
  res.redirect('index');
});

app.listen(3000, function() {
  console.log('up and runnon on localhost 3000');
});
