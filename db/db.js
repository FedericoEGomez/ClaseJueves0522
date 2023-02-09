const mongoose = require("mongoose")
require("dotenv").config()

const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_CNN)
        console.log("Base de datos conectada")
    } catch {
        console.log("Problemas al conectar con la base de datos")
    }
}

module.exports = {connect}