const app = require("./app") 
require("dotenv").config()
const port = process.env.PORT || 3000 // declarar un puerto

app.listen(port, () => { // listen +  puerto
    console.log(`Example app http://localhost:${port}/`)
})