const Post = require("../models/post.model")
const image = require("../utils/image")

function createPost(req, res){
    const post = new Post(req, body)
    post.create_at = new Date()

    const imagePath = image.getFilePath(req.files.miniature)
    post.miniature = imagePath

    post.save((error, postStored)=> {
        if(error) {
            res.status(400).send({msg: "Error al crear el post !"})
        }else {
            res.status(201).send(postStored)
        }
    })
}


function getPost(req, res){

    const { page = 1, limit = 10} =req.query
    
    const option = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: {created_at: "desc"}
    }

    Post.paginate({}, option, (error, postStored)=> {
        if(error){
            res.status(400).send({ msg: "Error al obtener los post" })
        }else{
            res.status(200).send(postStored)
        }
    })
}
function updatePost(req, res){
    const { id } = req.params
    const courseData = req.body

    if(req.files.miniature){
        const imagePath = image.getFilePath(req.files.miniature)
        postData.miniature = imagePath
    }
    
    Post.findByIdAndUpdate({ _id: id}, postData, (error)=>{
        if(error) {
            res.status(400).send({msg: "Error al actualizar el post !"})
        }else {
            res.status(200).send({msg: "Actualizacion del post correcta"})
        }
    })
}

module.exports= {
    createPost,
    getPost,
    updatePost,
}