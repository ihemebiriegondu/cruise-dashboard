import React from 'react'
import { AiFillHome } from 'react-icons/ai'

export default function BreadCrumbs() {
    return (
        <div className='flex items-center gap-2 lg:text-base text-sm'>
            <AiFillHome /><span>/</span>
            <p>Products</p><span>/</span>
            <p className='font-bold text-blue-700'>Orders</p>
        </div>
    )
}
