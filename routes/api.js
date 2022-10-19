var express = require('express')
var api = express.Router()

const AuthController = require('../controllers/api/authController')
const UserController = require('../controllers/api/userController')
const authController = new AuthController()
const userController = new UserController()
const bodyParser = require('body-parser')
const RestrictApi = require('../middlewares/restrict-api')
const app = require('../app')
api.use(bodyParser.json())


api.post('/register', authController.register)
api.post('/login', authController.login)

api.use(RestrictApi)

// user
api.get('/user', userController.getUser)
api.get('/user/:id', userController.getDetailUser)
api.delete('/user/:id', userController.deleteUser)

api.post('/biodata', userController.insertBiodata)
api.put('/biodata/:id', userController.updateBiodata)

api.post('/insertHistory', userController.insertHistory)
api.post('/createRoom', userController.createRoom);
api.post('/fight/:room', userController.fightRoom);

module.exports = api
