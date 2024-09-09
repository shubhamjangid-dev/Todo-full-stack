import axios from "axios";

// custom configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:2222/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// saari request yahi handle krega or return krega
export const apiRequest = async (url, body = {}) => {
  try {
    const resData = await axiosInstance.post(url, body);
    return resData.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
};
