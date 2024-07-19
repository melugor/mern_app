const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("../utils/jwt");

function register(req, res) {
    const { firstname, lastname, email, password } = req.body;
    console.log(req.body);
    
    if (!email) return res.status(400).send({ msg: "El email es obligatorio" });
    if (!password) return res.status(400).send({ msg: "La contraseña es obligatoria" });

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "User",
        active: false,
    });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
  
    user.password = hashPassword;
    
    user.save((error, userStorage) => {
        if (error) {
            return res.status(400).send({ msg: "Error al crear el usuario" });
        } else {
            return res.status(200).send(userStorage);
        }
    });
}

function login(req, res) {
    const { email, password } = req.body;
       
    if (!email) return res.status(400).send({ msg: "El email es obligatorio" });
    if (!password) return res.status(400).send({ msg: "La contraseña es obligatoria" });

    const emailLowerCase = email.toLowerCase();

    User.findOne({ email: emailLowerCase }, (error, userStore) => {
        if (error) {
            return res.status(500).send({ msg: "Error del servidor" });
        } else{
            bcrypt.compare(password, userStore.password, (bcryptError, check) => {
                if(bcryptError){
                    res.status(500).send({ msg: "Error del servidor" })
                } else if (!check){
                    res.status(400).send({ msg: "usuario o Contraseña incorrecto" })
                }  else if (!userStore.active){
                    res.status(401).send({ msg: "usuario no autorizado o no activo" })
                }else{
                    res.status(200).send({ msg: "Login ok" })
                }})}})}
            
        
        if (!userStore) {
            return res.status(404).send({ msg: "Usuario no encontrado" });
        }
        
        // Aquí debes agregar la lógica para comparar la contraseña
        const isMatch = bcrypt.compareSync(password, userStore.password);
        if (!isMatch) {
            return res.status(401).send({ msg: "Contraseña incorrecta" });
        }

        // Si todo está bien, puedes generar un token o enviar una respuesta adecuada
        const token = jwt.sign({ id: userStore._id }, "tu_secreto_aqui"); // Asegúrate de tener un secreto
        return res.status(200).send({ token });
    

module.exports = {
    register,
    login
};
