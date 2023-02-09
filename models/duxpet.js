const mongoose = require("mongoose")

const Schema = mongoose.Schema
const schema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    raza:{
        type:String
    },
    desparasitado:{
        type:Boolean,
        required: true
    },
    ultimaVacuna:{
        type:String,
        required: true
    },
    edad:{
        type:Number,
        required: true
    },
    peso:{
        type: Number,
        required:true
    }
})
const Duxpet = mongoose.model("Duxpet", schema)
module.exports = { Duxpet }