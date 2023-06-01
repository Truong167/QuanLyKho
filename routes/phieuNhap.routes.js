const express = require('express')

const router = express.Router()
const phieuNhapController = require('../controller/phieuNhapController')


// http://localhost:8080/api/v1/

router.get('/', phieuNhapController.index)
router.get('/getAllOrder', phieuNhapController.getAllOrder)
router.get('/getDetailOrder/:id', phieuNhapController.getDetailOrder)
router.get('/getItemsBySupplier/:id', phieuNhapController.getItemsBySupplier)


router.post('/createReceipt/:id', phieuNhapController.createReceipt)
router.post('/createBill/:id', phieuNhapController.createBill)





module.exports = router