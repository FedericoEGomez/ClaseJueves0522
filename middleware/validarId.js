const {Duxpet} = require("../models/duxpet")
const validarID = async(req, res, next)=>{
    try {
        const item = await Duxpet.findById(req.params.id)
        if (item !== null) {
            next()
        } else {
            res.status(500).json({msg: "el id es invalido"})
        }  
        // promesas    bueno/malo 
    } catch (error) {
        res.status(501).json(error)
    } 
}

module.exports = {validarID}