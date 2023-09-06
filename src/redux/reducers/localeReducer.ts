import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ILocaleSlice {
  locale: string;
}

const initialState: ILocaleSlice = {
  locale: 'en-US',
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    changeLocale(state, action: PayloadAction<string>) {
      state.locale = action.payload;
    },
  },
});

export const { changeLocale } = localeSlice.actions;
export default localeSlice.reducer;
