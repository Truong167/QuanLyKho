const {sequelize} = require('../models/index')
const db = require('../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


class authController {
    index = (req, res) => {
        res.send('Auth')
    }

    handleCheckLogin = async (req, res) => {
        try {
            const user = await db.NhanVien.findByPk(req.id)
            if(!user) 
            return res.status(400).json({
                success: false, 
                message: 'User not found', 
                data: ''
            })
            res.status(200).json({
                success: true, 
                message: 'Successfully', 
                data: user
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: ""
            })
        }
    }

    login = async (req, res) => {
        const {TaiKhoan, MatKhau} = req.body
        try {
            let account = await db.ThongTinDangNhap.findByPk(TaiKhoan)
            if(!account)
            return res.status(424).json({
                success: false,
                message: 'Account does not exist',
                data: ""
            })
            const pass = await bcrypt.compare(MatKhau, account.MatKhau)
            if(!pass)
            return  res.status(425).json({
                success: false,
                message: 'Password do not match',
                data: ""
            })

            const accessToken = jwt.sign({id: account.MaNhanVien}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '365d'
            })
            res.status(200).json({
                success: true,
                message: 'Successfully logged in',
                data: accessToken
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: ""
            })
        }

    }
    
}


module.exports = new authController