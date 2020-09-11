import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from "./StateProvider";


function Subtotal() {
  const [action , dispatch] = useStateValue();
    return (
      <div className="subtotal">
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p>
                {/* Part of the homework */}
                Subtotal ({ action.basket.length } items): 
                <strong className="sub_totalPrice">{ action.sub_total }</strong>
                
              </p>
              <small className="subtotal__gift">
                <input type="checkbox" /> This order contains a gift
              </small>
            </>
          )}
          decimalScale={2}
          value={0} // Part of the homework
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />

        <button>Proceed to Checkout</button>

      </div>
    );
}

export default Subtotal
