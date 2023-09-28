import { combineReducers } from "redux";
import authReducer from "./authReducer";
import appointmentReducer from "./appointmentsReducer";
import doctorReducer from "./doctorReducer";
import contactReducer from "./contactUsReducer";

const rootreducer = combineReducers({
  authReducer,
  appointmentReducer,
  doctorReducer,
  contactReducer,
});

export default rootreducer;
