// Import necessary modules
import express from "express";
import User from "../schemas/users.js";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

// Import nodemailer and googleapis
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const router = express.Router();

// ... (existing code)
router.get("/checkauthentication", verifyToken, (req,res,next)=>{
  res.send("hello user, you are logged in")
})

router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
  res.send("hello user, you are logged in and you can delete your account")
})

// CREATE (User Registration)
router.post("/register", async (req, res) => {
  const newUser = new User(req.body);
  
  try {
    const savedUser = await newUser.save();
    sendMail(newUser.email,newUser.username);
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE
// router.post("/", async(req,res)=>{
//     const newUser = new User(req.body);

//   try {
//     const saveduser = await newUser.save();
//     res.status(200).json(saveduser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// })


// Your Gmail API credentials
const CLIENT_ID = '1022298861690-t74688ubc9s8g5k7as6d38ajerf9fjfu.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04lSmQ4E9LgR2CgYIARAAGAQSNwF-L9IrdYAM8fA1bxoYSk85rAgnU7JsLtY9yIQUS8hUMJkD4hhkpREvi66gc-Z9-K8nt1Xde1Q';

// Create OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Send email function
async function sendMail(usermail,userName) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'hoosierautorentalandrepair@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'Hoosier Auto Rental And Repair <hoosierautorentalandrepair@gmail.com>',
      to: usermail,
      subject: 'Welcome to Hoosier Rentals!',
      text: 'Thank you for registering with us. We\'re thrilled to have you as a new member of our community!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
    
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Hoosier Rentals!</title>
        </head>
    
        <body>
          <div>
            <h1>Welcome to Hoosier Rentals!</h1>
            <p>Dear ${userName},</p>
            <p>Thank you for registering with us. We're thrilled to have you as a new member of our community!</p>
            <p>Here are a few things you can do on our website:</p>
            <ul>
              <li>Explore our services and products.</li>
              <li>Connect with other members of the family.</li>
              <li>Customize your profile settings.</li>
            </ul>
            <p>If you have any questions or need assistance, feel free to reach out to our support team at hoosierautorentalandrepair@gmail.com.</p>
            <p>Once again, welcome aboard, and we hope you have a fantastic experience on our website!</p>
            <p>Best regards,</p>
            <p>Team Hoosier Auto Rental And Repair</p>
          </div>
        </body>
    
        </html>
      `,
    };
    
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

// Add a new route for sending emails
router.post("/send-email", async (req, res) => {
  try {
    const result = await sendMail();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ... (existing code)
//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

// Export the router
export default router;
