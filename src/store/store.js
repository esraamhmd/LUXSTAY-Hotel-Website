import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./roomsSlice";
import uiReducer from "./uiSlice";
import bookingReducer from "./bookingSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      rooms: roomsReducer,
      ui: uiReducer,
      booking: bookingReducer,
    },
  });

const store = makeStore();
export default store;
