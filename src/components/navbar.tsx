import React from 'react'

export default function navbar() {
  return (
    <nav className='inset-x-0 w-full h-[80px] bg-[#111] border-b-2 
    border-b-primary flex items-center justify-between z-50 top-0 overflow-hidden fixed nav'>
        <div className='text-2xl font-semibold pl-[36px]'>
            Seefahrer<span className='text-primary font-bold'>180</span>.
        </div>
        <div className='pr-[36px]'>
            Menü
        </div>
    </nav>
  )
}
