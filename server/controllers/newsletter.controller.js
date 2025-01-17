const Newsletter = require("../models/newsletter.model")

function suscribeEmail(req, res){
    const { email } = req.body

    if(!email) res.status(400).send({msg: "Email obligatorio"})
    
    const newsletter = new Newsletter({
        email: email.toLowerCase(),
    })    

    Newsletter.save ((error)=>{
        if(error) {
            res.status(400).send({msg: "Email ya registrado !"})
        }else {
            res.status(200).send({msg: "Email registrado con exito"})
        }
    })
}

function getEmails(req, res){
    const { page = 1, limit = 10} =req.query
    
    const option = {
        page: parseInt(page),
        limit: parseInt(limit),
    }

    Newsletter.paginate({}, option, (error, emailsStored)=> {
        if(error){
            res.status(400).send({ msg: "Error al obtener los Emails" })
        }else{
            res.status(200).send(emailsStored)
        }
    })
}

function deleteEmail(req, res){
    const { id } = req.params
    
    Newsletter.findByIdAndDelete( id, (error)=>{
        if(error) {
            res.status(400).send({msg: "Error al eliminar el registro !"})
        }else {
            res.status(200).send({msg: "Eliminacioonn correcta del registro"})
        }
    })
}

module.exports = {
    suscribeEmail,
    getEmails,
    getEmails,
    deleteEmail,
}