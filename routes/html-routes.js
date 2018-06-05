const router = require('express').Router();
const db = require('../models');

// for all get routes, const obj = {} stores data needed to conditionally render info for the page

router.get('/', (req, res) => {
  const obj = {};
  obj.page = '/';
  obj.success = req.session.success;

  // loads all articles when '/' is accessed
  db.Article.find()
    .then(articles => {
      obj.articles = articles;

      res.render('index', obj);
      req.session.success = null;
    })
    .catch(err => console.log(err));
});

// loads saved articles for the user
router.get('/saved', (req, res) => {
  const obj = {};
  obj.page = '/saved';
  obj.articles = [];

  res.render('saved.hbs', obj);
});

// signup page
router.get('/signup', (req, res) => {
  const obj = {};
  obj.page = '/signup';
  obj.errors = req.session.errors;

  res.render('signup.hbs', obj);
  req.session.errors = null;
});

// login page
router.get('/login', (req, res) => {
  const obj = {};
  obj.page = '/login';
  obj.errors = req.session.errors;

  res.render('login.hbs', obj);
  req.session.errors = null;
});

module.exports = router;