const axios = require("axios")
class Controller {
    userHelllo (req, res){
        res.status(200).send("hola usuario")
     }
    userInfo(req, res){
        //response = respuesta
        res.status(200).json({
            name: "juan"
        })
    }
    async consultaAxios (nombreDelPokemon,temporadaDelPokemon) {
        try {
            const respuesta = await axios.post(
                "https://pokeapi.co/api/v2/pokemon",
                {
                    nombre: nombreDelPokemon,
                    temporada: temporadaDelPokemon
                },{
                    
                }
                )
            return {response: respuesta.data, status: respuesta.status}
        } catch (error) {
            return {response: error.response.data, status: error.response.status} 
        } 
    }
}
module.exports = new Controller