import axios from "axios";
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

const token = localStorage.getItem("token");

const item = { Authorization: "Bearer " + token };

export const createDoctor = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/doctor/create",
        data,
        { headers: item }
      );
      console.log(response, "createdoctor");
      dispatch({
        type: CREATE_DOCTOR,
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

export const updateDoctor = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/doctor/update/${id}`,
        data,
        { headers: item }
      );
      console.log(response, "updateresponsedoctor");
      dispatch({
        type: UPDATE_DOCTOR,
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

export const deleteDoctor = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/doctor/distroy/${id}`,
        { headers: item }
      );
      console.log(response, "deleteresponsedoctor");
      dispatch({
        type: DELETE_DOCTOR,
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

export const doctorProfile = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:5001/doctor/get",
        data,
        { headers: item }
      );

      console.log(response, "doctorResponse");
      dispatch({
        type: GET_DOCTOR,
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

export const doctorSearch = (data) => async (dispatch) => {
  // debugger;
  try {
    const res = await axios.get("http://localhost:5001/doctor/doctorSearch", {
      params: {
        stateId: data.stateId,
        cityId: data.cityId,
        doctorName: data.doctorName,
      },
    });
    console.log(res, "doctorSearchresponse2222");
    dispatch({
      type: DOCTOR_SEARCH,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response.data.message,
    });
  }
};

export const doctorState = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:5001/state/getAll", {
        data,
      });
      console.log(response, "responseState");
      dispatch({
        type: DOCTOR_STATE,
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

export const doctorCity = (stateId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/city/getAllstatecity?stateId=${stateId}`
      );
      console.log(response, "cityResponse");
      dispatch({
        type: DOCTOR_CITY,
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

export const getAllDoctor = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:5001/doctor/get");
      console.log(response, "responsegetalldoctor");
      dispatch({
        type: GET_ALL_DOCTOR,
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
