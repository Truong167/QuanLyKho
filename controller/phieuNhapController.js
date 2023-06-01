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
                        attributes: ["TenNhaCC"]
                    },
                    {
                        model: db.NhanVien,
                        attributes: ["Ho", "Ten"]
                    }
                ],
                attributes: ["MaDonDH", "NgayDatHang"]
            })
            if(order && order.length > 0){
                order.map(item => {
                    item.dataValues.TenNhaCC = item.dataValues.NhaCungCap.dataValues.TenNhaCC
                    item.dataValues.Ho = item.dataValues.NhanVien.dataValues.Ho
                    item.dataValues.Ten = item.dataValues.NhanVien.dataValues.Ten
                    delete item.dataValues["NhaCungCap"]
                    delete item.dataValues["NhanVien"]
                    return item
                })
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
        const id1 = 1
        const {id} = req.params
        const {NgayNhap, TrangThai, MatHang} = req.body
        try {
            let MatHang1 = [
                {MaMatHang: 1, SoLuong: 10, DonGia: 100000},
                {MaMatHang: 3, SoLuong: 8, DonGia: 100000}
            ]
            // MatHang = JSON.parse(MatHang)
            const result = await sequelize.transaction(async t => {
                let receipt = await db.PhieuNhap.create({
                    NgayNhap: NgayNhap ? NgayNhap : Date.now(),
                    TrangThai: TrangThai,
                    MaNhanVien: id1,
                    MaDonDH: id
                }, {fields: ["NgayNhap", "TrangThai", "MaNhanVien", "MaDonDH"]}, {transaction: t})
                MatHang = MatHang.map(item => {
                    item.MaPhieuNhap = receipt.MaPhieuNhap
                    return item
                })
                await db.ChiTietPhieuNhap.bulkCreate(MatHang, { transaction: t })
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
        try {
            const receipt = await db.PhieuNhap.findByPk(id, {
                include: [
                    {
                        model: db.ChiTietPhieuNhap

                    },
                    {
                        model: db.DonDatHang
                    }
                ]
            })
            console.log(receipt)
            res.status(200).json({
                success: true, 
                message: 'Successfully added',
                data: receipt
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


module.exports = new phieuNhapController