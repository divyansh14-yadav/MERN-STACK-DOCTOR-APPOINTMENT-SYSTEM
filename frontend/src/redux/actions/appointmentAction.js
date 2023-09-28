import axios from "axios";
import moment from "moment";
import {
  BOOK_APPOINTMENT,
  GET_ALL_APPOINTMENT,
  UPDATE_APPOINTMENT,
  DELETE_APPOINTMENT,
  ERROR,
  GET_AVAILABLE_APPOINTMENT,
  GET_BYID_APPOINTMENT,
} from "../actionTypes";

const token = localStorage.getItem("token");

const item = { Authorization: "Bearer " + token };

export const bookAppointment = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/appointment/create",
        data,
        { headers: item }
      );

      // console.log(authHeader,"authheader");
      console.log(response, "bookappointAction");
      dispatch({
        type: BOOK_APPOINTMENT,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response.data.message,
      });
    }
  };
};

export const getAllAppointment = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:5001/appointment/get",
        { headers: item }
      );
      console.log(response, "getappointAction");

      dispatch({
        type: GET_ALL_APPOINTMENT,
        payload: response.data.getAll,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response.data.message,
      });
    }
  };
};

export const getByIdAppointment = (id) => {
  // debugger
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/appointment/get/${id}`,
        { headers: item }
      );

      console.log(response, "responseuserid");
      dispatch({
        type: GET_BYID_APPOINTMENT,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response.data.message,
      });
    }
  };
};

export const updateAppointments = (id, updatedData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/appointment/update/${id}`,
        updatedData
      );
      console.log(response, "updateappointments");

      dispatch({
        type: UPDATE_APPOINTMENT,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response.data.message,
      });
    }
  };
};

export const deleteAppointments = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/appointment/distroy/${id}`,
        { headers: item }
      );
      console.log(response, "deleteAppointments");

      dispatch({
        type: DELETE_APPOINTMENT,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response.data.message,
      });
    }
  };
};

// export const getAvailableAppointments = (data) =>{
//   return async(dispatch) =>{
//       try {
//           const response = await axios.get("http://localhost:5001/appointment/getAvailableAppointments")
//           console.log(response,"availableBookings");

//            dispatch({
//               type:GET_AVAILABLE_APPOINTMENT,
//               payload:response.data.availableBookings
//            })
//       } catch (error) {
//           dispatch({
//               type : ERROR,
//               payload : error.response.data.message
//           })
//       }
//   }
// }

export const getAvailableAppointments = (date) => {
  console.log(date, "hello date");
  return async (dispatch) => {
    try {
      // debugger
      const dateAndTime = moment().format("YYYY-MM-DD HH:mm:ss");
      const response = await axios.get(
        `http://localhost:5001/appointment/getAvailableAppointments?dateAndTime=${date}`
      );
      // debugger
      console.log(response, "response he");
      dispatch({
        type: GET_AVAILABLE_APPOINTMENT,
        payload: response.data.availableBookings,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response.data.message,
      });
    }
  };
};
