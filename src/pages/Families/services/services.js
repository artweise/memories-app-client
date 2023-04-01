import axios from "../../../config/axios.config";

export const getAllFamilies = async (token) => {
  const res = await axios.get("/families", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 200) return res.data;
  else throw new Error("Could not fetch families");
};
