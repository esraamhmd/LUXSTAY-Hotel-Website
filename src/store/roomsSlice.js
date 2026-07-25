import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFilter: "All Rooms",
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

export const { setFilter } = roomsSlice.actions;
export default roomsSlice.reducer;
