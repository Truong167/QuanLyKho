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
router.get('/getAllBox', matHangController.getBox)
router.get('/searchById/:id', matHangController.searchById)
router.get('/searchById', matHangController.searchById1)
router.get('/searchByName', matHangController.searchByName)
router.get('/searchByName1', matHangController.searchByName1)
router.get('/getProductByName/:name', matHangController.getProductByName)
router.get('/getProductById/:id', matHangController.getProductById)
router.get('/getProductNotInBox', matHangController.checkProductNotInBox)






router.post('/create', matHangController.createProductToBox)








module.exports = router