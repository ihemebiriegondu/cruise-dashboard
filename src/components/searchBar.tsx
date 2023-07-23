import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

//import the already called functions from the hooks
import { useAppDispatch } from "../app/hooks";
import { searchOrderByandValue } from "../app/ordersSlice";

export default function SearchBar() {
  const [allSearchValues, setAllSearchValues] = useState<any | []>([]);
  const [searchFilter, setSearchFilter] = useState("onumber");
  const [searchValue, setSearchValue] = useState("");
  //const [searchValue, setSearchValue] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    //updating the searchbyorderandvalue orders
    dispatch(searchOrderByandValue(allSearchValues))
    setAllSearchValues([searchFilter, searchValue])
  }, [dispatch, searchFilter, allSearchValues, searchValue]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchFilter(value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
  };

  return (
    <form className="bg-white w-1/2 rounded-md overflow-hidden flex items-center mt-7">
      <select
        value={searchFilter}
        onChange={handleFilterChange}
        name="searchFilter"
        id="searchFilter"
        className="border-none outline-none text-sm ps-3 cursor-pointer pe-3 bg-blue-700 py-3 text-white"
      >
        <option
          value="onumber"
          className="bg-white border-none outline-none text-black"
        >
          Order number
        </option>
        <option
          value="name"
          className="bg-white border-none outline-none text-black"
        >
          Customer name
        </option>
        <option
          value="product"
          className="bg-white border-none outline-none text-black"
        >
          Product name
        </option>
      </select>

      <input
        type={searchFilter === "onumber" ? "tel" : "text"}
        onChange={handleValueChange}
        name="searchInput"
        id="searchInput"
        value={searchValue}
        placeholder="Search"
        className="grow border-none outline-none px-3 py-2.5 text-sm"
      />
      <div onClick={() => {setSearchValue('')}} className="flex-none p-3.5 rounded-sm text-white bg-blue-700/50 cursor-pointer">
        <RxCross2 className="text-base" />
      </div>
    </form>
  );
}
