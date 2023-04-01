import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_API;

export default axios.create({
  baseURL,
});
