import { GET_PRODUCTS, DISPENSE_PRODUCT, REFILL_MACHINE } from "./types";

const VendingReducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case DISPENSE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    case REFILL_MACHINE:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default VendingReducer;
