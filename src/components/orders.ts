import React, { useState } from "react";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const [allOrders, setAlOrders] = useState("");

const getOrders = async () => {
  const allorders = await axios.get(
    "https://firestore.googleapis.com/v1/projects/jdeveloper-task/databases/(default)/documents/dashboardOrders"
  );
  //console.log(allorders.data);
  return allorders.data;
};

getOrders();
console.log(allOrders);

//export const fetchedOrders = getOrders();

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    orders: allOrders,
  },
  reducers: {
    /*increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },*/
  },
});

// Action creators are generated for each case reducer function

//export const { increment, decrement, incrementByAmount } = filterSlice.actions;

export default filterSlice.reducer;
