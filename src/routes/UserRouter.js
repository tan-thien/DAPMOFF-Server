const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController')

router.post('/sign-up',userController.createUser)
router.post('/log-in',userController.loginUser)
router.put('/update-user/:idAcc',userController.updateUser)
router.delete('/delete-user/:idAcc',userController.deleteUser)
router.get('/get-user/:idAcc',userController.getUserById)

module.exports = router

