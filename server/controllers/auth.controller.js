const bcrypt = require("bcryptjs")
const User = require("../models/user.model")
const jwt = require("../utils/jwt")

function register(req, res){
    const {firstname, lastname, email, password} = req.body
    console.log(req.body)
    
    if(!email) res.status(400).send({msg:"El email es obligatorio"})
    if(!password) res.status(400).send({msg:"La contraseña es obligatoria"})    

    const user = new User({
        firstname, 
        lastname, 
       
        email: email.toLowerCase(),
        role:"User",
        active: false,
    })

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)
  
    user.password = hashPassword
    
    user.save((error, userStorage) =>{
        if (error){
            res.status(400).send({msg:"Error al crear el usuario"})
        } else {
            res.status(200).send(userStorage)
            }
        }
    )
}
function login(req, res){
    const { email, password} = req.body
       
    if(!email) res.status(400).send({msg:"El email es obligatorio"})
    if(!password) res.status(400).send({msg:"La contraseña es obligatoria"})


    const emailLowerCase = email.toLowerCase()

    User.findOne({ email: emailLowerCase}, (error, userStore) => {
    if (error){
        res.status(500).send({msg: "Error del servidor"})
    } else {
        console.log("Password: ", password)
        console.log(userStore)
        }
    }
)

module.exports = {
    register,
    login
    }
}
