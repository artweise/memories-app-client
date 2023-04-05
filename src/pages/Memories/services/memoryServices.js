import axios, { getHeaders } from "../../../config/axios.config";

export const getAllMemories = async (familyId) => {
  const res = await axios.post("/memories", { familyId }, getHeaders());
  if (res.status === 200) return res.data;
};
