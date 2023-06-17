const express = require('express')

const router = express.Router()
const phieuNhapController = require('../controller/phieuNhapController')
const {
    verifyTokenAccountant,
    verifyTokenEmpOrStoker,
    verifyTokenStoker
} = require('../middlewares/auth')


// http://localhost:8080/api/v1/

router.get('/', phieuNhapController.index)
router.get('/getOrder/:id', phieuNhapController.getOrderById)
router.get('/getAllOrder', phieuNhapController.getAllOrder)
router.get('/getDetailOrder/:id', phieuNhapController.getDetailOrder)
router.get('/getItemsBySupplier/:id', phieuNhapController.getItemsBySupplier)
router.get('/getOrderWithoutBill', phieuNhapController.getOrderWithoutBill)
router.get('/getReceipt', phieuNhapController.getAllReceipt)
router.get('/getDetailReceipt/:id', phieuNhapController.getDetailReceipt)
router.get('/getReceiptsNotComplete', phieuNhapController.getReceiptNotComplete)

router.post('/createReceipt/:id', verifyTokenStoker, phieuNhapController.createReceipt)
router.post('/createDetailReceipt/:id', verifyTokenEmpOrStoker, phieuNhapController.createDetailReceipt)
router.post('/createBill/:id', verifyTokenAccountant, phieuNhapController.createBill)

router.delete('/delete/:id', verifyTokenStoker, phieuNhapController.deleteReceipt)

router.put('/updateStatus/:id', verifyTokenStoker, phieuNhapController.updateStatus)





module.exports = router