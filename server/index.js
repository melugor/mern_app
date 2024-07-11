const mongoose = require("mongoose")
const { DB_USER, DB_PASSWORD, DB_HOST, IP_SERVER, API_VERSION } = require ("./constants.js")

mongoose.set('strictQuery', false)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_password}@${DB_host}/`,
    (error) => {
        if (error) throw error
        console.log("La conexion al servidor ha sido exitosa!!");
    }
)