//Imports (CONSTS for regular js syntax)
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const connectDB = require("./configs/connectDB.js")
const userRouter = require("./routes/user-routes.js")
const flashcardRouter = require("./routes/flashcard-routes.js")
const answersResultsRouter = require("./routes/answers-results-routes.js")
const cors = require("cors")
const bodyParser = require("body-parser")
//Config
require("dotenv").config() 

//Initialize
const app = express()
const PORT = process.env.PORT || 4000




//CORS middleware library 
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "https://fact-hunter-fe.vercel.app","https://fact-hunter-rg5km09m6-longhairs-projects.vercel.app", "https://fact-hunter-aq3c61use-longhairs-projects.vercel.app"]
//EXPRESS has use method
app.use(cors(
    {
        origin: (origin, callback) => {
            if( !origin || allowedOrigins.includes(origin)){
               callback(null, true)     
            }else {
                callback(new Error(
                    "origin not allowed by cors policy"
                ))  
            }
        }, 
        methods:["POST", "GET", "PUT", "DELETE", "PATCH", "HEAD"],
        credentials: true, 
    }
))

// Handle preflight requests
app.options('*', cors());

//json middlewaree
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

//Routes
app.use("/user", userRouter)
app.use("/flashcard", flashcardRouter)
app.use("/answers-results", answersResultsRouter)



//Confirm what this was:
//Listen for port && //Connect to DB
// app.listen(3000, () => {
//     connectDB();
//     console.log("Server is running on 3000")
// })


//Run connect() to establish mongo connection then listen for incoming request on port 3000
async function connect() {
    try{
        await connectDB()
        app.listen(PORT || 4000, () => {
            console.log("Server is running on 4000")
        })
    }catch(err){
        console.log(err)
    }
}

connect()