import { createSlice } from "@reduxjs/toolkit";

export const localesSlice = createSlice({
  name: "locales",
  initialState: {
    locale: "en",
  },
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setLocale } = localesSlice.actions;

export default localesSlice.reducer;