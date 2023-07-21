import React from 'react'
import { RxCross2 } from 'react-icons/rx'

export default function FilterModal() {
    return (
        <div className='absolute z-40 bg-black/20 top-0 bottom-0 left-0 right-0'>
            <div className='flex flex-col justify-center h-full'>
                <form className='bg-white w-1/3 mx-auto p-8 rounded-xl shadow-lg relative'>
                    <div className='absolute right-4 top-3 p-2.5 rounded-full bg-sky-100 cursor-pointer'><RxCross2 /></div>
                    <h2 className='font-bold text-lg mb-4'>Filter Orders</h2>
                    <div>
                        <p className='uppercase text-sm font-medium mb-2 text-zinc-400'>Status</p>
                        <div className='flex justify-between'>
                            <div className='flex items-stretch'>
                                <input type="checkbox" checked name="status" id="complete" className='me-1.5 w-4' />
                                <label htmlFor="complete" className='font-semibold'>Completed</label>
                            </div>

                            <div className='flex items-stretch'>
                                <input type="checkbox" checked name="status" id="pending" className='me-1.5 w-4' />
                                <label htmlFor="pending">Pending</label>
                            </div>

                            <div className='flex items-stretch'>
                                <input type="checkbox" checked name="status" id="rejected" className='me-1.5 w-4' />
                                <label htmlFor="rejected">Rejected</label>
                            </div>
                        </div>
                    </div>
                    <hr className='my-5' />
                    <div className='flex justify-between items-center font-medium text-sm'>
                        <button type='button' className='uppercase'>Reset</button>
                        <button type='submit' className='bg-blue-700 text-white py-3 px-6 rounded-sm uppercase'>Apply Filters</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

