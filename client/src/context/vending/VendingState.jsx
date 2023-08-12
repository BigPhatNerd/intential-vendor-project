import React, { useReducer } from "react";

import VendingContext from "./vendingContext";
import VendingReducer from "./vendingReducer";
import axios from "axios";

import { GET_PRODUCTS, DISPENSE_PRODUCT, REFILL_MACHINE } from "./types";

const VendingState = (props) => {
  const initialState = {
    products: [],
    alert: [],
    error: {},
  };

  const [state, dispatch] = useReducer(VendingReducer, initialState);

  // Get products
  const getProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      console.log("res.data: ", res.data);
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    } catch (err) {
      console.log({ err });
    }
  };

  // Dispense product
  const dispenseProduct = async (productID) => {
    try {
      const res = await axios.post("/api/products/dispense", { productID });

      dispatch({
        type: DISPENSE_PRODUCT,
        payload: res.data,
      });
    } catch (err) {
      console.log({ err });
    }
  };

  // Refill machine one product at a time
  const updateProduct = async (product, adminID) => {
    try {
      console.log({ product });
      const requestBody = {
        ...product,
        adminID,
      };
      const res = await axios.put("/api/products", requestBody);
      console.log("res.data: ", res.data);
      dispatch({
        type: REFILL_MACHINE,
        payload: res.data,
      });
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <VendingContext.Provider
      value={{
        products: state.products,
        alert: state.alert,
        error: state.error,
        getProducts,
        dispenseProduct,
        updateProduct,
      }}
    >
      {props.children}
    </VendingContext.Provider>
  );
};

export default VendingState;
