const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const {API_VERSION} = require ("./constants")

const app = express()

// Importar rutas
const authRoutes = require("./router/auth.router")
const userRoutes = require("./router/user.router")

//Configurar Body Parse
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

//Configurar carpeta static
app.use(express.static("uploads"))

//Configurar Header HTTP - CORS
app.use(cors())

//Configurar Rutas 
app.use(`/api/${API_VERSION}`, authRoutes)
app.use(`/api/${API_VERSION}`, userRoutes)

module.exports = app