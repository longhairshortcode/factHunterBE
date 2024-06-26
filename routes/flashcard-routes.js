const express = require("express")
const router = express.Router()
const flashcardController = require("../controllers/flashcardController.js")


//http://localhost:4000/flashcard/createFlashcard
router.post("/createFlashcard", flashcardController.createFlashcard)

//http://localhost:4000/flashcard/displayCreatedFlashcards
router.get("/displayCreatedFlashcards", flashcardController.displayCreatedFlashcards)

ssss
ss


const flashcardRouter = router
module.exports = flashcardRouter