const express = require("express");
const router = express.Router();
const userNotes = require("../models/Notes");
const fetchuser = require("../middleware/fetchUser");

//Router 1 : Fetch all the notes by using --->> GET : /api/auth/fetchusernotes
router.get("/fetchusernotes", fetchuser, async (req, res) => {
    const notesOfUsers = req.userDetails
    console.log(notesOfUsers)
});

// // Router 2 : Authenticate a user using : POST /api/auth/login . login required (No sign up required)

// router.post(
//   "/login",
//   //Requesting : user need to enter email and password to enter into the app. By clicking on the submit btn user will gonna create a request to verify and data will go along.
//   [
//     body("email", "Enter a valid Email").isEmail(),
//     body("password", "Password cannot be blank").exists(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     // Extraction : extracting pass and email to verify it with the existing mongodb database.
//     const { email, password } = req.body;
//     try {
//       // First check : Email
//       // user.findOne({ email }), it queries the MongoDB database to find a document where the "email" field matches the provided email. If there's a match, it retrieves the entire document associated with that email
//       let existingUser = await user.findOne({ email });
//       if (!existingUser) {
//         return res.status(401).json({ msg: "Invalid Credentials" });
//       }
//       // Second Check : Password
//       // entered password and stored password should match to verify user
//       const existingPassword = await bcrypt.compare(
//         password,
//         existingUser.password
//       );
//       if (!existingPassword) {
//         return res.status(401).json({ msg: "Invalid Credentials" });
//       }
//       // If everything is fine then generate token for that particular user & send it in json format
//       const data = {
//         newUser: {
//           id: existingUser.id,
//         },
//       };
//       // Here : we creating a token by using the user id (stored in data-base) and jwt-secret-key which only backend knows
//       const auth_token = jwt.sign(data, JWT_secret);
//       console.log(auth_token);
//       // Sending token to the client
//       res.json({ auth_token });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Server Error Occured");
//     }
//   }
// );

// // Router 3 : Logged in user details: POST : "api/auth/getuser".
// // fetchuser function : is a middleware acting as a bridge to make id avaiable, to fetch entire document from the database.
// router.post("/getuser",fetchuser, async (req, res) => {
//   try {

//     const userId = req.userDetails;
//     //findById : method to find document.
//     //select : method used to specify which fields should be included or excluded in the query result.
//     const User = await user.findById(userId).select("-password");
//     res.send(User);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error Occured");
//   }
// });
// module.exports = router;
