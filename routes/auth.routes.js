const express = require('express')

const router = express.Router()
const authController = require('../controller/authController')
const {verifyToken} = require('../middlewares/auth')


// http://localhost:8080/api/v1/

// router.get('/', authController.index)
router.get('/', verifyToken, authController.handleCheckLogin)

router.post('/login', authController.login)





module.exports = router