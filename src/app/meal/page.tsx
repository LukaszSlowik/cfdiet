import MealTable from '@/components/MealTable'
import SearchProduct from '@/components/SearchProduct'
import React from 'react'

type Props = {}

export default function page({}: Props) {



  return (
    <div className='flex flex-col  sm:items-center '>
          <SearchProduct/>
          <br/>
<MealTable/>
    </div>
  )
}