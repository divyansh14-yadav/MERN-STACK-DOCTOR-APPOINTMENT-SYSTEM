import axios from "axios";
import { GET_CONTACT_DETAILS, ERROR } from "../actionTypes";

export const contactus = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:5001/contact/getAll",
        data
      );
      console.log(response, "contactusaction");
      dispatch({
        type: GET_CONTACT_DETAILS,
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
