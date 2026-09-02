import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobileMenuOpen: false,
  activeDropdown: null, 
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    setActiveDropdown: (state, action) => {
      state.activeDropdown = action.payload;
    },
  },
});

export const { toggleMobileMenu, closeMobileMenu, setActiveDropdown } = uiSlice.actions;
export default uiSlice.reducer;