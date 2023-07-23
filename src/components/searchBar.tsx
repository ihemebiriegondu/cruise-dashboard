import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar() {
  const [searchFilter, setSearchFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");
  //const [searchValue, setSearchValue] = useState<string[]>([]);
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSearchFilter(value);
    console.log(value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    console.log(value)
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
        type={"text"}
        onChange={handleValueChange}
        name="searchInput"
        id="searchInput"
        placeholder="Search"
        className="grow border-none outline-none px-3 py-2.5 text-sm"
      />
      <div className="flex-none p-3.5 rounded-sm text-white bg-blue-700 cursor-pointer">
        <AiOutlineSearch className="text-base" />
      </div>
    </form>
  );
}
