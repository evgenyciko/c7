const { Admin } = require('../../models');
const bcrypt = require('bcrypt');
const passport = require('../../lib/passport');
class AuthController {
  login = (req, res) => {
    res.render('login', {
      judul: 'login',
      content: './pages/login',
    })
  };

  doLogin = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  });

  whoami = (req, res) => {
    res.render('index', req.user.dataValues);
  };

  logout = (req, res) => {
    req.logout();
    res.redirect('/login');
  };

  register = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    Admin.create({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, salt),
    }).then(() => {
      res.redirect('/admin');
    });
  };
}

module.exports = AuthController;
