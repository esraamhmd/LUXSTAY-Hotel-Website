import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  checkIn: "",
  checkOut: "",
  guests: 2,
  roomType: "Luxury A1",
  arrivalTime: "",
  message: "",
  status: "idle", 
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    submitBookingStart: (state) => {
      state.status = "submitting";
      state.error = null;
    },
    submitBookingSuccess: (state) => {
      state.status = "submitted";
    },
    submitBookingError: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    },
    resetBooking: () => initialState,
  },
});

export const {
  updateField,
  submitBookingStart,
  submitBookingSuccess,
  submitBookingError,
  resetBooking,
} = bookingSlice.actions;
export default bookingSlice.reducer;