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
} from "./types";

const RegistrationReducer = (state, action) => {
  switch (action.type) {
    case SET_SELECTED_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      console.log("LOGIN_SUCCESS was hit");
      console.log("action.payload: ", action.payload);
      console.log({ state, action });
      return {
        ...state,
        admin: {
          ...state.admin,
          isAuthenticated: true,
        },
        loading: false,
        alert: [],
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        admin: {
          ...state.admin,
          isAuthenticated: false,
        },
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ALERT:
      console.log("action.payload: ", action.payload);
      console.log({ state });
      return {
        ...state,
        alert: [...state.alert, action.payload],
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alert: state.alert.filter((alert) => alert.id !== action.payload),
      };
    case SET_EMAIL:
      console.log("action.payload in SET EMAIL: ", action.payload);
      console.log({ state });
      return {
        ...state,
        admin: {
          ...state.admin,
          email: action.payload,
        },
      };
    case ADMIN_LOADED:
      console.log("USER_LOADED fired");
      console.log("action.payload: ", action.payload);
      return {
        ...state,
        admin: {
          ...state.admin,
          isAuthenticated: true,
          email: action.payload?.email,
          id: action.payload?._id,
        },
      };

    default:
      return state;
  }
};

export default RegistrationReducer;
