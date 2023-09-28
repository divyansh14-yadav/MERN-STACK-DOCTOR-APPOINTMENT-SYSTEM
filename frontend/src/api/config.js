// import axios from "axios";

// const authConfig = axios.create(
//     baseUrl = "http://localhost:5001"
// )

// export default authConfig

import axios from "axios";

const authConfig = axios.create({
  baseURL: "http://localhost:5001"
});

const token = localStorage.getItem("token"); 

const Url = async (url, method, data = null) => {
  try {
    const response = await authConfig.request({
      url,
      method,
      data,
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export { Url };
