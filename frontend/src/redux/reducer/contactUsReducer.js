import { GET_CONTACT_DETAILS, ERROR } from "../actionTypes";

const initialState = {
  contactUs: [],
  errorMessage: "",
  isloggedIn: false,
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACT_DETAILS:
      return {
        ...state,
        contactUs: action.payload,
        isloggedIn: false,
      };
    case ERROR:
      return {
        errorMessage: action.payload,
        isloggedIn: false,
      };
    default:
      return state;
  }
};

export default contactReducer;
