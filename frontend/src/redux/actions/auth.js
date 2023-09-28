import axios from "axios";
import {
  REGISTER,
  LOGIN,
  GETBY_ID_USER,
  UPDATE_USER,
  LOGOUT,
  ERROR,
  FORGET_PASSWORD_REQUEST,
  GET_ALL_USERS,
  FORGET_PASSWORD,
  DELETE_USER,
  BLOCK,
  UNBLOCK,
} from "../actionTypes";

const token = localStorage.getItem("token");

const item = { Authorization: "Bearer " + token };

export const register = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/auth/register",
        data
      );

      dispatch({
        type: REGISTER,
        payload: response.data,
      });
      console.log(response.data, "registerAction");
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response.data.message,
      });
    }
  };
};

export const login = (data) => {
  console.log(data, "datalogin");
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/auth/login",
        data
      );

      const token = response.data.token;
      const user = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("emailmail", user.email);
      localStorage.setItem("message", user.message);

      dispatch({
        type: LOGIN,
        payload: response.data,
      });
      console.log(response.data, "loginAction");
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response.data.message,
      });
    }
  };
};

export const getByIdUser = (id) => {
  // debugger
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/auth/getById/${id}`,
        { headers: item }
      );

      console.log(response, "responseuserid");
      dispatch({
        type: GETBY_ID_USER,
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

export const getAllUser = (data) => {
  // debugger
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:5001/auth/getAll", {
        headers: item,
      });

      console.log(response, "responsealluser");
      dispatch({
        type: GET_ALL_USERS,
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

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/auth/distroy/${id}`,
        { headers: item }
      );
      console.log(response, "deleteUser");

      dispatch({
        type: DELETE_USER,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response?.data.message,
      });
    }
  };
};

export const blockUser = (id) => {
  // debugger
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };

      const response = await axios.post(
        `http://localhost:5001/auth/block/${id}`,
        {},
        { headers }
      );

      console.log(response, "blockUser");

      dispatch({
        type: BLOCK,
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

export const unBlockUser = (id) => {
  // debugger
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: "Bearer " + token,
      };

      const response = await axios.post(
        `http://localhost:5001/auth/unBlock/${id}`,
        {},
        { headers }
      );

      console.log(response, "unblockUser");

      dispatch({
        type: UNBLOCK,
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

export const forgetPasswordRequest = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/auth/forgetPasswordRequest",
        data
      );
      console.log(response, "responseforgetpassword");
      dispatch({
        type: FORGET_PASSWORD_REQUEST,
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

export const forgetPassword = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/auth/forgetPassword",
        data
      );
      console.log(response, "forgetPassword");
      dispatch({
        type: FORGET_PASSWORD,
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

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
};
