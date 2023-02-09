const jwt = require("jsonwebtoken")
const {User} = require("../models/user")
require("dotenv").config()

module.exports = validarJWT = async (req, res, next) =>{
    const token = req.header("x-token")
    if (!token) {
        return res.status(401).json({
            msg: "no hay token en la peticion"
        })
    }
    try {
        const {body} = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(body.id)
        if(!user){
            return res.status(401).json({
                msg: "Token no valido en la - DB"
            })
        }
        next()
    } catch (error) {
        res.status(401).json({
            msg: "Token invalido", error
        })
    }
}