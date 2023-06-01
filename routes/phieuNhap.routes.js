const express = require('express')

const router = express.Router()
const phieuNhapController = require('../controller/phieuNhapController')


// http://localhost:8080/api/v1/phieuNhap/

router.get('/', phieuNhapController.index)




module.exports = router