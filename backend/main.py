
# Required Imports
from flask import Flask, jsonify
import stripe 
import os
from dotenv import load_dotenv

#Initialize Flask App
api = Flask(__name__)

# Loads the environment variables from .env file
load_dotenv()

# Create a file .env and enter you stripe api key there to keep it secret & use it here!
stripe.api_key = os.environ.get("STRIPE_API_KEY")

# Home endpoint
# Not required
@api.route('/')
def hello():
  return "Excuse me! Sorry there's nothing here ; ) "

# Payment endpoint
@api.route('/payment/create/<total>')
def create(total):
  intent = stripe.PaymentIntent.create(
    amount=total,
    currency='usd',
  )
 
  # Converting the response into JSON format
  response = jsonify(clientSecret=intent.client_secret)
  
  # Adding requied headers
  response.headers.add('Access-Control-Allow-Origin', '*')
  
  #Returns the client secret along with headers in JSON format
  return response

# Run API
if __name__ == "__main__":
  api.run() 
  
# Made with ❤ by Sudham Jayanthi
