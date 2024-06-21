const userSchema = require("../models/userSchema.js");
const bcrypt = require("bcrypt");

const userController = {
    signUp: async (req, res) => {
        console.log("sign-up fired");
        try {
            const { email, name, password } = req.body;
            const existingUser = await userSchema.findOne({ email });
            if (existingUser) {
                return res.status(409).json({
                    message: "This user email already exists, please log in or sign-up with a new email"
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            if (!hashedPassword) {
                return res.status(409).json({
                    message: "Error processing request"
                });
            }
            const newUser = await userSchema.create({
                email: email,
                name: name,
                password: hashedPassword,
            });
            
            if (newUser) {
                return res.status(200).json({
                    name: newUser.name,
                    email: newUser.email,
                    id: newUser._id,
                })
                console.log("Sign-up successful.");
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    },

    login: async (req, res) => {
        console.log("login fired");
        try {
            const { email, password } = req.body;
            const existingUser = await userSchema.findOne({ email });
            if (!existingUser) {
                return res.status(404).json({
                    message: "This user doesn't exist, please sign-up."
                });
            }
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            if (isPasswordValid) {
                return res.status(200).json({
                    email: existingUser.email,
                    name: existingUser.name,
                    id: existingUser._id,
                    message: "Login successful"
                });
            } else {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
};

module.exports = userController;

//original but changed to top for readability only
// const userSchema = require("../models/userSchema.js")
// const bcrypt = require("bcrypt")


// const userController = {
//     signUp: async (req, res) => {
//         console.log("sign-up fired")
//         try{
//             const {email, name, password} = req.body
//             const existingUser = await userSchema.findOne({email})
//             if (existingUser){
//                 return res.status(409).json({
//                     message: "This user email already exists, please log in or sign-up with new email"
//                 });
//             }
//             const hashedPassword = await bcrypt.hash(password, 10)
//             if (!hashedPassword){
//                 return res.status(409).json({
//                     message: "Error processing request"
//                 })
//             }
//             const newUser = await userSchema.create({
//                 email: email,
//                 name: name,
//                 password: hashedPassword,
//             })
//             if (newUser){
//                 return res.status(200).json({
//                     name: newUser.name, 
//                     email: newUser.email, 
//                     id: newUser._id,
//                 })
//             }
//         }catch(error){
//             console.log(error)
//             res.status(500).json({error})
//         }
//     },


//     login: async (req, res) => {
//         console.log("login fired")
//         try{
//             const {email, password} = req.body
//             const existingUser = await userSchema.findOne({email})
//             if (!existingUser){
//                 return res.status(404).json({
//                     message: "This user doesn't exists, please sign-up."
//                 });
//             }
//             // if (existingUser){
//                 const isPasswordValid = await bcrypt.compare(password, existingUser.password)
//                 if(isPasswordValid){
//                     return res.status(200).json({
//                         email: existingUser.email, 
//                         name: existingUser.name, 
//                         id: existingUser._id,
//                         message: "login successful"
//                     });
//                 } else{
//                     return res.status(401).json({
//                         message: "Invalid email or password"
//                     });
//                     }
//                 }catch (error){
//                     console.log(error);
//                 res.status(500).json({error})                
//             }

//         }

//     }




// module.exports = userController