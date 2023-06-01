const express = require('express')
const phieuNhapRouter = require('./phieuNhap.routes')





// http://localhost:8080/api/v1/


function routes(app){

    app.use('/api/v1/phieuNhap', phieuNhapRouter)

    app.use('/', (req, res) => {res.send({ message: 'Đây là Quản lý kho Web Services' })});
}

module.exports = routes