import React, { useEffect } from "react";

//import the already called functions from the hooks
import { useAppSelector, useAppDispatch } from "../app/hooks";

import { getOrders } from "../app/ordersSlice";

export function OrdersList() {
  //get the updated states
  const { orders, loading, error } = useAppSelector(
    (state) => state.ordersReducer
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  //console.log(orders);

  //Variable 'ordersArray' implicitly has an 'any[]' type
  const ordersArray: any[] = [];
  const allOrdersFields: any[] = [];

  for (const key in orders) {
    //Object.values returns an array, it converts the object gotten from orders[key] to an array
    const element = Object.values(orders[key]);
    //console.log(element);

    //loop through the element array to get all the objects in it, and then push all the objects into the ordersArray array
    element.forEach((ele) => {
      //console.log(ele);
      ordersArray.push(ele);
    });
  }
  //console.log(ordersArray);

  //loop through the ordersArray to the the 'fields' object (since that is what is needed) and add the objects to the allOrdersField array
  ordersArray.forEach((array) => {
    allOrdersFields.push(array.fields);
  });
  //console.log(allOrdersFields);

  //getting the order dates from the timestamp in the database
  const getDatefromTimestamp = (timestamp: any) => {
    const date = new Date (timestamp);
    const monthStr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const month = monthStr[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const dateString = `${month} ${day}, ${year}`
    //console.log(dateString)

    return dateString
  };

  return (
    <tbody className="pb-4">
      {loading ? (
        <tr>
          <td>loading</td>
        </tr>
      ) : (
        allOrdersFields &&
        allOrdersFields.map((order) => (
          <tr key={order.onumber.stringValue}>
            <td className="py-5 ps-9">{order.onumber.stringValue}</td>
            <td className="font-bold">{order.product.stringValue}</td>
            <td className="text-center">{order.name.stringValue}</td>
            <td className="text-sm text-center">
              <button
                className={` ${
                  order.status.stringValue === "complete"
                    ? "bg-green-100 text-green-500"
                    : ""
                } 
                ${
                  order.status.stringValue === "pending"
                    ? "bg-yellow-100 text-yellow-500"
                    : ""
                }
                ${
                  order.status.stringValue === "rejected"
                    ? "bg-red-100 text-red-500"
                    : ""
                } py-2 px-4 rounded-xl`}
              >
                {order.status.stringValue}
              </button>
            </td>
            <td>{getDatefromTimestamp(order.date.timestampValue)}</td>
          </tr>
        ))
      )}
    </tbody>
  );
}
