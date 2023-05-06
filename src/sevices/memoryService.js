import axios, { getHeaders } from "../config/axios.config";

export const getAllMemories = async (familyId) => {
  const res = await axios.get(`/memories/${familyId}`, getHeaders());
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

// one parameter - object
// with two keys: memoryId and data
export const updateMemory = async ({ memoryId, data }) => {
  const res = await axios.put(`/memory/${memoryId}`, data, getHeaders());
  if (res.status === 200) return res.data;
};

export const uploadFiles = async (formData) => {
  return axios.post("/upload", formData, getHeaders());
};
