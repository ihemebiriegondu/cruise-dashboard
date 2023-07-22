import React, { useEffect } from "react";

//import the already called functions from the hooks
import { useAppSelector, useAppDispatch } from '../app/hooks'

import { getOrders } from "../app/ordersSlice";

export function OrdersList() {

  //get the updated states
  const { orders, loading, error } = useAppSelector((state) => state.ordersReducer);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getOrders());
    //console.log(orders)
  }, [dispatch]);
  console.log(orders);

  return (
    <div></div>
  );
}
