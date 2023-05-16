import axios, { getHeaders } from "../config/axios.config"

export const getAllFamilies = async () => {
  const res = await axios.get("/families", getHeaders())
  if (res.status === 200) return res.data
  // else throw new Error("Could not fetch families");
}

export const createFamily = async (data) => {
  const res = await axios.post("/family", data, getHeaders())
  if (res.status === 200) return res.data
}

export const getFamilyById = async (familyId) => {
  const res = await axios.get(`/families/${familyId}`, getHeaders())
  if (res.status === 200) return res.data
}
