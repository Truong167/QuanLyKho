const {sequelize} = require('../models/index')
const db = require('../models/index')
const Sequelize = require('sequelize')
const { Op } = Sequelize
class phieuXuatController {
    index = (req, res) => {
        res.send('Phiếu xuất hàng')
    }

    getOrderById = async (req, res) => {
        const {id} = req.params
        try {
            const order = await db.DonDatHangXuat.findByPk(id, {
                include: [
                    {
                        model: db.NhanVien,
                        attributes: {exclude: ["createdAt", "updatedAt"]}
                    },
                    {
                        model: db.KhachHang,
                        attributes: {exclude: ["createdAt", "updatedAt"]}
                    }
                ],
                attributes: ["NgayDatHang", "MaDonDHX"]
            })

            if(order){
                return res.status(200).json({
                    success: true,
                    message: 'Successfully get data',
                    data: order
                })
            }
            return res.status(400).json({
                success: true,
                message: 'Do not have data',
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

    getAllOrderWithoutBill = async (req, res) => {
        try {
            const bill = await db.HoaDonXuat.findAll()
            let MaPhieuXuat = bill.map(item => {
                return item.dataValues.MaPhieuXuat
            })
            console.log(MaPhieuXuat)
            const order = await db.PhieuXuat.findAll({
                where: {
                    [Op.and]: [
                        {
                            MaPhieuXuat: {
                                [Op.notIn]: MaPhieuXuat
                            },
                            LoaiPX: 'XH'
                        }
                    ]
                }
            })
            if(order && order.length > 0){
                return res.status(200).json({
                    success: true,
                    message: 'Successfully get data',
                    data: order
                })
            }

            return res.status(400).json({
                success: true,
                message: 'Do not have data',
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

    getAllOrderFromCustomer = async (req, res) => {
        try {
            const order = await db.DonDatHangXuat.findAll({
                include: [
                    {
                        model: db.KhachHang,
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    },
                    {
                        model: db.NhanVien,
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    }
                ],
                attributes: [
                    "MaDonDHX", "NgayDatHang", 
                    [sequelize.literal(` (SELECT CASE WHEN EXISTS 
                    (Select * from "PhieuXuat" where "MaDonDHX" = "DonDatHangXuat"."MaDonDHX") 
                    then True else False end DaTaoPhieu) `), "DaTaoPhieu"]
                ]
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

    
    checkInventory = async (req, res) => {
        const {id} = req.params
        try {
            const order = await db.ChiTietDonDatHangXuat.findAll({
                where: {
                    MaDonDHX: id
                },
                include: {
                    model: db.MatHang,
                    attributes: ["MaMatHang", "TenMatHang"]
                },
                attributes: ["SoLuong"]
            })

            let MaMatHang = order.map(item => {
                console.log(item)
                return item.dataValues.MatHang.dataValues.MaMatHang
            })

            const product = await db.MatHang.findAll({
                where: {
                    MaMatHang: {
                        [Op.in]: MaMatHang
                    }
                },
                attributes: ["MaMatHang", "TenMatHang", "SoLuongTon"]
            })
            
            product.map(item => {
                item.dataValues.MatHang = {
                    MaMatHang: item.dataValues.MaMatHang,
                    TenMatHang: item.dataValues.TenMatHang,
                }
                delete item.dataValues['MaMatHang']
                delete item.dataValues['TenMatHang']
                return item
            })
            return res.status(200).json({
                success: true,
                message: 'Successfully get data',
                data: {DatHang: order, TonKho: product}
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
            const detail = await db.ChiTietDonDatHangXuat.findAll({
                where: {
                    MaDonDHX: id
                },
                include: {
                    model: db.MatHang,
                    attributes: {exclude: ["createdAt", "updatedAt"]}
                },
                attributes: {exclude: ["createdAt", "updatedAt", "MaMatHang"]},
            })

            if(detail && detail.length > 0){
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

    createDeliveryBill = async (req, res) => {
        const MaNhanVien = req.id
        const {id} = req.params
        const {NgayXuat, DaNhanHang, LyDoXuat, LoaiPX} = req.body
        try {
            console.log(NgayXuat, DaNhanHang, LyDoXuat, LoaiPX)
            const check = await db.PhieuXuat.findAll({where: {MaDonDHX: id}})
            if(check && check.length > 0) {
                return res.status(405).json({
                    success: false, 
                    message: 'Đã tạo phiếu xuất',
                    data: ''
                })
            }
            await db.PhieuXuat.create({
                DaNhanHang: DaNhanHang && DaNhanHang,
                NgayXuat: NgayXuat ? NgayXuat : Date.now(),
                LyDoXuat: LyDoXuat ? LyDoXuat : null,
                LoaiPX: LoaiPX,
                MaNhanVien: MaNhanVien,
                MaDonDHX: id
            })
            return res.status(200).json({
                success: true,
                message: 'Successfully add',
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

    createDetailDeliveryBill = async (req, res) => {
        let {MatHang} = req.body
        const {id} = req.params
        try {
            MatHang = MatHang.map(item => {
                item.MaMatHang = item.MatHang.MaMatHang
                item.MaPhieuXuat = id
                delete item["MatHang"]
                return item
            })
            let result = await sequelize.transaction(async t => {
                await db.ChiTietPhieuXuat.bulkCreate(MatHang, {
                    updateOnDuplicate: ["MaPhieuXuat", "MaMatHang", "SoLuong", "DonGia"]
                } ,{transaction: t})

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
            const receipt = await db.PhieuXuat.findByPk(id, {
                include: [
                    {
                        model: db.ChiTietPhieuXuat,
                        attributes: {exclude: ["createdAt", "updatedAt"]}

                    },
                    {
                        model: db.DonDatHangXuat,
                        attributes: ["MaKhachHang"]
                    }
                ]
            })
            
            let ThanhTien = 0
            receipt.dataValues.ChiTietPhieuXuats.map(item => {
                ThanhTien += item.dataValues.SoLuong * item.dataValues.DonGia
            })

            let bill = await db.HoaDonXuat.create({
                ThanhTien: ThanhTien,
                Thue: Thue,
                MaPhieuXuat: id,
                MaKhachHang: receipt.DonDatHangXuat.MaKhachHang
            })
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

    getAllDeliveryBill = async (req, res) => {
        try {
            const receipt = await db.PhieuXuat.findAll({
                attributes: {exclude: ["createdAt", "updatedAt", "MaNhanVien", "MaDonDHX"]},
                include: [
                    {
                        model: db.NhanVien,
                        attributes: {exclude: ["createdAt", "updatedAt"]}
                    },
                    {
                        model: db.DonDatHangXuat,
                        attributes: [
                            "MaDonDHX", "NgayDatHang",
                            [sequelize.literal(` (SELECT CASE WHEN EXISTS 
                                (Select * from "PhieuXuat" where "MaDonDHX" = "DonDatHangXuat"."MaDonDHX") 
                                then True else False end DaTaoPhieu) `), "DaTaoPhieu"]
                        ],
                        include: {
                            model: db.KhachHang,
                            attributes: {exclude: ["createdAt", "updatedAt"]}
                        }
                    }
                ]
            })
            if(receipt && receipt.length > 0 ){
                return res.status(200).json({
                    success: true, 
                    message: 'Successfully get data',
                    data: receipt
                })
            }
            return res.status(400).json({
                success: true, 
                message: 'No data',
                data: ''
            })
        } catch (error) {
            res.status(500).json({
                success: false, 
                message: error,
                data: ''
            })
        }
    }

    getDetailDeliveryBill = async (req, res) => {
        const {id} = req.params
        try {
            const dt = await db.ChiTietPhieuXuat.findAll({
                where: {
                    MaPhieuXuat: id
                },
                include: {
                    model: db.MatHang,
                    attributes: {exclude: ["createdAt", "updatedAt"]}
                },
                attributes: {exclude: ["createdAt", "updatedAt", "MaMatHang"]}
            })
            if(dt && dt.length > 0 ){
                return res.status(200).json({
                    success: true, 
                    message: 'Successfully get data',
                    data: dt
                })
            }

            return res.status(400).json({
                success: true, 
                message: 'No data',
                data: ''
            })
        } catch (error) {
            res.status(500).json({
                success: false, 
                message: error,
                data: ''
            })
        }
    }

    updateStatus = async (req, res) => {
        const {id} = req.params
        try {
            const receipt = await db.PhieuXuat.findByPk(id)
            if(receipt && !receipt.DaNhanHang){
                    const detail = await db.ChiTietPhieuXuat.findAll({
                        where: {
                            MaPhieuXuat: id
                        },
                        attributes: ["MaMatHang", "SoLuong"]
                    })
    
                    if(detail && detail.length > 0) {
                        const productId = detail.map(item => {
                            return item.dataValues.MaMatHang
                        })
                        const products = await db.MatHang.findAll({
                            where: {
                                MaMatHang: {
                                    [Op.in]: productId
                                }
                            }
                        })
    
    
                        let mergedArray = products.concat(detail).reduce((acc, curr) => {
                            let index = acc.findIndex(item => item.MaMatHang === curr.MaMatHang);
                            if (index === -1) {
                                acc.push(curr);
                            } else {
                                acc[index].SoLuongTon += curr.SoLuong;
                            }
                            return acc;
                        }, []);
    
                        mergedArray = mergedArray.map(item => {
                            return item.dataValues
                        })

                        await sequelize.transaction(async t => {
                            receipt.DaNhanHang = true
                            receipt.save({transaction: t})
                            await db.MatHang.bulkCreate(mergedArray, {updateOnDuplicate: ["MaMatHang", "TenMatHang", "SoLuongTon", "isActive", "MaLoaiHang", "MaNhaCC"]}, {transaction: t})
                        })
    
    
    
                        return res.status(200).json({
                            success: true, 
                            message: 'Successfully update data',
                            data: ''
                        })

                    }
                    return res.status(406).json({
                        success: true, 
                        message: 'Chưa tạo chi tiết phiếu nhập/xuất',
                        data: ''
                    })
                
            } else if(receipt && receipt.DaNhanHang){
                
                return res.status(407).json({
                    success: true, 
                    message: 'Đã cập nhật, không thể thay đổi',
                    data: ''
                })
            }
            return res.status(400).json({
                success: true, 
                message: 'No data',
                data: ''
            })
        } catch (error) {
            res.status(500).json({
                success: false, 
                message: error,
                data: ''
            })
        }
    }

    getDeliveryNotComplete = async (req, res) => {
        try {
            const deliveries = await db.PhieuXuat.findAll({
                where: {
                    DaNhanHang: false
                }
            })
            
            if(deliveries && deliveries.length > 0) {
                return res.status(200).json({
                    success: true, 
                    message: 'Successfully get data',
                    data: deliveries
                })
            }

            return res.status(400).json({
                success: true, 
                message: 'No data',
                data: ''
            })
        } catch (error) {
            res.status(500).json({
                success: false, 
                message: error,
                data: ''
            })
        }
    }

    deleteDelivery = async (req, res) => {
        const MaPhieuXuat = req.params.id
        try {
            await sequelize.transaction(async t => {
                await db.ChiTietPhieuXuat.destroy({
                    where: {
                        MaPhieuXuat: MaPhieuXuat
                    }
                }, {transaction: t})
                await db.PhieuXuat.destroy({
                    where: {
                        MaPhieuXuat: MaPhieuXuat
                    }
                }, {transaction: t})
            })
            return res.status(200).json({
                success: true, 
                message: 'Successfully delete data',
                data: ''
            })
        } catch (error) {
            res.status(500).json({
                success: false, 
                message: error,
                data: ''
            })
        }
    }
}


module.exports = new phieuXuatController