import React from 'react'
import SideNav from './_components/SideNav'
import { ThemeToggler } from '@/components/ThemeToggler'
import TopHeader from './_components/TopHeader'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
      <div className='hidden h-full md:flex md:w-64 flex-col fixed inset-y-0 z-50'>
        <SideNav />
      </div>
      <div className='md:ml-64'>
        <TopHeader />
        {children}
      </div>
    </div>
  )
}

export default layout