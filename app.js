const express = require("express") // requerir el modulo o libreria de trabajo
const logger = require("morgan")
//middlewares a nivel aplicacion 
const cors = require("cors")
const cookieParser = require("cookie-parser")
const session = require("express-session")
require("dotenv").config()

const app = express() //express expresado como una funcion

const indexRouter = require("./routes/index")
const userRouter = require("./routes/user")
const apiRouter = require("./routes/api")

const {connect} = require("./db/db")


app.use(logger("dev"))
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

//http://localhost:3000/user/
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/api",apiRouter)

connect();

module.exports = app
