import { api } from "../api";

export const getCourses = async () => {
  return await api.get("/courses");
};

export const createCourse = async ({
  courseName,
  description,
  category_Id,
}) => {
  const response = await api.post(`/course/${category_Id}`, {
    name: courseName,
    description,
  });
  return response;
};

export const editCourse = async (id, { name, description, category }) => {
  await api.put(`/course/${id}`, { name, description, category });
};

export const deleteCourse = async (id) => {
  return await api.delete(`/course/${id}`);
};

export const addImage = (id, image) =>
  api.post(`/image/${id}`, image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
