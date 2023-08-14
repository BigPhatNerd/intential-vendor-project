import React, { useReducer } from "react";

import RegistrationContext from "./registrationContext";
import RegistrationReducer from "./registrationReducer";
import axios from "axios";
import { v4 as uuid } from "uuid";

import {
  SET_SELECTED_PRODUCT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_LOADING,
  SET_ALERT,
  REMOVE_ALERT,
  SET_EMAIL,
  ADMIN_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  PASSWORD_RESET_INITIATE,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
} from "./types";

import setAuthToken from "../../utils/setAuthToken";

const RegistrationState = (props) => {
  const initialState = {
    admin: {
      isAuthenticated: false,
    },
    loading: true,
    alert: [],
    error: {},
  };

  const [state, dispatch] = useReducer(RegistrationReducer, initialState);

  //Load admin
  const loadAdmin = async () => {
    console.log("loadAdmin fired");
    if (localStorage.token) {
      setAuthToken(localStorage.token);

      try {
        const res = await axios.get("/api/auth");
        console.log("res.data: ", res.data);
        dispatch({
          type: ADMIN_LOADED,
          payload: res.data,
        });
      } catch (err) {
        console.log({ err });

        dispatch({
          type: AUTH_ERROR,
        });
      }
    }
  };
  //login admin
  const login = async (email, password) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post("/api/auth", body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadAdmin();
    } catch (err) {
      console.log({ err });
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          setAlert(error.msg, "danger");
        });
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

  //logout admin
  const logout = () => {
    dispatch({ type: LOGOUT });
    window.location.reload(false);
  };

  const setAlert = (msg, type) => {
    const id = uuid();
    console.log({ id });
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
  };

  //Set the product to be put into Stripe
  const setProduct = (product) => {
    dispatch({
      type: SET_SELECTED_PRODUCT,
      payload: product,
    });
  };

  const setEmail = (email) => {
    dispatch({
      type: SET_EMAIL,
      payload: email,
    });
  };

  //Register user
  const register = async ({ email, password }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = { email, password };

    try {
      setLoading(true);
      const res = await axios.post("/api/admins", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          setAlert(error.msg, "danger");
        });
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

  //Set Loading
  const setLoading = (trueOrFalse) => {
    console.log("Inside setLoading");
    dispatch({
      type: SET_LOADING,
      payload: trueOrFalse,
    });
  };

  const handlePasswordResetInitiate = async (email) => {
    dispatch({ type: PASSWORD_RESET_INITIATE });
    try {
      const response = await axios.post("/api/auth/reset-password-initiate", {
        email,
      });

      setAlert(response.data || response.data.message);
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          setAlert(error.msg, "danger");
        });
      }
    }
  };

  const handlePasswordReset = async (token, password) => {
    try {
      const response = await axios.post("/api/auth/reset-password", {
        token,
        password,
      });

      dispatch({
        type: PASSWORD_RESET_SUCCESS,
        payload: response.data,
      });
      loadAdmin();
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          setAlert(error.msg, "danger");
        });
      }
    }
  };

  return (
    <RegistrationContext.Provider
      value={{
        product: state.product,
        admin: state.admin,
        loading: state.loading,
        alert: state.alert,
        error: state.error,
        setProduct,
        setAlert,
        register,
        setEmail,
        setLoading,
        login,
        logout,
        loadAdmin,
        handlePasswordResetInitiate,
        handlePasswordReset,
      }}
    >
      {props.children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationState;
