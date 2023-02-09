const express = require("express")
const router = express.Router()
const Controller = require("../controller/userController")

// su metodo / su exprecion  / su funcion

router.get('/', Controller.userHelllo)
router.get('/info', Controller.userInfo)



module.exports = router