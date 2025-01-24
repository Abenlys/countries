"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { COUNTRY_URL, COUNTRY_API } from "../../../../api/api";

const initialState = {
  countriesData: [],
  visibleItems: [],
  startIndex: 0,
  searchTerms: "",
  status: 'idle',
  error: null,
};

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await fetch(`${COUNTRY_URL}?apikey=${COUNTRY_API}`);
    const data = await response.json();
    const sortedData = Object.values(data).sort((a, b) => a.name.localeCompare(b.name));
    return sortedData;
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setSearchTerms(state, action) {
      state.searchTerms = action.payload;
    },
    setVisibleItems(state, action) {
      state.visibleItems = action.payload;
    },
    setStartIndex(state, action) {
      state.startIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countriesData = action.payload;
        state.visibleItems = action.payload.slice(0, 50);
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerms, setVisibleItems, setStartIndex } = countriesSlice.actions;
export default countriesSlice.reducer;