const { User } = require('../../models');
const { successResponse } = require('../../helpers/response');

function format(user) {
  const { id, username } = user;
  return { id, username, accessToken: user.generateToken() };
}
class AuthController {
  register = async (req, res) => {
    User.register({
      username: req.body.username,
      password: req.body.password,
    })
      .then((data) => {
        res.json(successResponse(res, 201, data));
      })
      .catch((err) => res.send(err.message));
  };

  login = (req, res) => {
    User.authenticate(req.body)
      .then((user) => {
        res.json(format(user));
      })
      .catch((err) => res.send(err));
  };

  whoamiApi = (req, res) => {
    res.render('index', req.user.dataValues);
  };

  logout = (req, res) => {
    res.clearCookies('loginData');
    res.redirect('/login');
  };
}

module.exports = AuthController;
