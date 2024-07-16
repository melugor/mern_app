const User = require("../models/user")

function register(req, res){
    console.log(req.body)

    res.status(200).send({msg:"Funciono Perfecto !"})
}

module.exports = {
    register,
}