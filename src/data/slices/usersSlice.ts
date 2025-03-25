import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Alice Johnson Gonzales",
    email: "alice.johnson@example.com",
    password: "Olivia123",
    city: "New York",
    accountType: "admin",
    lastTimeSeen: "2023-04-10T09:30:00Z",
  },
  {
    id: 2,
    name: "Bob Smith Peterson",
    email: "bob.smith@example.com",
    password: "Olivia123",
    city: "Los Angeles",
    accountType: "client",
    lastTimeSeen: "2023-04-11T10:15:00Z",
  },
  {
    id: 3,
    name: "Carol Davis Watson",
    email: "carol.davis@example.com",
    password: "Olivia123",
    city: "Chicago",
    accountType: "client",
    lastTimeSeen: "2023-04-09T18:45:00Z",
  },
  {
    id: 4,
    name: "David Lee Palmer",
    email: "david.lee@example.com",
    password: "Olivia123",
    city: "Houston",
    accountType: "admin",
    lastTimeSeen: "2023-04-12T12:00:00Z",
  },
  {
    id: 5,
    name: "Eva Martinez Royal",
    email: "eva.martinez@example.com",
    password: "Olivia123",
    city: "Phoenix",
    accountType: "client",
    lastTimeSeen: "2023-04-10T14:30:00Z",
  },
  {
    id: 6,
    name: "Frank Brown White",
    email: "frank.brown@example.com",
    password: "Olivia123",
    city: "Philadelphia",
    accountType: "client",
    lastTimeSeen: "2023-04-08T17:20:00Z",
  },
  {
    id: 7,
    name: "Grace Wilson Garlog",
    email: "grace.wilson@example.com",
    password: "Olivia123",
    city: "San Antonio",
    accountType: "admin",
    lastTimeSeen: "2023-04-11T08:50:00Z",
  },
  {
    id: 8,
    name: "Henry Moore Brickson",
    email: "henry.moore@example.com",
    password: "Olivia123",
    city: "San Diego",
    accountType: "client",
    lastTimeSeen: "2023-04-12T09:10:00Z",
  },
  {
    id: 9,
    name: "Isabella Taylor Jenson",
    email: "isabella.taylor@example.com",
    password: "Olivia123",
    city: "Dallas",
    accountType: "client",
    lastTimeSeen: "2023-04-10T11:30:00Z",
  },
  {
    id: 10,
    name: "Jack Anderson Miller",
    email: "jack.anderson@example.com",
    password: "Olivia123",
    city: "San Jose",
    accountType: "admin",
    lastTimeSeen: "2023-04-09T15:00:00Z",
  },
  {
    id: 11,
    name: "Karen Thomas Jones",
    email: "karen.thomas@example.com",
    password: "Olivia123",
    city: "Austin",
    accountType: "client",
    lastTimeSeen: "2023-04-12T13:45:00Z",
  },
  {
    id: 12,
    name: "Larry Jackson Brown",
    email: "larry.jackson@example.com",
    password: "Olivia123",
    city: "Jacksonville",
    accountType: "client",
    lastTimeSeen: "2023-04-08T16:30:00Z",
  },
  {
    id: 13,
    name: "Megan White Spears",
    email: "megan.white@example.com",
    password: "Olivia123",
    city: "Fort Worth",
    accountType: "client",
    lastTimeSeen: "2023-04-11T14:10:00Z",
  },
  {
    id: 14,
    name: "Nathan Harris Diaz",
    email: "nathan.harris@example.com",
    password: "Olivia123",
    city: "Columbus",
    accountType: "admin",
    lastTimeSeen: "2023-04-10T17:45:00Z",
  },
  {
    id: 15,
    name: "Olivia Martin McGregor",
    email: "olivia.martin@example.com",
    password: "Olivia123",
    city: "Charlotte",
    accountType: "client",
    lastTimeSeen: "2023-04-12T10:05:00Z",
  },
];

const accountsSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addAccount: (state, action) => {
      state.push(action.payload);
    },
    removeAccount: (state, action) => {
      return state.filter((account) => account.id !== action.payload);
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

export default accountsSlice.reducer;

export const { addAccount, removeAccount, updateAccount } =
  accountsSlice.actions;
