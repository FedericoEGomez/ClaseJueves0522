const { Duxpet } = require("../models/duxpet")
const {User} = require("../models/user")
const {validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const generadorToken = require("../helpers/generadorJWT")

module.exports = {
    async guardarMascota  (req, res) {
        try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                const mascota = new Duxpet(req.body)
                await mascota.save()
                res.status(201).json(mascota)
            } else {
                res.status(501).json(err)
            }
        } catch (error) {
            res.status(501).json(error)
        }
    },
    async editarMascota  (req, res) {
        try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                await Duxpet.findByIdAndUpdate(req.params.id,req.body)
                res.status(201).json({msg: "la mascota se actualizo"})
            } else {
                res.status(501).json(err)
            }
        } catch (error) {
            res.status(501).json(error)
        }
    },
    
    async vistaDeTodasLasMascotas (req, res) {
        const mascotas = await Duxpet.find()//TODO
        res.status(200).json({mascotas})
    },
    
    async vistaUnicaMascota (req, res) {
        const mascota = await Duxpet.findById(req.params.id)//busca por el ID
        res.status(200).json(mascota)
    },
    
    async busquedaMascota  (req, res) {
        const item = await Duxpet.findOne({raza: req.params.raza}) //busca por parametro
        res.status(200).json({ item })
    },
    
    
    async eliminarMascota (req, res){
        const mascota = await Duxpet.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: "adios mascota"}, mascota)
    },
    prueba (req, res){
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(req.body.pass, salt)
        let comparacion1 = bcrypt.compareSync(req.body.pass, hash)
        let comparacion2 = bcrypt.compareSync("987654321",hash)
        res.json({
            pass: req.body.pass,
            passHash: hash,
            comp1: comparacion1,
            comp2: comparacion2
        })
    },
    session(req, res){
        let user = {
            _id:"123456789132465789",
            nombre: "Fede",
            idioma: "Español"
        }
        res.cookie("pruebaCookie",user._id,{maxAge: 120000})
        req.session.user  = user
        res.json(req.session.user)
    },
    testSession(req, res){
        console.log(req.session)
        res.json({session: req.session.user, cookie: req.cookies.sessionDelUsuario})
    },
    cerrarSession(req, res){
        req.session.destroy()
        res.clearCookie("pruebaCookie")
        res.json({msg: "session cerrada"})
    },
    async loginUsuarios(req, res){
        try {
            const error = validationResult(req)
            if (error.isEmpty()) {
                const persona = await User.findOne({email: req.body.email})
                if (persona === null) {
                    res.json({msg: "el mail o la contraseña con incorrectas"})
                }
                if (!bcrypt.compareSync(req.body.password, persona.password)){
                    res.json({msg: "el mail o la contraseña con incorrectas"})
                }

                const usuario ={
                    _id: persona._id,
                    name: persona.name
                }

                req.session.user = usuario

                if (req.body.remeber) {
                    res.cookie("sessionDelUsuario",req.session.user,{maxAge: 24000})
                }
                res.json({user: req.session.user})
            } else {
                res.json(error)
            }
        } catch (error) {
            res.json(error)
        } 
    },
    logout (req, res){
        res.clearCookie("sessionDelUsuario"),
        req.session.destroy()
        res.json("se cerro todo")
    },
    async register(req, res){
        try {
            const error = validationResult(req)
            if (error.isEmpty()) {
                let salt = bcrypt.genSaltSync(10)
                let hash = bcrypt.hashSync(req.body.password, salt)
                
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                })
                await newUser.save()
                res.json(usuario)


            } else {
                res.json(error)
            }
        } catch (error) {
            res.json(error)
        }
    },
    async generarToken(req, res){
        const token = await generadorToken({nombre: "juan"})
        res.json({token:token})
    },
    pruebaDelToken(req, res){
        res.send("paso el token")
    },
    async loginUsuariosConToken(req, res){
        try {
            const error = validationResult(req)
            if (error.isEmpty()) {
                const persona = await User.findOne({email: req.body.email})
                if (persona === null) {
                    res.json({msg: "el mail o la contraseña son incorrectas"})
                }
                if (!bcrypt.compareSync(req.body.password, persona.password)){
                    res.json({msg: "el mail o la contraseña son incorrectas"})
                }
                console.log("SUCCES", persona._id)
                const token = await generadorToken({id: persona._id})
                res.json({msg: "persona logeada", token})
            } else {
                console.log("DECLINED", error)
                res.json(error)
            }
        } catch (error) {
            res.json(error)
        } 
    },
}



