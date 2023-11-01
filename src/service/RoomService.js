import axiosInstance from "../plugins/axiosConfig";

export const getRooms = async () => {
  const { data } = await axiosInstance.get("/rooms");
  return data;
};

export const getRoomById = async (id) => {
  const { data } = await axiosInstance.get(`/rooms/${id}`);
  return data;
};

export const postRoom = async (room) => {
  const { data } = await axiosInstance.post("/rooms", room);
  return data;
};

export const deleteRoom = async (id) => {
  const { data } = await axiosInstance.delete(`/rooms/${id}`);
  return data;
};

export const patchRoom = async (id, room) => {
  const { data } = await axiosInstance.patch(`/rooms/${id}`, room);
  return data;
};
