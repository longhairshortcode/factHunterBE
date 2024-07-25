const answersResultsSchema = require("../models/answersResultsSchema.js");

const answersResultsController = {
    displayAnswersResults: async (req, res) => {
        try {
            const {savedAnswers, userID} = req.body
            const displayedAnswersResults = await answersResultsSchema.find(userID)
            if (displayedAnswersResults){
                return res.status(200).json({displayedAnswersResults})
                console.log("This is the displayedAnswersResults: ", displayedAnswersResults )
            }

        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    
    

    saveAnswersResults: async (req, res) => {
        try {
            const {savedAnswers, userID} = req.body
            const savedAnswersResults = await answersResultsSchema.create({
                result : savedAnswers,
                userID : userID
            })
            console.log("This is savedAnswersResults: ", savedAnswersResults)    
        if (savedAnswersResults){
            return res.status(200).json({savedAnswersResults})
        }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    updateSaveAnswersResults: async (req, res) => {
        try {
            const {savedAnswers, userID} = req.body
            const updatedSavedAnswersResults = await answersResultsSchema.findOneAndUpdate(...prev,
            {
                result : savedAnswers,
                userID : userID
            })
            console.log("This is updatedSavedAnswersResults: ", updatedSavedAnswersResults)    
        if (updatedSavedAnswersResults){
            return res.status(200).json({updatedSavedAnswersResults})
        }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};


module.exports = answersResultsController;

