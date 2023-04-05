import axios from "axios";

// const baseURL = process.env.REACT_APP_PROD_SERVER_API;

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_SERVER_API
    : process.env.REACT_APP_DEV_SERVER_API;

export default axios.create({
  baseURL,
});

export const getHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// {
//   // The headers property specifies the HTTP headers
//   //  to include in the request. In this case,
//   // the headers include "Access-Control-Allow-Origin": "*",
//   // which sets the allowed origin domain to any domain,
//   // and "Content-Type": "application/json",
//   // which specifies that the request payload is in JSON format.
//   withCredentials: true,
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Content-Type": "application/json",
//   },
// }
