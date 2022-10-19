const { User, History, Biodata } = require('../../models');
const { successResponse } = require('../../helpers/response');

class UserController {
  getUser = (req, res) => {
    User.findAll().then((users) => {
      res.json(
        successResponse(res, 200, users, {
          total: users.length,
        })
      );
    });
  };

  getDetailUser = (req, res) => {
    User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: History,
          as: 'history',
        },
        {
          model: Biodata,
          as: 'biodata',
        },
      ],
    }).then((user) => {
      res.json(successResponse(res, 200, user));
    });
  };

  //   biodata user
  insertBiodata = (req, res) => {
    Biodata.create({
      user_id: req.body.user_id,
      name: req.body.name,
      age: req.body.age,
    }).then((user) => {
      res.json(successResponse(res, 201, user));
    });
  };

  updateBiodata = (req, res) => {
    Biodata.update(
      {
        name: req.body.name,
        age: req.body.age,
      },
      { where: { id: req.params.id } }
    ).then((user) => {
      res.json(successResponse(res, 201, user));
      console.log(user);
    });
  };

  //   history
  insertHistory = (req, res) => {
    History.create({
      user_id: req.body.user_id,
      skor: req.body.skor,
    }).then((skor) => {
      res.json(successResponse(res, 201, skor));
    });
  };

  //   delete semua atribut user
  deleteUser = (req, res) => {
    User.destroy({
      where: {
        id: req.params.id,
      },
    });
    History.destroy({
      where: {
        user_id: req.params.id,
      },
    }),
    Biodata.destroy({
        where: {
          user_id: req.params.id,
        },
    }).then(() => {
        res.json(successResponse(res, 200, null));
    });
  };

  createRoom = (req, res) => {
    const UserId = req.body.UserId;
    const Skor = req.body.Skor
    History.create({
      UserId,
      Skor,
    }).then((data) => {
      successResponse(res, 201, data);
    });
  };

  fightRoom = (req, res) => {
    const room_id = req.params.room;
    let data = {
      p1: req.body.player1,
      p1Choice: req.body.player1_choice,
      p2: req.body.player2,
      p2Choice: req.body.player2_choice,
      hasil: req.body.hasil
    };
    let result = [];
    result.push({data}).then((data) => {
      successResponse(res, 201, data)
    });
  }
}

module.exports = UserController;
