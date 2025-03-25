import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Petar Kolev",
    email: "latinska@abv.bg",
    password: "123",
    logged: false,
  },
  {
    id: 2,
    name: "Mihail Todorov",
    email: "mi6o@abv.bg",
    password: "123",
    logged: false,
  },
];

const admins = createSlice({
  name: "admins",
  initialState,
  reducers: {
    setAdminLogged: (state, action) => {
      const { id, logged } = action.payload;
      const admin = state.find((admin) => admin.id === id);
      if (admin) {
        admin.logged = logged; // With Immer, this is safe
      }
    },
    updateAccount: (state, action) => {
      const index = state.findIndex(
        (account) => account.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { updateAccount, setAdminLogged } = admins.actions;

export default admins.reducer;
