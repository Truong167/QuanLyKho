const {sequelize} = require('../models/index')
const db = require('../models/index')

class phieuNhapController {
    index = (req, res) => {
        res.send('Phiếu nhập')
    }

    getAllOrder = async (req, res) => {
        try {
            const order = await db.DonDatHang.findAll({
                include: [
                    {
                        model: db.NhaCungCap,
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    },
                    {
                        model: db.NhanVien,
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    }
                ],
                attributes: ["MaDonDH", "NgayDatHang"]
            })
            if(order && order.length > 0){
                // order.map(item => {
                //     item.dataValues.TenNhaCC = item.dataValues.NhaCungCap.dataValues.TenNhaCC
                //     item.dataValues.Ho = item.dataValues.NhanVien.dataValues.Ho
                //     item.dataValues.Ten = item.dataValues.NhanVien.dataValues.Ten
                //     delete item.dataValues["NhaCungCap"]
                //     delete item.dataValues["NhanVien"]
                //     return item
                // })
                return res.status(200).json({
                    success: true,
                    message: 'Successfully get data',
                    data: order
                })
            }

            res.status(400).json({
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

    getDetailOrder = async (req, res) => {
        const {id} = req.params
        try {
            const detail = await db.ChiTietDonDatHang.findAll({
                where: {
                    MaDonDH: id
                },
                include: {
                    model: db.MatHang,
                    attributes: ["TenMatHang"]
                },
                attributes: {exclude: ["createdAt", "updatedAt"]},
            })

            if(detail && detail.length > 0){
                detail.map(item => {
                    item.dataValues.TenMatHang = item.dataValues.MatHang.dataValues.TenMatHang
                    delete item.dataValues["MatHang"]
                    return item
                })
                return res.status(200).json({
                    success: true,
                    message: 'Successfully get data',
                    data: detail
                })
            }

            res.status(400).json({
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

    getItemsBySupplier = async (req, res) => {
        const {id} = req.params
        try {
            const items = await db.MatHang.findAll({
                where: {
                    MaNhaCC: id
                },
                attributes: {exclude: ["createdAt", "updatedAt"]},
            })
            if(items && items.length > 0 ){
                return res.status(200).json({
                    success: true,
                    message: 'Successfully get data',
                    data: items
                })
            }
            res.status(400).json({
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

    createReceipt = async (req, res) => {
        const MaNhanVien = req.id
        const {id} = req.params
        const {NgayNhap, TrangThai} = req.body
        try {
            await db.PhieuNhap.create({
                NgayNhap: NgayNhap ? NgayNhap : Date.now(),
                TrangThai: TrangThai,
                MaNhanVien: MaNhanVien,
                MaDonDH: id
            })
            res.status(200).json({
                success: true, 
                message: 'Successfully added',
                data: result
            })
        } catch (error) {
            res.status(500).json({
                success: false, 
                message: error.message, 
                data: ""
            })
        }
    }

    createDetailReceipt = async (req, res) => {
        const {MatHang} = req.body
        const {id} = req.params
        try {
            MatHang = JSON.parse(MatHang)
            let PhieuNhap = await db.PhieuNhap.findByPk(id)
            MatHang = MatHang.map(item => {
                item.MaPhieuNhap = id
                return item
            })
            let result = await sequelize.transaction(async t => {
                await db.ChiTietPhieuNhap.bulkCreate(MatHang, {transaction: t})
                PhieuNhap.TrangThai = true
                await PhieuNhap.save({transaction: t})
            })
            res.status(200).json({
                success: true, 
                message: 'Successfully added',
                data: result
            })
        } catch (error) {
            res.status(500).json({
                success: false, 
                message: error.message, 
                data: ""
            })
        }
    }

    createBill = async (req, res) => {
        const {id} = req.params
        const {Thue} = req.body
        try {
            const receipt = await db.PhieuNhap.findByPk(id, {
                include: [
                    {
                        model: db.ChiTietPhieuNhap,
                        attributes: {exclude: ["createdAt", "updatedAt"]}

                    },
                    {
                        model: db.DonDatHang,
                        attributes: ["MaNhaCC"]
                    }
                ]
            })
            let ThanhTien = 0
            receipt.dataValues.ChiTietPhieuNhaps.map(item => {
                ThanhTien += item.dataValues.SoLuong * item.dataValues.DonGia
            })

            let bill = await db.HoaDonNhap.create({
                ThanhTien: ThanhTien,
                Thue: Thue,
                MaPhieuNhap: id,
                MaNhaCC: receipt.DonDatHang.MaNhaCC
            })
            res.status(200).json({
                success: true, 
                message: 'Successfully added',
                data: bill
            })
        } catch (error) {
            res.status(500).json({
                success: false, 
                message: error, 
                data: ""
            })
        }
    }

    
}


module.exports = new phieuNhapController