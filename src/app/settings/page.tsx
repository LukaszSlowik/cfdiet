import React from 'react'
import CreonsSettings from './components/CreonsSettings'
import Link from 'next/link'

type Props = {}

export default function page({}: Props) {
  return (
    <div>
<CreonsSettings/>
<Link
          className="text-white/80 no-underline hover:text-white"
          href="/products/productsList"
        >
          Products
        </Link>
    </div>
  )
}