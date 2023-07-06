//import ProductsList from '@/components/ProductsList'
import React, { ReactNode } from 'react'

type Props = {
    children:ReactNode
}

export default function layout({children}: Props) {

//className='overflow-x-auto w-screen' if on the page there will be elements with width bigger then screen
  return (
    <section className='overflow-x-auto  w-screen'>  

<main>{children}</main>

    </section>
  )
}