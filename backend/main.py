from flask import Flask, jsonify
from dotenv import load_dotenv
import stripe
import os 


load_dotenv()

stripe.api_key = os.environ['STRIPE_API']

app = Flask(__name__)

@app.route('/')
def hello():
  return "Sorry there's nothing here ; )"

@app.route('/payment/create/<total>')
def create(total):
  intent = stripe.PaymentIntent.create( 
    amount=int(total)*100, # Stripe accepts the amount in a currency's subunits
    currency='usd',
  )
  
  response = jsonify(clientSecret=intent.client_secret)
  response.headers.add('Access-Control-Allow-Origin', '*')

  return response

if __name__ == "__main__":
  app.run() 

