import axiosInstance from "../plugins/axiosConfig";

export const getHotels = async () => {
  const { data } = await axiosInstance.get("/hotels");
  return data;
};

export const getHotelById = async (id) => {
  const { data } = await axiosInstance.get(`/hotels/${id}`);
  return data;
};

export const postHotel = async (hotel) => {
  const { data } = await axiosInstance.post("/hotels", hotel);
  return data;
};

export const deleteHotel = async (id) => {
  const { data } = await axiosInstance.delete(`/hotels/${id}`);
  return data;
};

export const patchHotel = async (id, hotel) => {
  const { data } = await axiosInstance.patch(`/hotels/${id}`, hotel);
  return data;
};
