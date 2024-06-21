const express = require("express")
const router = express.Router()
const flashcardController = require("../controllers/flashcardController.js")


//http://localhost:4000/flashcard/createFlashcard
router.post("/createFlashcard", flashcardController.createFlashcard)






const flashcardRouter = router
module.exports = flashcardRouter