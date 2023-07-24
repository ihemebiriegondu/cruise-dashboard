import React from "react";

import SideNav from "./components/sideNav";
import SearchBar from "./components/searchBar";
import BreadCrumbs from "./components/breadCrumbs";

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
        <OrdersList />
      </section>
    </main>
  );
}

export default App;
