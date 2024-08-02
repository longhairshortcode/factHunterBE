const express = require("express")
const router = express.Router()
const answersResultsController = require("../controllers/answersResultsController.js")


//http://localhost:4000/answers-results/saveAnswersResults
router.post("/saveAnswersResults", answersResultsController.saveAnswersResults)

//http://localhost:4000/answers-results/updateSaveAnswersResults
router.put("/updateSaveAnswersResults", answersResultsController.updateSaveAnswersResults)

//http://localhost:4000/answers-results/displayAnswersResults
router.get("/displayAnswersResults/:id", answersResultsController.displayAnswersResults)




const answersResultsRouter = router
module.exports = answersResultsRouter