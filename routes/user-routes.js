const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController.js")
// const {signUp} = userController

//http://localhost:4000/user/login
router.post("/login", userController.login)

//http://localhost:4000/user/sign-up
router.post("/sign-up", userController.signUp)




const userRouter = router
module.exports = userRouter