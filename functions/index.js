const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const { request, response } = require('express');
const { YoutubeSearchedFor } = require('@material-ui/icons');
const stripe = require("stripe")(
  "sk_test_51HRsQJD05vTlUJVlfWgnaM9pb7C8U4MgkpmxS1S2s8VfkYeTaepMWSAvfk6zKn0yRWMBrbp6hhwdp0cVngwFpZH200K9ik3UjR"
);

// API


//App config
const app = express();

// Middleways
app.use(cors({origin:true}));
app.use(express.json());

// API Routes
app.get('/', (request, response) => response.status(200).send("Hello, this is Sudham"));

app.post('/payment/create', async(request, response) => {
    const total = request.query.total;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd"
    });

    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
   

});

// listen command
exports.api = functions.https.onRequest(app);

// http://localhost:5001/clone-9c7fd/us-central1/api