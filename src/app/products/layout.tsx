//import NewProduct from "@/components/NewProduct"
import Link from "next/link"
//import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (

   
      <div className="flex justify-center ">

{children}
{/* <ReactQueryDevtools/> */}
      </div>
        
       
  
    )
  }
  