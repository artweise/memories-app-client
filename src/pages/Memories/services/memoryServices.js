import axios, { getHeaders } from "../../../config/axios.config";

export const getAllMemories = async (familyId) => {
  const res = await axios.post("/memories", { familyId }, getHeaders());
  if (res.status === 200) return res.data;
};

export const createMemory = async (data) => {
  const res = await axios.post("/memory", data, getHeaders());
  if (res.status === 200) return res.data;
};

export const deleteMemory = async (memoryId) => {
  const res = await axios.delete(`/memory/${memoryId}`, getHeaders());
  if (res.status === 200) return res.data;
};
