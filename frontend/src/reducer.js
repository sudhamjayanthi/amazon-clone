import { act } from "react-dom/test-utils";

export const initialState = {
  basket: [],
  sub_total: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
        sub_total: state.sub_total + action.item.price,
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn("Cant remove product (id: ${action.id}) as its not in basket!");
      }

      return {
        ...state,
        basket: newBasket,
        sub_total: state.sub_total - action.item.price,
      };

      case 'SET_USER':
        return {
          ...state,
          user: action.user
        }
        
      case 'CLEAR_BASKET':
        return {
          ...state,
          basket: []
        }
  }
};

export default reducer;
