var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Display Login Form
router.get('/login', function(req, res, next) {
  res.render('login');
});


// Login Process Route
router.post('/login', function(req, res, next) {
  
  var my1 = req.body.txt1;
  console.log(my1);

  req.session.mysess = my1;
  console.log("Session value is " + req.session.mysess);
  res.redirect("/home");
});

router.get('/home', function(req, res, next) {

  //check Session is set or not
  if(req.session.mysess)
  {
    var username = req.session.mysess;
    //render Session value in Home.ejs file 
    res.render('home', { myvalue : username});
  }else{
    res.redirect('/login');
  }
 
});
router.get('/logout', function(req, res, next) {

  req.session.destroy(function(err){
    res.redirect('/login');
  })
  
});

router.get('/counter', function(req, res, next) {

  if(req.session.views){
    req.session.views++
    res.setHeader('content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  }else{
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
});

module.exports = router;
