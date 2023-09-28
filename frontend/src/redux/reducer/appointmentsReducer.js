import {
  BOOK_APPOINTMENT,
  GET_ALL_APPOINTMENT,
  DELETE_APPOINTMENT,
  UPDATE_APPOINTMENT,
  GET_AVAILABLE_APPOINTMENT,
  ERROR,
  GET_BYID_APPOINTMENT,
} from "../actionTypes";

const initialState = {
  appointments: [],
  availableAppointments: [],
  errorMessage: null,
  isLoggedIn: true,
  status: null,
  token: localStorage.getItem("token"),
};

const appointmentReducer = (state = initialState, action) => {
  console.log(action.payload, "appointreducer");
  switch (action.type) {
    case BOOK_APPOINTMENT:
      console.log(action.payload, "appointreeducer");

      return {
        ...state,
        appointments: action.payload,
        isLoggedIn: true,
        errorMessage: action.payload.message,
        status: true,
      };
    case GET_ALL_APPOINTMENT:
      return {
        ...state,
        appointments: action.payload,
        isLoggedIn: true,
      };

    case GET_BYID_APPOINTMENT:
      return {
        ...state,
        appointments: action.payload,
        isLoggedIn: true,
      };

    case UPDATE_APPOINTMENT:
      return {
        ...state,
        appointments: action.payload,
        isLoggedIn: true,
      };

    case DELETE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter(
          (appointment) => appointment._id !== action.payload
        ),
        isLoggedIn: true,
      };

    case GET_AVAILABLE_APPOINTMENT:
      return {
        ...state,
        availableAppointments: action.payload,
        isLoggedIn: true,
      };

    case ERROR:
      return {
        ...state,
        status: false,
        appointments: null,
        errorMessage: action.payload,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};

export default appointmentReducer;
