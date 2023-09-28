import {
  GET_DOCTOR,
  ERROR,
  DOCTOR_SEARCH,
  DOCTOR_STATE,
  DOCTOR_CITY,
  GET_ALL_DOCTOR,
  CREATE_DOCTOR,
  UPDATE_DOCTOR,
  DELETE_DOCTOR,
} from "../actionTypes";
const initialState = {
  doctor: [],
  errorMessage: null,
  isloggedIn: false,
  search: [],
  states: [],
  city: [],
  doctorList: [],
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DOCTOR:
      return {
        ...state,
        doctor: action.payload,
        isloggedIn: true,
      };
    case GET_DOCTOR:
      return {
        ...state,
        doctor: action.payload,
        isloggedIn: true,
      };
    case UPDATE_DOCTOR:
      return {
        ...state,
        doctor: action.payload,
        isloggedIn: true,
      };
    case DELETE_DOCTOR:
      return {
        ...state,
        doctor: state.doctor.filter((doctor) => doctor._id !== action.payload),
        isLoggedIn: true,
      };
    case DOCTOR_SEARCH:
      return {
        ...state,
        search: action.payload,
        isloggedIn: false,
      };
    case DOCTOR_STATE:
      return {
        ...state,
        states: action.payload,
        isloggedIn: false,
      };
    case DOCTOR_CITY:
      return {
        ...state,
        city: action.payload,
        isloggedIn: false,
      };
    case GET_ALL_DOCTOR:
      return {
        ...state,
        doctorList: action.payload,
        isloggedIn: true,
      };
    case ERROR:
      // console.log(action.payload,"errreducer11");
      return {
        doctor: null,
        errorMessage: action.payload,
        isloggedIn: true,
      };
    default:
      return state;
  }
};

export default doctorReducer;
