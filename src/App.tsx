import React from "react";

import SideNav from "./components/sideNav";
import SearchBar from "./components/searchBar";
import BreadCrumbs from "./components/breadCrumbs";

import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { OrdersList } from "./components/orderList";
import FilterBars from "./components/filterBars";

function App() {
  return (
    <main className="bg-indigo-100 flex gap-x-1.5">
      <SideNav />

      <section className="basis-10/12 py-5">
        <div className="px-8 relative">
          <BreadCrumbs />
          <SearchBar />
          <FilterBars />
        </div>

        <table className="table-auto w-full rounded-md bg-white divide-y">
          <caption className="caption-top text-start text-zinc-400 mb-3 mt-4 ps-8">
            Showing result 101-120 Result
          </caption>

          <thead className="">
            <tr className="text-zinc-400">
              <th className="py-3 ps-9 text-start font-normal">Order number</th>
              <th className="text-start font-normal">Products</th>
              <th className="font-normal">Customer names</th>
              <th className="font-normal">Status</th>
              <th className="text-start font-normal">Date</th>
            </tr>
          </thead>

          <OrdersList />
        </table>

        {/*footer pagination */}
        <div className="flex items-center justify-center mt-8 gap-x-6">
          <FiChevronLeft className="cursor-pointer text-xl" />
          <div className="flex items-center gap-x-5 text-zinc-400">
            <p className="text-blue-700 font-semibold">1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
          </div>
          <FiChevronRight className="cursor-pointer text-xl" />
        </div>
      </section>
    </main>
  );
}

export default App;
