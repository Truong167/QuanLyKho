
const db = require('../models/index')

class phieuNhapController {
    index = (req, res) => {
        res.send('Phiếu nhập')
    }

    
    
}


module.exports = new phieuNhapController