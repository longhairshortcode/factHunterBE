const answersResultsSchema = require("../models/answersResultsSchema.js");

const answersResultsController = {

    displayAnswersResults: async (req, res) => {
        const { userID } = req.params;
        console.log("RECIEVED userID parameter: ", userID)
    //     try {
    //         const savedExists = await answersResultsSchema.findOne({ userID });
    //         if (savedExists) {
    //             res.status(200).json({ displayedAnswersResults: savedExists });
    //         } else {
    //             res.status(404).json({ message: "No results found" });
    //         }
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // },
       
        try {
             
            // const {userID} = req.params
            const displayedAnswersResults = await answersResultsSchema.findOne({userID})

            if (displayedAnswersResults){
                console.log("This is the displayedAnswersResults: ", displayedAnswersResults )
                return res.status(200).json({displayedAnswersResults})    
            }else{
                console.log("No flashcards found");
                return res.status(404).json({ message: "No results found" }); 
            }

        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    
    saveAnswersResults: async (req, res) => {
        try {
          const { savedAnswers, userID } = req.body;
    
          // Find if the document already exists
          let answersResult = await answersResultsSchema.findOne({ userID });
    
          if (answersResult) {
            // Update existing document
            answersResult.result = savedAnswers;
            await answersResult.save();
            console.log("This is updatedAnswersResults: ", answersResult);
            return res.status(200).json({ message: 'Document updated', data: answersResult });
          } else {
            // Create new document
            answersResult = new answersResultsSchema({ userID, result: savedAnswers });
            await answersResult.save();
            console.log("This is savedAnswersResults: ", answersResult);
            return res.status(201).json({ message: 'Document created', data: answersResult });
          }
        } catch (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal server error", error: err });
        }
      }
    };
    
    module.exports = answersResultsController;

//     saveAnswersResults: async (req, res) => {
//         try {
//             const {savedAnswers, userID} = req.body
//             const savedAnswersResults = await answersResultsSchema.create({
//                 result : savedAnswers,
//                 userID : userID
//             })
//             console.log("This is savedAnswersResults: ", savedAnswersResults)    
//         if (savedAnswersResults){
//             return res.status(200).json({savedAnswersResults})
//         }
//         } catch (err) {
//             console.log(err);
//             return res.status(500).json({ message: "Internal server error" });
//         }
//     },

//     updateSaveAnswersResults: async (req, res) => {
//         try {
//             const {savedAnswers, userID} = req.body
//             const updatedSavedAnswersResults = await answersResultsSchema.findOneAndUpdate( 
//                 {_id: resultID},
//             {
//                 result : savedAnswers,
    
//             })
//             console.log("This is updatedSavedAnswersResults: ", updatedSavedAnswersResults)    
//         if (updatedSavedAnswersResults){
//             return res.status(200).json({updatedSavedAnswersResults})
//         }
//         } catch (err) {
//             console.log(err);
//             return res.status(500).json({ message: "Internal server error" });
//         }
//     }
// };


// module.exports = answersResultsController;

