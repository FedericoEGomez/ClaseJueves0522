const express = require("express")
const router = express.Router()
const controllerApi = require("../controller/apiController")
const {validarID} = require("../middleware/validarId")
const {check} = require("express-validator")
const auth = require("../middleware/auth")
const validarJWT = require("../middleware/validarToken")

// su metodo / su exprecion  / su funcion
// => llegamos ruta /ver/id => middleware => controlador
//middlewares a nivel ruta
router.post('/crear',[
    check("nombre").not().isEmpty().withMessage("El campo nombre es requerido"),
    check("raza").not().isEmpty().withMessage("El campo raza es requerido"),
    check("desparasitado").not().isEmpty().withMessage("El campo raza es requerido"),
    check("ultimaVacuna").not().isEmpty().withMessage("El campo ultimaVacuna es requerido"),
    check("edad").not().isEmpty().withMessage("El campo edad es requerido"),
    check("peso").not().isEmpty().withMessage("El campo peso es requerido"),
],controllerApi.guardarMascota)
router.get('/vertodo',controllerApi.vistaDeTodasLasMascotas)
router.get('/ver/:id',validarID,controllerApi.vistaUnicaMascota)
router.get('/busqueda/:raza',controllerApi.busquedaMascota)
router.get('/hash', controllerApi.prueba)

router.put('/editar/:id',validarID,[
    check("nombre").not().isEmpty().withMessage("El campo nombre es necesario para actualizar la ficha"),
    check("raza").not().isEmpty().withMessage("El campo raza es necesario para actualizar la ficha"),
    check("desparasitado").not().isEmpty().withMessage("El campo raza es necesario para actualizar la ficha"),
    check("ultimaVacuna").not().isEmpty().withMessage("El campo ultimaVacuna es necesario para actualizar la ficha"),
    check("edad").not().isEmpty().withMessage("El campo edad es necesario para actualizar la ficha"),
    check("peso").not().isEmpty().withMessage("El campo peso es necesario para actualizar la ficha"),
],controllerApi.editarMascota)

router.delete('/eliminar/:id',validarID, controllerApi.eliminarMascota)
router.get("/session",controllerApi.session)
router.get("/pruebasession",auth,controllerApi.testSession)
router.get("/cerrarsession", controllerApi.cerrarSession)


router.post("/login",[
    check("email").not().isEmpty().isEmail().withMessage("El campo email es necesario"),
    check("password").not().isEmpty().withMessage("El campo password es necesario"),
],controllerApi.loginUsuarios)

router.delete("/logout",controllerApi.logout)
router.get("/pruebatoken",controllerApi.generarToken)
router.get("/validar", validarJWT,controllerApi.pruebaDelToken)

router.post("/logintoken",[
    check("email").not().isEmpty().isEmail().withMessage("El campo email es necesario"),
    check("password").not().isEmpty().withMessage("El campo password es necesario"),
],controllerApi.loginUsuariosConToken)


module.exports = router