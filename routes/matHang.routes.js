const express = require('express')

const router = express.Router()
const matHangController = require('../controller/matHangController')
const {
    verifyTokenAccountant,
    verifyTokenEmpOrStoker,
    verifyTokenStoker
} = require('../middlewares/auth')


// http://localhost:8080/api/v1/

router.get('/', matHangController.index)
router.get('/getAllProduct', matHangController.getAllProduct)







module.exports = router