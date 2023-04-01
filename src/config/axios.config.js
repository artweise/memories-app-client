import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_API;

export default axios.create({
  baseURL,
});

export const getHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};
