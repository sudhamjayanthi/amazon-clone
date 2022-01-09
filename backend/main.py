from flask import Flask, jsonify
import stripe 
import os
from dotenv import load_dotenv

#Initialize Flask App
app = Flask(__name__)

# Loads the environment variables from .env file
load_dotenv()

# Create a file .env and enter you stripe api key there to keep it secret & use it here!
stripe.api_key = os.environ.get("STRIPE_API_KEY")

# Home endpoint
# Not required
@app.route('/')
def hello():
  return "Excuse me! Sorry there's nothing here ; ) "

# Payment endpoint
@app.route('/payment/create/<total>')
def create(total):
  intent = stripe.PaymentIntent.create(
    amount=int(float(total)*100), # stripe accepts amount param in the minor unit of a currency (eg: here it takes cents instead of dollars) 
    currency='usd',
  )
 
  # Converting the response into JSON format
  response = jsonify(clientSecret=intent.client_secret)
  
  # Adding requied headers
  response.headers.add('Access-Control-Allow-Origin', '*')
  
  #Returns the client secret along with headers in JSON format
  return response

# Run app
if __name__ == "__main__":
  app.run() 
  
# Made with ❤ by Sudham Jayanthi
