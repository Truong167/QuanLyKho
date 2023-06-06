const {sequelize} = require('../models/index')
const db = require('../models/index')
const Sequelize = require('sequelize')
const { Op } = Sequelize
class matHangController {
    index = (req, res) => {
        res.send('Mặt hàng')
    }

    getAllProduct = async (req, res) => {
        try {
            const products = await db.MatHang.findAll({where: {isActive: true}})
            if(products && products.length > 0){
                return res.status(200).json({
                    success: true,
                    message: 'Successfully get data',
                    data: products
                })
            }

            return res.status(400).json({
                success: false,
                message: 'No data',
                data: ''
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: ''
            })
        }
    }
}


module.exports = new matHangController