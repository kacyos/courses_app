import { api } from "../api";

export const createCategory = async ({ name }) => {
  const response = await api.post(`/category`, { name });
  return response;
};

export const getAllCategories = async () => {
  const result = api.get(`/category`);
  return result;
};
