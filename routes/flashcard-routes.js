const express = require("express")
const router = express.Router()
const flashcardController = require("../controllers/flashcardController.js")


//http://localhost:4000/flashcard/createFlashcard
router.post("/createFlashcard", flashcardController.createFlashcard)

//http://localhost:4000/flashcard/displayCreatedFlashcards
router.get("/displayCreatedFlashcards/:userId", flashcardController.displayCreatedFlashcards)

//http://localhost:4000/flashcard/displayCreatedFlashcards
router.get("/:userId/:topic/:subtopic", flashcardController.displayCreatedFlashcards)




const flashcardRouter = router
module.exports = flashcardRouter