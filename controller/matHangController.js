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

    getBox = async (req, res) => {
        const {SoLuong} = req.body
        try {
            const box = await db.OHang.findAll({
                where: {
                    DungTich: {
                        [Op.eq]: 
                            sequelize.literal(`(SELECT CASE WHEN EXISTS
                            (Select "DungTich" from "OHang" where 
                            "DungTich" >= (select count("SoLuongHienTai") from "ViTriMatHang" where "MaO" = "OHang"."MaO") + ${SoLuong})
                            then "DungTich" else 0 end isContain)`)
                    } 
                },
                include: {
                    model: db.ViTriMatHang,
                    attributes: ["MaMatHang"]
                }
            })
            if(box && box.length > 0){
                return res.status(200).json({
                    success: true,
                    message: 'Successfully get data',
                    data: box
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

    createProductToBox = async (req, res) => {
        const {MaO, MaMatHang, SoLuong} = req.body
        try {
            const position = await db.ViTriMatHang.findOne({where: {MaO: MaO, MaMatHang, MaMatHang}})
            if(position){
                position.SoLuongHienTai = position.SoLuongHienTai + parseInt(SoLuong)
                position.save()
                return res.status(200).json({
                    success: true,
                    message: 'Successfully save data',
                    data: ''
                })
            }

            await db.ViTriMatHang.create({
                MaO: MaO,
                MaMatHang: MaMatHang,
                SKU: MaMatHang + MaO,
                NgayLenKe: Date.now(),
                SoLuongBanDau: SoLuong,
                SoLuongHienTai: SoLuong
            })

            return res.status(200).json({
                success: true,
                message: 'Successfully insert data',
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

    searchById = async (req, res) => {
        const {id} = req.params
        try {
            let position = await db.ViTriMatHang.findAll({where: {MaMatHang: id}})
            if(position && position.length > 0){
                return res.status(200).json({
                    success: true,
                    message: 'Successfully search data',
                    data: position
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
                message: error.message,
                data: ''
            })
        }
    }

    searchByName = async (req, res) => {
        const {q} = req.query
        try {
            let position = await db.ViTriMatHang.findAll({
                include: {
                    model: db.MatHang,
                    where: {
                        TenMatHang: {
                            [Op.iLike]: `%${q}%`
                        }
                    },
                    attributes: []
                }
            })
            if(position && position.length > 0){
                return res.status(200).json({
                    success: true,
                    message: 'Successfully search data',
                    data: position
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
                message: error.message,
                data: ''
            })
        }
    }

    searchByName1 = async (req, res) => {
        const {q} = req.query
        try {
            let position = await db.MatHang.findAll({
                where: {
                    TenMatHang: {
                        [Op.iLike]: `%${q}%`
                    }
                },
                attributes: {exclude: ["createdAt", "updatedAt"]}
            })
            if(position && position.length > 0){
                return res.status(200).json({
                    success: true,
                    message: 'Successfully search data',
                    data: position
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
                message: error.message,
                data: ''
            })
        }
    }

    searchById1 = async (req, res) => {
        const {q} = req.query
        try {
            let position = await db.MatHang.findAll({
                where: {
                    MaMatHang: {
                        [Op.iLike]: `%${q}%`
                    }
                },
                attributes: {exclude: ["createdAt", "updatedAt"]}
            })
            if(position && position.length > 0){
                return res.status(200).json({
                    success: true,
                    message: 'Successfully search data',
                    data: position
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
                message: error.message,
                data: ''
            })
        }
    }

    getProductByName = async (req, res) => {
        const TenMatHang = req.params.name
        try {
            const product = await db.MatHang.findAll({
                where: {
                    TenMatHang: TenMatHang
                }
            })

            if(product && product.length > 0){
                return res.status(200).json({
                    success: true,
                    message: 'Successfully search data',
                    data: product
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
                message: error.message,
                data: ''
            })
        }
    }

    getProductById = async (req, res) => {
        const MaMatHang = req.params.id
        try {
            const product = await db.MatHang.findAll({
                where: {
                    MaMatHang: MaMatHang
                }
            })

            if(product && product.length > 0){
                return res.status(200).json({
                    success: true,
                    message: 'Successfully search data',
                    data: product
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
                message: error.message,
                data: ''
            })
        }
    }

    checkProductNotInBox = async (req, res) => {
        try {
            let products = await db.MatHang.findAll({
                attributes: {exclude: ["createdAt", "updatedAt"]}
            })

            let productsInBox = await db.ViTriMatHang.findAll({
                attributes: [
                    "MaMatHang",
                    [sequelize.fn('SUM', sequelize.col('SoLuongHienTai')), 'SoLuong']
                ],
                group: ['MaMatHang']
            })

            let mergedArray = products.concat(productsInBox).reduce((acc, curr) => {
                let index = acc.findIndex(item => item.MaMatHang === curr.MaMatHang);
                if (index === -1) {
                    curr.dataValues.SoLuongChuaLenKe = curr.dataValues.SoLuongTon
                    acc.push(curr);
                } else {
                    acc[index].dataValues.SoLuongChuaLenKe = acc[index].dataValues.SoLuongTon - curr.dataValues.SoLuong;
                }
                return acc;
            }, []);

            let filterArr = mergedArray.filter(({SoLuongTon}) => SoLuongTon > 0)

            filterArr = filterArr.map(item => {
                item.dataValues.MatHang = {...item.dataValues}
                item.dataValues.SoLuongChuaLenKe = item.dataValues.SoLuongChuaLenKe
                delete item.dataValues.MaMatHang
                delete item.dataValues.TenMatHang
                delete item.dataValues.SoLuongTon
                delete item.dataValues.isActive
                delete item.dataValues.MaNhaCC
                delete item.dataValues.MaLoaiHang
                delete item.dataValues.MatHang.SoLuongChuaLenKe
                return item
            })
            
            return res.status(200).json({
                success: true,
                message: 'Successfully search data',
                data: filterArr
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