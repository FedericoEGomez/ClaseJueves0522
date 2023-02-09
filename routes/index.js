const express = require("express")
const router = express.Router()
const {index} = require("../controller/indexController")

// su metodo / su exprecion  / su funcion

router.get('/', index)


module.exports = router