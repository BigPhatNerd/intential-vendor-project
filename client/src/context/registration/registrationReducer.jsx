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
      return {
        ...state,
        admin: {
          ...state.admin,
          email: action.payload,
        },
      };
    case ADMIN_LOADED:
      return {
        ...state,
        admin: {
          ...state.admin,
          isAuthenticated: true,
          email: action.payload?.email,
          id: action.payload?._id,
        },
      };
    case PASSWORD_RESET_INITIATE:
      return {
        ...state,
        loading: true,
      };
    case PASSWORD_RESET_FAIL:
      return {
        ...state,
        loading: false,
      };
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        loading: false,
        admin: {
          ...state.admin,
          didResetPassword: true,
        },
      };

    default:
      return state;
  }
};

export default RegistrationReducer;
