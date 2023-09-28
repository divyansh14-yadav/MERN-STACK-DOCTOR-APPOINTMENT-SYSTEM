import {
  REGISTER,
  LOGIN,
  GETBY_ID_USER,
  GET_ALL_USERS,
  ERROR,
  LOGOUT,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD,
  DELETE_USER,
  BLOCK,
  UNBLOCK,
} from "../actionTypes";

const initialState = {
  user: null,
  authentication: false,
  errorMessage: "",
  isloggedIn: false,
  token: localStorage.getItem("token"),
  isAdmin: "",
  block: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      const register = action.payload;

      return {
        ...state,
        user: register,
        authentication: true,
        isloggedIn: false,
      };

    case LOGIN:
      const login = action.payload;
      localStorage.setItem("token", login.token);

      return {
        ...state,
        user: login,
        authentication: true,
        isloggedIn: true,
        token: login.token,
        isAdmin: "",
      };

    case GETBY_ID_USER:
      console.log(action.payload, "action.payload getuserid");
      return {
        ...state,
        user: action.payload,
        authentication: true,
        isloggedIn: true,
        token: localStorage.getItem("token"),
      };

    case GET_ALL_USERS:
      return {
        ...state,
        user: action.payload,
        authentication: true,
        isloggedIn: true,
        token: localStorage.getItem("token"),
      };

    case DELETE_USER:
      return {
        ...state,
        authentication: true,
        user: state.user.filter((user) => user._id !== action.payload),
        isLoggedIn: true,
        token: localStorage.getItem("token"),
      };
    case BLOCK:
      return {
        ...state,
        authentication: true,
        isLoggedIn: true,
        user: action.payload,
        block: true,
        token: localStorage.getItem("token"),
      };
    case UNBLOCK:
      return {
        ...state,
        authentication: true,
        isLoggedIn: true,
        user: action.payload,
        block: false,
        token: localStorage.getItem("token"),
      };
    case FORGET_PASSWORD_REQUEST:
      console.log(action.payload, "9999");
      return {
        ...state,
        user: action.payload,
        isloggedIn: false,
        authentication: false,
      };

    case FORGET_PASSWORD:
      console.log(action.payload, "9999");
      return {
        ...state,
        user: action.payload,
        isloggedIn: false,
        authentication: false,
      };

    case LOGOUT:
      return {
        user: null,
        authentication: false,
        isloggedIn: false,
        token: null,
      };

    case ERROR:
      return {
        ...state,
        user: null,
        authentication: false,
        errorMessage: action.payload,
        isloggedIn: false,
      };

    default:
      return state;
  }
};

export default authReducer;
