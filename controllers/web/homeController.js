const { Admin, User, History } = require('../../models');
const bcrypt = require('bcrypt');

class HomeController {
  // dashboard
  dashboard = (req, res) => {
    User.findAll({
      include: [
        {
          model: History,
          as: 'history',
        },
      ],
    }).then((user) => {
      res.render('index', {
        judul: 'Dashboard',
        content: './pages/dashboard',
        pengguna: user,
      });
    });
  };

  // admin
  addAdmin = (req, res) => {
    res.render('index', {
      judul: 'Add Admin',
      content: './pages/addAdmin',
    });
  };

  listAdmin = (req, res) => {
    Admin.findAll().then((admin) => {
      res.render('index', {
        judul: 'List Admin',
        content: './pages/listAdmin',
        users: admin,
      });
    });
  };

  editAdmin = (req, res) => {
    const id = req.params.id;
    Admin.findOne({
      where: {
        id: id,
      },
    }).then((admin) => {
      res.render('index', {
        judul: 'Edit Admin',
        content: './pages/editAdmin',
        user: admin,
      });
    });
  };

  saveAdmin = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    Admin.update(
      {
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, salt),
      },
      {
        where: { id: req.params.id },
      }
    ).then(res.redirect('/admin'));
  };

  deleteAdmin = (req, res) => {
    const id = req.params.id;
    Admin.destroy({
      where: { id: id },
    }).then(() => {
      res.redirect('/admin');
    });
    console.log(id);
  };

  // user
  getUser = (req, res) => {
    User.findAll().then((admin) => {
      res.render('index', {
        judul: 'List User',
        content: './pages/listUser',
        users: admin,
      });
    });
  };

  // history
  history = (req, res) => {
    History.findAll({
        include: [
          {
            model: User,
            as: 'user',
          },
        ],
        order: [['createdAt', 'DESC']],
      })
      .then((history) => {
        res.render('index', {
          judul: 'History Permainan',
          content: './pages/history',
          history,
        });
      });
  };

  // editUser = (req, res) => {
  //   const id = req.params.id;
  //   User.findOne({
  //     where: {
  //       id: id,
  //     },
  //   }).then((user) => {
  //     res.render("index", {
  //       judul: "Edit User",
  //       content: "./pages/biodata",
  //       user: admin,
  //     });
  //   });
  // };

  // deleteUser = (req, res) => {
  //   const id = req.params.id;
  //   User.destroy({
  //     where: { id: id },
  //   }).then(() => {
  //     res.redirect("/listUser");
  //   });
  //   console.log(id);
  // };

  // POST
  // tampilPost = (req, res) => {
  //   User.findAll({
  //     include: [
  //       {
  //         model: History,
  //         as: "history",
  //       },
  //     ],
  //   }).then((user) => {
  //     res.render("index", {
  //       judul: "Daftar Postingan",
  //       content: "./pages/post",
  //       users: user,
  //     });
  //   });
  // };
}

module.exports = HomeController;
