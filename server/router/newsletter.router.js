const express = require("express")
const NewsletterController = require("../controllers/newsletter.controller.js")

const md_auth = require( "../middlewares/authenticated")

const api = express.Router()

api.post("/newsletter", NewsletterController.suscribeEmail)
api.get("/newsletter", [md_auth.asureAuth], NewsletterController.getEmails)
api.delete("/newsletter/:id", [md_auth.asureAuth], NewsletterController.deleteEmail)

/*
api.patch("/post/:id", [md_auth.asureAuth, md_upload], PostController.updatePost)
api.get("/post/:path", PostController.getPost)
*/

module.exports = api