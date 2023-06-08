const jwt = require('jsonwebtoken')
require('dotenv').config()
const db = require('../models/index')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) 
    return res.status(401).json({
        success: false, 
        message: 'Access token not found'
    })

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.id = decoded.id
        next()
    } catch (error) {
        res.status(403).json({
            success: false, 
            message: 'Invalid token'
        })
    }
}

const verifyTokenEmpOrStoker = async (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) 
    return res.status(401).json({
        success: false, 
        message: 'Access token not found'
    })

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.id = decoded.id
        const role = await db.NhanVien.findByPk(decoded.id)
        if(role.Role == 'NV' || role.Role == 'TK'){
            next()
            return
        }

        res.status(403).json({
            success: false, 
            message: 'Do not have permission'
        })

    } catch (error) {
        res.status(403).json({
            success: false, 
            message: 'Invalid token'
        })
    }
}

const verifyTokenStoker = async (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) 
    return res.status(401).json({
        success: false, 
        message: 'Access token not found'
    })

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.id = decoded.id
        const role = await db.NhanVien.findByPk(decoded.id)
        if(role.Role == 'TK'){
            next()
            return
        }

        res.status(403).json({
            success: false, 
            message: 'Do not have permission'
        })

    } catch (error) {
        res.status(403).json({
            success: false, 
            message: 'Invalid token'
        })
    }
}

const verifyTokenAccountant = async (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) 
    return res.status(401).json({
        success: false, 
        message: 'Access token not found'
    })

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.id = decoded.id
        const role = await db.NhanVien.findByPk(decoded.id)
        if(role.Role == 'KT'){
            next()
            return
        }

        res.status(403).json({
            success: false, 
            message: 'Do not have permission'
        })

    } catch (error) {
        res.status(403).json({
            success: false, 
            message: 'Invalid token'
        })
    }
}

module.exports = {
    verifyTokenEmpOrStoker,
    verifyTokenStoker,
    verifyTokenAccountant,
    verifyToken
}