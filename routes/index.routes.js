const express = require('express')
const phieuNhapRouter = require('./phieuNhap.routes')
const phieuXuatRouter = require('./phieuXuat.routes')
const authRouter = require('./auth.routes')





// http://localhost:8080/api/v1/


function routes(app){

    app.use('/api/v1/order', phieuNhapRouter)
    app.use('/api/v1/sell', phieuXuatRouter)
    app.use('/api/v1/auth', authRouter)


    app.use('/', (req, res) => {res.send({ message: 'Đây là Quản lý kho Web Services' })});
}

module.exports = routes