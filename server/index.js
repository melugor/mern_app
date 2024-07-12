const mongoose = require("mongoose")
const {DB_USER,DB_PASSWORD,DB_HOST,API_VERSION,IP_SERVER}= require("./constants.js")


mongoose.set("strictQuery",false)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`,
    (error) =>{
        if(error) throw error
        console.log("La conexion al servidor ha sido existosa!");
    }
)