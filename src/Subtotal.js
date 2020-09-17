import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";


function Subtotal() {
   const history = useHistory();
  const [action , dispatch] = useStateValue();
    return (
      <div className="subtotal">
        <CurrencyFormat
          renderText={(value) => (
            <div>
              <p>
                {/* Part of the homework */}
                Subtotal ({action.basket.length} items):
                <strong className="sub_totalPrice">{value}</strong>
              </p>
              <small className="subtotal__gift">
                <input type="checkbox" /> This order contains a gift
              </small>
            </div>
          )}
          decimalScale={2}
          value={action.sub_total} // Part of the homework
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />

        <button onClick={e => history.push('/checkout')}>Proceed to Checkout</button>
      </div>
    );};

export default Subtotal
