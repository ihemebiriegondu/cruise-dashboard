import React, { useState, useEffect } from "react";
import { AiFillCaretDown, AiFillCheckCircle } from "react-icons/ai";

import { useAppDispatch } from "../app/hooks";
import { filterOrder } from "../app/ordersSlice";

export default function FilterBars() {
  //getting orders with dispatch
  const dispatch = useAppDispatch();

  const [filterValues, setfilterValues] = useState<any | []>([]);
  const [statusFilter, setStatusFilter] = useState<any | null>(null);
  const [dateFilter, setDateFilter] = useState<any | null>(null);

  useEffect(() => {
    //updating the filterby orders
    dispatch(filterOrder(filterValues));
    setfilterValues([statusFilter, dateFilter]);
  }, [filterValues, dispatch, dateFilter, statusFilter]);

  const [targetDropDown, setTargetdropdown] = useState<any | null>(null);
  const [show, setShow] = useState(false);

  const showDropDowns = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget.getAttribute("data-dropdown");
    // console.log(target);
    setTargetdropdown(target);
    setShow(!show);
  };

  const getFilters = (event: React.MouseEvent<HTMLLIElement>) => {
    //getting the id of the parent element to know if the filter is by status/date/customer
    const filterby = event.currentTarget.parentElement?.id;

    switch (filterby) {
      case "statusDropdown":
        setStatusFilter(event.currentTarget.textContent?.toLowerCase());
        break;
      case "dateDropdown":
        //remove whitespaces from between the text content
        setDateFilter(
          event.currentTarget.textContent?.replace(/\s/g, "").toLowerCase()
        );
        break;
      default:
        setfilterValues(null);
    }
    setShow(!show);
  };

  //console.log(filterValues)

  return (
    <div className="bg-white w-full mt-2 lg:mt-4 rounded-lg shadow-sm overflow-hidden px-2 sm:px-4 py-2 sm:py-3.5">
      <h1 className="font-bold mb-2">Filter by:</h1>
      <div className="flex justify-between flex-wrap gap-2">
        <div className="flex gap-x-2 sm:gap-x-4 md:gap-x-8 lg:gap-x-10">
          <div
            data-dropdown="statusDropdown"
            onClick={showDropDowns}
            className="flex-none flex items-center text-sm ps-4 pe-3 py-3 cursor-pointer rounded-lg border border-zinc-400"
          >
            <p className="me-2">Status</p>
            <AiFillCaretDown className="mt-1" />
          </div>

          <div
            data-dropdown="dateDropdown"
            onClick={showDropDowns}
            className="flex-none flex items-center text-sm ps-4 pe-3 py-3 cursor-pointer rounded-lg border border-zinc-400"
          >
            <p className="me-2">Order date</p>
            <AiFillCaretDown className="mt-1" />
          </div>
        </div>

        <button
          onClick={() => {
            setDateFilter(null);
            setStatusFilter(null);
          }}
          className="border-none outline-none bg-blue-700 text-white py-2.5 px-6 rounded-lg text-sm flex items-center"
        >
          <p>Reset Filter</p>
        </button>
        {/*<div
          data-dropdown="customerDropdown"
          className="flex-none flex items-center text-sm ps-4 pe-3 py-3 cursor-pointer rounded-lg border border-zinc-400"
        >
          <p className="me-2">Customer</p>
          <AiFillCaretDown className="mt-1" />
        </div>
  */}
      </div>

      {/* all dropdowns */}
      <div>
        {targetDropDown === "statusDropdown" && (
          <ul
            id="statusDropdown"
            className={`absolute bg-white top-52 left-10 py-3 px-4 rounded-md shadow ${
              show ? "block" : "hidden"
            }`}
          >
            <li
              onClick={getFilters}
              className="my-2 cursor-pointer flex items-center"
            >
              <AiFillCheckCircle
                className={`me-2 ${
                  statusFilter === "completed" ? "block" : "hidden"
                }`}
              />
              Completed
            </li>
            <li
              onClick={getFilters}
              className="my-2 cursor-pointer flex items-center"
            >
              <AiFillCheckCircle
                className={`me-2 ${
                  statusFilter === "pending" ? "block" : "hidden"
                }`}
              />
              Pending
            </li>
            <li
              onClick={getFilters}
              className="my-2 cursor-pointer flex items-center"
            >
              <AiFillCheckCircle
                className={`me-2 ${
                  statusFilter === "rejected" ? "block" : "hidden"
                }`}
              />
              Rejected
            </li>
          </ul>
        )}

        {targetDropDown === "dateDropdown" && (
          <ul
            id="dateDropdown"
            className={`absolute bg-white top-52 left-44 py-3 px-4 rounded-md shadow ${
              show ? "block" : "hidden"
            }`}
          >
            <li
              onClick={getFilters}
              className="my-2 cursor-pointer flex items-center"
            >
              <AiFillCheckCircle
                className={`me-2 ${
                  dateFilter === "today" ? "block" : "hidden"
                }`}
              />
              Today
            </li>
            <li
              onClick={getFilters}
              className="my-2 cursor-pointer flex items-center"
            >
              <AiFillCheckCircle
                className={`me-2 ${
                  dateFilter === "yesterday" ? "block" : "hidden"
                }`}
              />
              Yesterday
            </li>
            <li
              onClick={getFilters}
              className="my-2 cursor-pointer flex items-center"
            >
              <AiFillCheckCircle
                className={`me-2 ${
                  dateFilter === "thisweek" ? "block" : "hidden"
                }`}
              />
              This week
            </li>
            <li
              onClick={getFilters}
              className="my-2 cursor-pointer flex items-center"
            >
              <AiFillCheckCircle
                className={`me-2 ${
                  dateFilter === "thismonth" ? "block" : "hidden"
                }`}
              />
              This month
            </li>
          </ul>
        )}

        {/*customer list */}
        {/*<ul className="absolute bg-white top-52 left-10 py-3 px-4 rounded-md shadow">
          
        </ul*/}
      </div>
    </div>
  );
}
