import React from "react";

import SideNav from "./components/sideNav";
import SearchBar from "./components/searchBar";
import BreadCrumbs from "./components/breadCrumbs";

import { OrdersList } from "./components/orderList";
import FilterBars from "./components/filterBars";

function App() {
  return (
    <main className="bg-indigo-100 flex justify-start lg:gap-x-1.5 lg:pe-10">
      <aside className="lg:basis-2/12">
        <SideNav />
      </aside>

      <section className="lg:basis-10/12 2xl:basis-11/12 lg:pt-5 pt-2 pb-5 w-full lg:px-0 sm:px-4 smaller:px-2 px-1">
        <div className="md:px-6 lg:px-8 relative">
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
