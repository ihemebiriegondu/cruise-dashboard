import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

//fetching the data from firebaseDb with axios
//<Orders[]> makes sure the data gotten is in the Orders format defined below
export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (data, thunkapi) => {
    try {
      const response = await axios.get<Orders[]>(
        "https://firestore.googleapis.com/v1/projects/jdeveloper-task/databases/(default)/documents/dashboardOrders"
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
  id: number,
  date: Date,
  product: string,
  name: string,
  status: string,
}

//initialState format/syntax
export interface OrderState {
  orders: null | Orders[];
  loading: boolean;
  error: null | string;
}

//defining the initial state and its initial values
const initialState = {
  orders: null,
  loading: false,
  error: null,
} as OrderState;

export const ordersSlice = createSlice({
  name: "filter",
  initialState,

  reducers: {
    // standard reducer logic, with auto-generated action types per reducer


    /*//return { ...state, orders: [...action.payload] };
    setOrders: (state, action) => {
      //console.log(action.payload)
      state.orders = action.payload;
      //console.log(state)
    },
    filterByStatus: (state, action) => {
      const orders = state.orders.map((order) => {
        /*if (order.id === action.payload.id) {
          order = action.payload;
        }
        return order;
      });
      return { ...state, orders: [...orders] };
    },*/
  },

  extraReducers: (builder) => {
    //respond to the action created in the slice
    builder
      .addCase(getOrders.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action: PayloadAction<Orders[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

//export const { setOrders, filterByStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
