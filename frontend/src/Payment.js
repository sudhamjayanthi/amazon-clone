import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";

import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";
import axios from "./axios";

import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";

function Payment() {
  const [{ basket, user, sub_total }, dispatch] = useStateValue();

  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(0);
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "get",
        url: `/payment/create/${sub_total}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    if (basket) {
      getClientSecret();
    }
  }, [basket, sub_total]);

  const handleChange = (e) => {
    if (e.complete) {
      // enable payment button
      setDisabled(false);
    } else if (e.error) {
      // show validation to customer
      setError(e.error ? e.error.message : "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);

    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        setSucceeded(true);
        setProcessing(false);

        alert(
          "thanks for using amazon clone, your order is successfully placed and will reflect in the test stripe dashboard too!"
        );

        history.replace("/orders");
      });

    dispatch({
      type: "CLEAR_BASKET",
    });
  };

  if (!basket.length) {
    return "Please add items to the cart first";
  }

  return (
    <div className="payment">
      <h1>Checkout</h1>
      <div className="payment__container">
        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.displayName},</p>
            <p>India</p>
          </div>
        </div>

        {/* Payment section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              {error && <div className="payment__validation">{error}</div>}
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <p>Order Total: {value}</p>}
                  decimalScale={2}
                  value={sub_total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  className="payment__buyNow"
                  disabled={processing || disabled || succeeded}
                  type="submit"
                >
                  {processing ? "Processing...." : "Buy Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
