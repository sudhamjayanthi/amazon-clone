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
        sub_total: Number((state.sub_total + action.item.price).toFixed(3)),
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex((basketItem) => basketItem.id === action.id); // returns the index of item which matches with the id provided with action

      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Cant remove product (id: ${action.id}) as its not in basket!`);
      }
      return {
        ...state,
        basket: newBasket,
        sub_total: Number((state.sub_total - action.price).toFixed(3)),
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "CLEAR_BASKET":
      return {
        ...state,
        basket: [],
      };
    default: 
    return state
  }
};

export default reducer;
