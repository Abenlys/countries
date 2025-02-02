"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  countriesData: [],
  visibleItems: [],
  startIndex: 0,
  searchTerms: "",
  selectRegion: "",
  status: "idle",
  error: null,
};

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const response = await fetch("/utils/data.json");
    const data = await response.json();
    const sortedData = Object.values(data).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
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
    setSelectRegion(state, action) {
      state.selectRegion = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.countriesData = action.payload;
        state.visibleItems = action.payload.slice(0, 50);
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerms, setVisibleItems, setStartIndex, setSelectRegion } =
  countriesSlice.actions;
export default countriesSlice.reducer;
