//https://clasejueves0522-production.up.railway.app/
import axios from "axios"


const login = async (email, pass)=>{
    try {
        const {data}  = await axios.post("https://clasejueves0522-production.up.railway.app/api/logintoken",{
            email: email,
            password: pass
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

const sendItems = async (token) =>{
    try {
        const headers = {
            "x-token" : token
        }
        const {data} = await axios.get("https://clasejueves0522-production.up.railway.app/api/vertodo",{
            headers
        })
        return data
    } catch (error) {
        console.log(error)
    }
}


const creteItem = async (token, body) =>{
    try {
        const headers = {
            "x-token" : token
        }
        const {data} = await axios.post("https://clasejueves0522-production.up.railway.app/api/crear",{
            body
        },{
            headers
        })
        return data
    } catch (error) {
        console.log(error)
    }
}