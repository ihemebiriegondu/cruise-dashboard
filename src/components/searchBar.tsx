import React from 'react'
import { AiOutlineSearch, AiFillCaretDown } from 'react-icons/ai'

export default function SearchBar() {
    return (
        <div className='bg-white w-1/2 rounded-full overflow-hidden flex items-center'>
            <div className='flex-none flex items-center text-sm ps-4 pe-3 bg-blue-700 py-3 text-white cursor-pointer'>
                <p className='me-2'>Order number</p>
                <AiFillCaretDown className='mt-1' />
            </div>
            <input type="text" name="searchInput" id="searchInput" placeholder='Search' className='grow border-none outline-none px-3 text-sm' />
            <div className='flex-none p-3 rounded-full text-white bg-blue-700 cursor-pointer'><AiOutlineSearch className='text-base' /></div>
        </div>
    )
}
