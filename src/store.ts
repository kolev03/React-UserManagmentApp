import { configureStore } from "@reduxjs/toolkit";
import adminsSlice from "./data/slices/admins.Slice.ts";
import usersSlice from "./data/slices/usersSlice.ts";
import monthSales from "./data/slices/SalesMonthly.ts";
import productSales from "./data/slices/ProductsTypeSales.ts";

const store = configureStore({
  reducer: {
    admins: adminsSlice,
    users: usersSlice,
    monthSales: monthSales,
    sales: productSales,
  },
});

export default store;
