import { createSlice } from "@reduxjs/toolkit";

//action = {type: "setHotels", payload: {hotels: ["hotel1"]}}

const hotelSlice = createSlice({
  name: "hotel",
  initialState: {
    hotels: [],
  },
  reducers: {
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },
  },
});

export default hotelSlice.reducer;
export const { setHotels } = hotelSlice.actions;
