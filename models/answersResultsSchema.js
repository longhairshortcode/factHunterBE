const mongoose = require("mongoose")

const answersResultsSchema = new mongoose.Schema({
    result:{
        type: Object,
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userSchema",
        required: true
    }
})

module.exports = mongoose.model("answersResults", answersResultsSchema)