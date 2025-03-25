import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { month: "June", sales: 12000 },
  { month: "July", sales: 25000 },
  { month: "August", sales: 20000 },
  { month: "September", sales: 24000 },
  { month: "October", sales: 26000 },
  { month: "November", sales: 18000 },
  { month: "December", sales: 10000 },
  { month: "January", sales: 12000 },
  { month: "February", sales: 14000 },
  { month: "March", sales: 18000 },
  
];

const monthSales = createSlice({
  name: "monthSales",
  initialState,
  reducers: {},
});

export default monthSales.reducer;
