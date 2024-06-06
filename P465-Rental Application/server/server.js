import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import SelectedCar from "./schemas/selectedcar.js";
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from "express-session";
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const app = express();
dotenv.config({ path: ".env" });
const port = process.env.PORT || 3001;
const Db = process.env.ATLAS_URI;

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
])
passport.use(new GoogleStrategy({
  clientID: '76608576244-fvukg2oaeuqjmmqrdfhm0oqkn8cqljmd.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000'
}, (accessToken, refreshToken, profile, done) => {
  // Your authentication logic here
}));
// app.use(session({ 'express-session' }));
// app.use(passport.initialize());
// app.use(passport.session());

passport.serializeUser((user, done) => {
  // Save user information in the session
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  // Retrieve user information from the session
  done(null, obj);
});

app.use(
  session({
    secret: '123', // replace with a secure random string
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
const host = process.env.HOST || 'localhost';
app.post("/create-checkout-session", async (req, res) => {
  try {
    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // For each item use the id to get it's information
      // Take that information and convert it to Stripe's format
      line_items: req.body.items.map(({ id, quantity }) => {
        const storeItem = storeItems.get(id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: quantity,
        }
      }),
      mode: "payment",
      // Set a success and cancel URL we will send customers to
      // These must be full URLs
      // In the next section we will setup CLIENT_URL
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    })

    res.json({ url: session.url })
    console.log(res);
  } catch (e) {
    // If there is an error send it to the client
    res.status(500).json({ error: e.message })
  }
})

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204, 
};

app.use(cors(corsOptions));



app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

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
 async function sendMail (req,totalAmount)  {
  try {

    const { user, carDetails, startDate, endDate,startTime,endTime ,brand , rating,model ,price ,speed ,gps ,seatType ,automatic,description} = req.body;
    console.log("email");
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
       from: 'Hoosier Auto rental and repair <hoosierautorentalandrepair@gmail.com>',
       to: 'p465group1@gmail.com',
       subject: 'Thank you for selecting your car with Hoosier Rentals!',
       text: 'Car details!',
       html: `
         <!DOCTYPE html>
         <html lang="en">
     
         <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Final Car Selection Details</title>
 </head>
 <body>
   <div>
     <h1>Thank you for selecting your car with Hoosier Rentals!</h1>
     <p>Dear,</p>
     <p>We are excited to inform you about the details of your final car selection. Below are the specifics:</p>
 
     <h2>Selected Car Details:</h2>
     <ul>
       <li><strong>Car Model:</strong> ${model}</li>
       <li><strong>Brand:</strong> ${brand}</li>
       <li><strong>Rating:</strong> ${rating}</li>
       <li><strong>Cost:</strong> ${price} per day</li>
       <li><strong>Seat Type:</strong> ${seatType}</li>
       <li><strong>Gear Type:</strong> ${automatic}</li>
       <li><strong>Description:</strong> ${description}</li>
     </ul>
 
     <h2>Additional Information:</h2>
     <ul>
       <li><strong>Start Date:</strong> ${startDate}</li>
       <li><strong>Start Time:</strong> ${startTime}</li>
       <li><strong>End Date:</strong>${endDate}</li>
       <li><strong>End Time:</strong>${endTime}</li>
     </ul>
 
     <h2>Final Price:</h2>
     <p>The total cost for your selected car rental is: $${totalAmount}</p>
 
     <p>If you have any questions or need further assistance, please feel free to contact us at hoosierautorentalandrepair@gmail.com.</p>
     <p>We look forward to providing you with a great car rental experience!</p>
 
     <p>Best regards,</p>
     <p>Team Hoosier Auto Rental And Repair</p>
   </div>
 </body>
     
         </html>
       `,
     };
     
     const result = await transport.sendMail(mailOptions);
     console.log(result);
     return result;
   } catch (error) {
     return error;
   }
 }

const rate = SelectedCar.price;

app.post('/api/selectedCars', async (req, res) => {
  try {

    const { user, carDetails, startDate, endDate,startTime,endTime ,brand , rating,model ,price ,speed ,gps ,seatType ,automatic,description} = req.body;
    const numberOfDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    // console.log("numberOfDays:",numberOfDays);
    const totalAmount = numberOfDays * price || 0;
    sendMail (req, totalAmount);

    const newSelectedCar = new SelectedCar({
      user,
      carDetails,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      totalAmount, 
    });

    await newSelectedCar.save();
    // console.log("newSelectedCar:",newSelectedCar);
    res.status(201).json({
      success: true,
      data: {
        ...newSelectedCar.toObject(),
        totalAmount,
      },
    });
  } catch (error) {
    console.error('Error adding SelectedCar document:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});

const connect = async () => {
  try {
    await mongoose.connect(Db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

connect()
  .then(() => {
    app.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
