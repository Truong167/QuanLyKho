const express = require('express')

const router = express.Router()
const phieuXuatController = require('../controller/phieuXuatController')
const {
    verifyTokenAccountant,
    verifyTokenEmpOrStoker,
    verifyTokenStoker
} = require('../middlewares/auth')


// http://localhost:8080/api/v1/

router.get('/', phieuXuatController.index)
router.get('/getOrder/:id', phieuXuatController.getOrderById)
router.get('/getAllOrder', phieuXuatController.getAllOrderFromCustomer)
router.get('/getDetailOrder/:id', phieuXuatController.getDetailOrder)
router.get('/getOrderWithoutBill', phieuXuatController.getAllOrderWithoutBill)
router.get('/checkInventory/:id', verifyTokenAccountant, phieuXuatController.checkInventory)
router.get('/getDeliveryBill', phieuXuatController.getAllDeliveryBill)
router.get('/getDetailDeliveryBill/:id', phieuXuatController.getDetailDeliveryBill)
router.get('/getDeliveriesNotComplete', phieuXuatController.getDeliveryNotComplete)

router.post('/createDeliveryBill/:id', verifyTokenStoker, phieuXuatController.createDeliveryBill)
router.post('/createDetailDeliveryBill/:id', verifyTokenEmpOrStoker, phieuXuatController.createDetailDeliveryBill)
router.post('/createBill/:id', verifyTokenAccountant, phieuXuatController.createBill)
router.delete('/delete/:id', verifyTokenStoker, phieuXuatController.deleteDelivery)

router.put('/updateStatus/:id', verifyTokenStoker, phieuXuatController.updateStatus)




module.exports = router