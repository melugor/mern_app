const jwt = require("../utils/jwt.js")

function asureAuth(req, res, next) {
    if(!req.headers.authorization){
        return res.status(403).send({msg: "La peticion no tiene la cabecera de autenticacion"})
    }

    const token = req.headers.authorization.replace("Bearer", ""). trim();

    try {
        const payload = jwt.decoded(token)

        const {exp} = payload
        const currenData = new Date().getTime()

        console.log(exp)
        console.log(currenData)

        if(exp <= currenDatata){
            return res.status(400).send({msg: "El token ha expirado"})
        }    

        req.user = payload
        next()


    } catch (error) {
        return res.status(400).send({msg: "Token Invalido"})
    }
}


module.exports = {
    asureAuth
};