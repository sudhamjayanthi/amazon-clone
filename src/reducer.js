import { act } from "react-dom/test-utils";

export const initialState = {
  basket: [],
  sub_total: 0,
};

const reducer = (state, action) => {
  console.log(state)
    switch(action.type) {
        case 'ADD_TO_BASKET':
            return {
              ...state,
              basket: [...state.basket, action.item],
              sub_total: state.sub_total + action.item.price,
            };
    }
};

export default reducer;