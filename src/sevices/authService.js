import axios from "axios";

const urlAuth =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_SERVER_AUTH
    : process.env.REACT_APP_DEV_SERVER_AUTH;

// const urlAuth = process.env.REACT_APP_PROD_SERVER_AUTH;

export const signup = async (data) => {
  return axios.post(`${urlAuth}/signup`, data);
};

export const login = async (data) => {
  return axios.post(`${urlAuth}/login`, data);
};
