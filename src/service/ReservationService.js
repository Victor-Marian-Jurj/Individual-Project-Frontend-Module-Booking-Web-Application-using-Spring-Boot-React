import axiosInstance from "../plugins/axiosConfig";

export const getReservations = async () => {
  const { data } = await axiosInstance.get("/reservations");
  return data;
};

export const getReservationById = async (id) => {
  const { data } = await axiosInstance.get(`/reservations/${id}`);
  return data;
};

export const postReservation = async (reservation) => {
  const { data } = await axiosInstance.post("/reservations", reservation);
  return data;
};

export const deleteReservation = async (id) => {
  const { data } = await axiosInstance.delete(`/reservations/${id}`);
  return data;
};

export const patchReservation = async (id, reservation) => {
  const { data } = await axiosInstance.patch(
    `/reservations/${id}`,
    reservation
  );
  return data;
};
