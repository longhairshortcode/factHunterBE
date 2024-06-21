const flashcardSchema = require("../models/flashcardSchema.js");


const flashcardController = {
    createFlashcard: async (req, res) => {
    try{
        const {subject, topic, subtopic, question, answer, userID} = req.body
        if (!subject || !topic || !subtopic || !question || !answer || !userID){
            return res.status(400).json({
                message: "All fields required"
            })
        }
        const newFlashcard = await flashcardSchema.create({
            subject: subject,
            topic: topic,
            subtopic: subtopic,
            question: question,
            answer: answer,
            userID: userID
        })
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
        console.log(err);
        res.status(500).json(err);
    }
  }
};


module.exports = flashcardController;