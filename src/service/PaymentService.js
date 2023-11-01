import axiosInstance from "../plugins/axiosConfig";

export const getPayments = async () => {
  const { data } = await axiosInstance.get("/payments");
  return data;
};

export const getPaymentById = async (id) => {
  const { data } = await axiosInstance.get(`/payments/${id}`);
  return data;
};

export const postPayment = async (payment) => {
  const { data } = await axiosInstance.post("/payments", payment);
  return data;
};

export const deletePayment = async (id) => {
  const { data } = await axiosInstance.delete(`/payments/${id}`);
  return data;
};

export const patchPayment = async (id, payment) => {
  const { data } = await axiosInstance.patch(`/payments/${id}`, payment);
  return data;
};
