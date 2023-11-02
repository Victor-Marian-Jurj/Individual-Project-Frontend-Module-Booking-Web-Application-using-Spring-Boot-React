import { createSlice } from "@reduxjs/toolkit";

//action = {type: "setReservations", payload: {reservations: ["reservation1"]}}

const reservationSlice = createSlice({
  name: "reservation",
  initialState: {
    reservations: [],
  },
  reducers: {
    setReservations: (state, action) => {
      state.reservations = action.payload;
    },
  },
});

export default reservationSlice.reducer;
export const { setReservations } = reservationSlice.actions;
