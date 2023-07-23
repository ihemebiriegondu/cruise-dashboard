import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//fetching the data from firebaseDb with axios
//<Orders[]> makes sure the data gotten is in the Orders format defined below
export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (data, thunkapi) => {
    try {
      const response = await axios.get<Orders[]>(
        "https://firestore.googleapis.com/v1/projects/to-do-app-88bb2/databases/(default)/documents/dashboardOrders"
      );
      return response.data;
    } catch (err: any) {
      //returns rejected response in any format/variable type (depending on the variable type of the response)
      return thunkapi.rejectWithValue(err.message);
    }
  }
);

//orders format
type Orders = {
  id: number;
  date: Date;
  product: string;
  name: string;
  status: string;
};

//initialState format/syntax
export interface OrderState {
  orders: Orders[];
  loading: boolean;
  error: null | string;

  filter: any[];
  searchs: any[];
}

//defining the initial state and its initial values
const initialState = {
  orders: [],
  loading: false,
  error: null,

  filter: [],
  searchs: ['onumber', ''],
} as OrderState;

export const ordersSlice = createSlice({
  name: "filter",
  initialState,

  reducers: {
    filterOrder: (state, action) => {
      //console.log(action.payload);
      //updated the initialState filter value to whatever filter value is passed in by the payload
      //so the filter value can be used to filter the orders in other components (orderList component)
      state.filter = action.payload;
    },
    searchOrderByandValue: (state, action) => {
      state.searchs = action.payload
    }
  },

  extraReducers: (builder) => {
    //respond to the action created in the slice
    builder
      .addCase(getOrders.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<Orders[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(getOrders.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { filterOrder, searchOrderByandValue } = ordersSlice.actions;
export default ordersSlice.reducer;
