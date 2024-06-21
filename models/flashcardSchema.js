const mongoose = require("mongoose")

const flashcardSchema = new mongoose.Schema({
    subject:{
        type: String,
        required: true,
    },
    topic:{
        type: String,
        required: true,
    },
    subtopic:{
        type: String,
        required: true,
    },
    question:{
        type: String,
        required: true,
    },
    answer:{
        type: String,
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userSchema"
    }
})

module.exports = mongoose.model("flashcard", flashcardSchema)