const mongoose = require("mongoose")


async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_STRING)
        console.log("DB is connected")
    }catch(error){
        console.log("DB did not connect because of this error ", error)
    }
}

module.exports = connectDB