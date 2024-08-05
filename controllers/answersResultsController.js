const answersResultsSchema = require("../models/answersResultsSchema.js");

const answersResultsController = {

    displayAnswersResults: async (req, res) => {
        const { userID } = req.params;
        console.log("RECIEVED userID parameter: ", userID)
       
        try {
             
            // const {userID} = req.params
            const displayedAnswersResults = await answersResultsSchema.findOne({userID})

            if (displayedAnswersResults){
                console.log("This is the displayedAnswersResults: ", displayedAnswersResults )
                return res.status(200).json({displayedAnswersResults})    
            }else{
                console.log("No flashcards found");
                return res.status(209).json({ message: "No results found" }); 
            }

        } catch (err) {
            console.log(err);
          res.status(500).json({ message: "Internal server error in the display" , problem:err});
        }
    },
    
    saveAnswersResults: async (req, res) => {
        try {
          const { savedAnswers, userID } = req.body;
          console.log("hay e data" , req.body)
    
          // Find if the document already exists
          let answersResult = await answersResultsSchema.findOne({ userID });
          console.log("here the answers ", answersResult)
          if (answersResult) {
            // Update existing document
            answersResult.result = savedAnswers;
            console.log("This is updatedAnswersResults: ", answersResult);
            await answersResult.save();
            return res.status(200).json({ message: 'Document updated', data: answersResult });
          } else {
            // Create new document
            const theAnswerResult = new answersResultsSchema({ userID, result: savedAnswers });
            console.log("here is my data ", theAnswerResult)
            await theAnswerResult.save();
            console.log("it reached here ");
            return res.status(201).json({ message: 'Document created', data: theAnswerResult });
          }
        } catch (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal server error", error: err });
        }
      }
    };
    
    module.exports = answersResultsController;
