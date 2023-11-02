import { configureStore } from "@reduxjs/toolkit";
import hotelSlice from "./hotelSlice";
import reservationSlice from "./reservationSlice";
import snackbarSlice from "./snackbarSlice";

const store = configureStore({
  reducer: {
    hotelReducer: hotelSlice,
    reservationReducer: reservationSlice,
    snackbarReducer: snackbarSlice,
  },
});

export default store;
