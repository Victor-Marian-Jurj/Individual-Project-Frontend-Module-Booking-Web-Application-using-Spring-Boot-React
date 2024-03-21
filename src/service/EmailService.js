import axiosInstance from "../plugins/axiosConfig";

export const getEmail = async (email) => {
  const { data } = await axiosInstance.get(`/sendMail/${email}`);
  return data;
};
