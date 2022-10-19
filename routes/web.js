var express = require('express');
var web = express.Router();
const HomeController = require('../controllers/web/HomeController');
const AuthController = require('../controllers/web/AuthController');
const homeController = new HomeController();
const authController = new AuthController();
const restrict = require('../middlewares/restrict');
const passport = require('../lib/passport');
const bodyParser = require('body-parser');
web.use(bodyParser.json());

// Authentication
web.get('/login', authController.login);

// restrict
web.use(restrict);

/* GET home page. */
web.get('/', homeController.dashboard); //home dashboard
web.get('/admin', homeController.listAdmin); //list admin
web.get('/editAdmin/:id', homeController.editAdmin); //edit admin
web.post('/editAdmin/:id', homeController.saveAdmin); //edit admin
web.get('/delete/:id', homeController.deleteAdmin); //delete admin

// history
web.get('/history', homeController.history);

// register admin
web.get('/register', homeController.addAdmin); //add admin
web.post('/register', authController.register);
web.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

web.get('/whoami', authController.whoami)
web.get('/logout', authController.logout); //clear sesi

// user
web.get('/listUser', homeController.getUser);
// web.get("/editUser/:id", homeController.editUser); //edit user
// web.post("/editUser/:id", homeController.editUser); //edit user
// web.post("/deleteUser/:id", homeController.deleteUser); //delete user

module.exports = web;
