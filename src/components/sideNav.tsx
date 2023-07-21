import React from 'react'
import { MdOutlineDashboard, MdOutlineProductionQuantityLimits, MdOutlineListAlt, MdOutlineSettings } from 'react-icons/md'

export default function SideNav() {
    return (
        <nav className='bg-white pt-44 pb-96 px-8'>
            <ul className='flex flex-col gap-y-3'>
                <li className='p-2.5 rounded-xl border border-white flex items-center gap-x-2.5 text-zinc-400 cursor-pointer'>
                    <div className='p-1 rounded-md'><MdOutlineDashboard /></div>
                    <p>Dashboard</p>
                </li>
                <li className='p-2.5 rounded-xl border border-sky-100 text-blue-700 flex items-center gap-x-2.5 cursor-pointer'>
                    <div className='p-1 rounded-md bg-sky-100'><MdOutlineProductionQuantityLimits /></div>
                    <p>Products</p>
                </li>
                <li className='p-2.5 rounded-xl border border-white flex items-center gap-x-2.5 text-zinc-400 cursor-pointer'>
                    <div className='p-1 rounded-md'><MdOutlineListAlt /></div>
                    <p>Categories</p>
                </li>
                <li className='p-2.5 rounded-xl border border-white flex items-center gap-x-2.5 text-zinc-400 cursor-pointer'>
                    <div className='p-1 rounded-md'><MdOutlineSettings /></div>
                    <p>Settings</p>
                </li>
            </ul>
        </nav>
    )
}
