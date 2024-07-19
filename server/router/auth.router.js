const express = require("express")
const AuthController = require("../controllers/auth.controller.js")

const api = express.Router()

api.post("/auth/register/", AuthController.register)
api.post("/auth/login", AuthController.login)

module.exports = api