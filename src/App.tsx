import React from 'react';
import SideNav from './components/sideNav';
import SearchBar from './components/searchBar';

import { FiFilter, FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import BreadCrumbs from './components/breadCrumbs';
import FilterModal from './components/filterModal';

function App() {

  const orders = [
    { id: '1001', product: 'TV 14 Inch Gede', name: 'Nakoyame Japan', status: 'Complete', date: '21-03-2022' },
    { id: '1002', product: 'Sepeda BMX Shadow Blue', name: 'Jakarta Selatan', status: 'Pending', date: '21-03-2023' },
    { id: '1003', product: 'TV 14 Inch Gede', name: 'Lumajang', status: 'Pending', date: '23-06-2022' },
    { id: '1004', product: 'Iphone 11 256 GB TAM', name: 'Surabaya', status: 'Rejected', date: '21-03-2022' },
    { id: '1005', product: 'Oppo Reno 4', name: 'Jembrana', status: 'Complete', date: '21-03-2022' },
  ]

  return (
    <main className='bg-indigo-100 flex gap-x-1.5'>
      {/* side navbar */}
      <aside className=''>
        <SideNav />
      </aside>

      {/*main center div */}
      <section className='basis-10/12 py-5'>
        <div className='ps-8'>
          <BreadCrumbs />

          <div className='flex justify-between items-center mt-7'>
            <SearchBar />
      
            <button className='border-none outline-none bg-blue-700 text-white py-2.5 px-6 rounded-2xl text-sm flex items-center'>
              <FiFilter className='mt-1 me-2' />
              <p>Filter</p>
            </button>
            <FilterModal />
          </div>
        </div>

        <table className='table-auto w-full rounded-md bg-white divide-y'>
          <caption className="caption-top text-start text-zinc-400 mb-3 mt-4 ps-8">Showing result 101-120 Result</caption>

          <thead className=''>
            <tr className='text-zinc-400'>
              <th className='py-3 ps-9 text-start font-normal'>Order number</th>
              <th className='text-start font-normal'>Products</th>
              <th className='font-normal'>Customer names</th>
              <th className='font-normal'>Status</th>
              <th className='text-start font-normal'>Date</th>
            </tr>
          </thead>

          <tbody>
            {
              orders.map((order) => (
                <tr>
                  <td className='py-3 ps-9'>{order.id}</td>
                  <td className='font-bold'>{order.product}</td>
                  <td className='text-center'>{order.name}</td>
                  <td className='text-sm text-center'><button className={` ${order.status === 'Complete' ? 'bg-green-100 text-green-500' : ''} 
                      ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-500' : ''}
                      ${order.status === 'Rejected' ? 'bg-red-100 text-red-500' : ''} py-2 px-4 rounded-xl`}>{order.status}</button></td>
                  <td>{order.date}</td>
                </tr>
              ))
            }
          </tbody>
        </table>


        {/*footer pagination */}
        <div className='flex items-center justify-center mt-8 gap-x-6'>
          <FiChevronLeft className='cursor-pointer text-xl' />
          <div className='flex items-center gap-x-5 text-zinc-400'>
            <p className='text-blue-700 font-semibold'>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
          </div>
          <FiChevronRight className='cursor-pointer text-xl' />
        </div>
      </section>
    </main>
  );
}

export default App;
