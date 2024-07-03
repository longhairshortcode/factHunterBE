const flashcardSchema = require("../models/flashcardSchema.js");


const flashcardController = {
    displayCreatedFlashcards: async (req, res) => {
        try {
            const { userId } = req.params;
            const { subject, topic, subtopic } = req.query;

            console.log("Received parameters:", { subject, topic, subtopic, userId });

            if (!userId) {
                return res.status(400).json({
                    message: "Missing required parameters"
                });
            }

            const query = { userID: userId };
            if (subject) query.subject = subject;
            if (topic) query.topic = topic;
            if (subtopic) query.subtopic = subtopic;

            const createdFlashcardsResult = await flashcardSchema.find(query);

            if (createdFlashcardsResult && createdFlashcardsResult.length > 0) {
                console.log("Here are all the user's flashcards for the requested subject.");
                return res.status(200).json({ createdFlashcardsResult });
            } else {
                console.log("No flashcards found");
                return res.status(200).json({ createdFlashcardsResult: [] });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    
    //one from chat but now third above
    // displayCreatedFlashcards: async (req, res) => {
    //     try { 
    //         const { subject, topic, subtopic, userId } = req.params;
    //         console.log("Received parameters:", { subject, topic, subtopic, userId });

    //         if (!subject || !topic || !subtopic || !userId) {
    //             return res.status(400).json({
    //                 message: "Missing required parameters"
    //             });
    //         }

    //         const createdFlashcards = await flashcardSchema.find({
    //             subject: subject,
    //             topic: topic,
    //             subtopic: subtopic,
    //             userID: userId
    //         });

    //         if (createdFlashcards && createdFlashcards.length > 0) {
    //             console.log("Here are all the user's flashcards for the requested subject.");
    //             return res.status(200).json({ createdFlashcards });
    //         } else {
    //             console.log("No flashcards found");
    //             return res.status(404).json({ message: "No flashcards found" });
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(500).json({ message: "Internal server error" });
    //     }
    // },
    
// my original before but changed it to display function above
    // displayCreatedFlashcards: async (req, res) => {
    //     try{ 
    //         const {subject, topic, subtopic, userId} = req.query
    //         console.log("in the params ", req.params)
    //         console.log("Received parameters:", { subject, topic, subtopic, userId });
    //         if (!subject || !topic || !subtopic || !userId){
    //             return res.status(400).json({
    //                 message: "Missing required parameters"
    //             })
    //         }
    //         const createdFlashcards = await flashcardSchema.find({
    //             subject: subject,
    //             topic: topic,
    //             subtopic: subtopic,
    //             userId: userId
    //         })
    //         console.log("This should be the createdFlashcards multiple if created which should have a sub, topic, subtop, and userId")
    //         if (createdFlashcards && createdFlashcards.length > 0) {
    //             console.log("Here are all the user's flashcards for the requested subject.");
    //             return res.status(200).json({ createdFlashcards });
    //         } else {
    //             console.log("No flashcards found");
    //             return res.status(404).json({ message: "No flashcards found" });
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(500).json({ message: "Internal server error" });
    //     }
    // },
    

    createFlashcard: async (req, res) => {
    try{
        // console.log("arrive here")
        const {subject, topic, subtopic, question, answer, userID} = req.body
        if (!subject || !topic || !subtopic || !question || !answer || !userID){
            return res.status(400).json({
                message: "All fields required"
            })
        }
        console.log("this line")
        const newFlashcard = await flashcardSchema.create({
            subject: subject,
            topic: topic,
            subtopic: subtopic,
            question: question,
            answer: answer,
            userID: userID
        })
        console.log("this line 2")

        if (newFlashcard) {
            console.log("New flashcard created.")
            return res.status(201).json({
                subject: subject,
                topic: topic,
                subtopic: subtopic,
                question: question,
                answer: answer,
                userID: userID  
            })
            
        }

    }catch(err){
        console.log(err.message);
        res.status(500).json({prob : err});
    }
  }
};


module.exports = flashcardController;

