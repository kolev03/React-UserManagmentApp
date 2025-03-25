// src/features/sales/salesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { month: "June", type: "higher", sales: 3300 },
  { month: "June", type: "lower", sales: 3100 },

  { month: "July", type: "higher", sales: 2300 },
  { month: "July", type: "lower", sales: 4100 },

  { month: "August", type: "higher", sales: 4300 },
  { month: "August", type: "lower", sales: 2100 },

  { month: "September", type: "higher", sales: 3950 },
  { month: "September", type: "lower", sales: 3600 },

  { month: "October", type: "higher", sales: 2050 },
  { month: "October", type: "lower", sales: 7050 },

  { month: "November", type: "higher", sales: 4050 },
  { month: "November", type: "lower", sales: 6550 },

  { month: "December", type: "higher", sales: 11050 },
  { month: "December", type: "lower", sales: 9050 },
];

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
});

export default salesSlice.reducer;
