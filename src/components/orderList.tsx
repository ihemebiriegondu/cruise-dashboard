import React, { useEffect } from "react";
//import the already called functions from the hooks
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { getOrders } from "../app/ordersSlice";

//this is the changable value (instead of useState)
let filteredOrder = [];

export function OrdersList() {
  //get the updated states
  const { orders, loading, error, filter, searchs } = useAppSelector(
    (state) => state.ordersReducer
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  //console.log(orders);
  //console.log(searchs)

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
  filteredOrder = allOrdersFields;

  //getting if orderDate is today, tomorrow...
  const getDateValue = (fullDate: any) => {
    const todaysDate = new Date();
    const fullDateValue = new Date(fullDate);
    const yesterdayDate = new Date(todaysDate.valueOf() - 1000 * 60 * 60 * 24);
    todaysDate.setHours(0);
    todaysDate.setMinutes(0);
    todaysDate.setSeconds(0);

    const getWeek = (datetoGet: any) => {
      const year = new Date(datetoGet.getFullYear(), 0, 1);
      const days = Math.floor(
        (datetoGet.getTime() - year.getTime()) / (24 * 60 * 60 * 1000)
      );
      const week = Math.ceil((datetoGet.getDay() + 1 + days) / 7);

      return week;
    };

    //array to contain the different date filterby
    const dateFil: any[] = [];

    if (todaysDate.getMonth() === fullDateValue.getMonth()) {
      dateFil.push("thismonth");
    }
    if (getWeek(todaysDate) === getWeek(fullDateValue)) {
      dateFil.push("thisweek");
    }
    if (
      todaysDate.toLocaleDateString() === fullDateValue.toLocaleDateString()
    ) {
      dateFil.push("today");
    }
    if (
      yesterdayDate.toLocaleDateString() === fullDateValue.toLocaleDateString()
    ) {
      dateFil.push("yesterday");
    }
    return dateFil;
    //console.log(dateFil)
  };

  const filtered: any[] = [];
  const searched: any[] = [];
  //getting the filtered data from wrt the filter value gotten from the orderSlice

  const getFilteredData = () => {
    const searchBy = searchs[0];
    const searchValue = searchs[1];

    //check if the two filters are not empty
    //if they are both not empty, look for the orders that have the 2 filters

    //get the searchValues
    const getSearch = () => {
      allOrdersFields.forEach((order) => {
        let nameValues = order.name.stringValue.toLowerCase();
        let productValues = order.product.stringValue.toLowerCase();

        if (searchBy === "onumber") {
          if (order.onumber.stringValue.includes(searchValue)) {
            searched.push(order);
          }
        }
        if (searchBy === "name") {
          if (nameValues.includes(searchValue)) {
            searched.push(order);
          }
        }
        if (searchBy === "product") {
          if (productValues.includes(searchValue)) {
            searched.push(order);
          }
        }
      });
    };
    //get the filter values
    const getFilter = () => {
      allOrdersFields.forEach((order) => {
        //check if the two filters are not empty
        //if they are both not empty, look for the orders that have the 2 filters
        if (filter[0] !== null && filter[1] !== null) {
          //console.log(filter[0]);
          //console.log(filter[1]);
          if (
            order.status.stringValue === filter[0] &&
            getDateValue(order.date.timestampValue).includes(filter[1])
          ) {
            filtered.push(order);
          }
          //if either is empty
        } else if (filter[0] !== null || filter[1] !== null) {
          if (
            order.status.stringValue === filter[0] &&
            !getDateValue(order.date.timestampValue).includes(filter[1])
          ) {
            filtered.push(order);
          } else if (
            !(order.status.stringValue === filter[0]) &&
            getDateValue(order.date.timestampValue).includes(filter[1])
          ) {
            filtered.push(order);
          }
        }
      });
    };

    //if searchValue and all filters are empty
    if (searchValue === "" && filter[0] === null && filter[1] === null) {
      filteredOrder = allOrdersFields;
      //if both the searchValue or the filters are not empty
    } else if (
      searchValue !== "" &&
      (filter[0] !== null || filter[1] !== null)
    ) {
      getFilter();
      getSearch();
      //console.log(filtered)
      //console.log(searched);

      //getting the common orders in the two array
      filteredOrder = filtered.filter((order) => searched.includes(order));

      //if either the searchValue or the filters is not empty
    } else if (searchValue !== "" || filter[0] !== null || filter[1] !== null) {
      if (searchValue === "" && (filter[0] !== null || filter[1] !== null)) {
        getFilter();
        filteredOrder = filtered;
      } else if (
        searchValue !== "" &&
        filter[0] === null &&
        filter[1] === null
      ) {
        getSearch();
        filteredOrder = searched;
      }
    }

    //if either is empty

    /*if (
        order.status.stringValue === filter[0] &&
        !getDateValue(order.date.timestampValue).includes(filter[1])
      ) {
        filtered.push(order);
      } else if (
        !(order.status.stringValue === filter[0]) &&
        getDateValue(order.date.timestampValue).includes(filter[1])
      ) {
        filtered.push(order);
      }*/

    /*if (JSON.stringify(searchs) === '["",""]') {
      filteredOrder = allOrdersFields;
    } else {
      allOrdersFields.forEach((order) => {
        let nameValues = order.name.stringValue.toLowerCase();
        let productValues = order.product.stringValue.toLowerCase();

        if (searchBy === "onumber") {
          if (order.onumber.stringValue.includes(searchValue)) {
            filtered.push(order);
          }
        }
        if (searchBy === "name") {
          if (nameValues.includes(searchValue)) {
            filtered.push(order);
          }
        }
        if (searchBy === "product") {
          if (productValues.includes(searchValue)) {
            filtered.push(order);
          }
        }
      });
      //console.log(filtered)
      filteredOrder = filtered;

      //i added return so it wont call the second if (filter if)
      return;
    }

    if (JSON.stringify(filter) === "[null,null]") {
      //if no filter
      filteredOrder = allOrdersFields;
    } else {
      allOrdersFields.forEach((order) => {
        //check if the two filters are not empty
        //if they are both not empty, look for the orders that have the 2 filters
        if (filter[0] !== null && filter[1] !== null) {
          //console.log(filter[0]);
          //console.log(filter[1]);
          if (
            order.status.stringValue === filter[0] &&
            getDateValue(order.date.timestampValue).includes(filter[1])
          ) {
            filtered.push(order);
          }
          //if either is empty
        } else if (filter[0] !== null || filter[1] !== null) {
          if (
            order.status.stringValue === filter[0] &&
            !getDateValue(order.date.timestampValue).includes(filter[1])
          ) {
            filtered.push(order);
          } else if (
            !(order.status.stringValue === filter[0]) &&
            getDateValue(order.date.timestampValue).includes(filter[1])
          ) {
            filtered.push(order);
          }
        }
      });
      filteredOrder = filtered;
    }*/
    //console.log(filtered);
  };
  getFilteredData();

  //getting the order dates from the timestamp in the database
  const getDatefromTimestamp = (timestamp: any) => {
    const date = new Date(timestamp);
    const monthStr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthStr[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const dateString = `${month} ${day}, ${year}`;
    //console.log(dateString)

    return dateString;
  };

  return (
    <tbody className="pb-4">
      {loading ? (
        <tr>
          <td>loading</td>
        </tr>
      ) : (
        filteredOrder &&
        filteredOrder.map((order: any) => (
          <tr key={order.onumber.stringValue} id={order.onumber.stringValue}>
            <td className="py-5 ps-9">{order.onumber.stringValue}</td>
            <td className="font-bold">{order.product.stringValue}</td>
            <td className="text-center">{order.name.stringValue}</td>
            <td className="text-sm text-center">
              <button
                className={` ${
                  order.status.stringValue === "completed"
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
      {error && (
        <tr>
          <td>{error}</td>
        </tr>
      )}
    </tbody>
  );
}
