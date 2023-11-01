import { configureStore } from "@reduxjs/toolkit";
import hotelSlice from "./hotelSlice";
import snackbarSlice from "./snackbarSlice";

const store = configureStore({
  reducer: {
    hotelReducer: hotelSlice,
    snackbarReducer: snackbarSlice,
  },
});

export default store;
