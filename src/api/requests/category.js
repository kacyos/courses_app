import { api } from "../api";

export const createCategory = async ({ categoryName }) => {
  const response = await api.post(`/category`, { name: categoryName });
  return response;
};

export const getAllCategories = async () => {
  const result = api.get(`/category`);
  return result;
};
