import axios, { getHeaders } from "../../../config/axios.config";

export const getAllMemories = async () => {
  const res = await axios.post("/memories", getHeaders());
  if (res.status === 200) return res.data;
  // else throw new Error("Could not fetch families");
};
