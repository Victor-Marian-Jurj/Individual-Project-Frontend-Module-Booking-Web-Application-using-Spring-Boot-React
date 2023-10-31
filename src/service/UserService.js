import axiosInstance from "../plugins/axiosConfig";

export const getUsers = async () => {
  const { data } = await axiosInstance.get("/users");
  return data;
};

export const getUserById = async (id) => {
  const { data } = await axiosInstance.get(`/users/${id}`);
  return data;
};

export const postUser = async (user) => {
  const { data } = await axiosInstance.post("/users", user);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await axiosInstance.delete(`/users/${id}`);
  return data;
};

export const patchUser = async (id, user) => {
  const { data } = await axiosInstance.patch(`/users/${id}`, user);
  return data;
};
