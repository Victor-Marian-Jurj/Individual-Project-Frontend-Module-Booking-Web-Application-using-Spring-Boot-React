import { createSlice } from "@reduxjs/toolkit";

const snackBarsSlice = createSlice({
  name: "snackbar",
  initialState: {
    isOpen: false,
    message: "",
    severity: "success",
  },
  reducers: {
    //payload = "message" => {message: "", severity: "success"}
    openSnackbar: (state, action) => {
      state.isOpen = true;
      state.message = action.payload.text;

      if (action.payload.severity) {
        state.severity = action.payload.severity;
      }
    },

    closeSnackbar: (state) => {
      state.isOpen = false;
      state.severity = "success";
    },
  },
});

export default snackBarsSlice.reducer;
export const { openSnackbar, closeSnackbar } = snackBarsSlice.actions;
