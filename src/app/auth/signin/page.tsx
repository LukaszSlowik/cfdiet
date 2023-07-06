import React from 'react'
import SignIn from './components/SignIn'
import Link from 'next/link'
import { headers } from 'next/headers';
type Props = {
  params:{
    id?:string
  },
  searchParams:{
    callbackUrl:string
  }
}

export const dynamic = 'force-dynamic'

export default function LoginPage({params,searchParams:{callbackUrl}}: Props) {
const encodedcallbackUrl = encodeURI(callbackUrl)
console.log("Encoded:",encodedcallbackUrl)
  const headersList = headers();
  const domain = headersList.get('host') || "";
  const fullUrl = headersList.get('referer') || "";

  console.log(fullUrl);

  return (
    <div>
      {/* <Link href={`/auth/signup?callbackUrl=${callbackUrl}`}>Sign up</Link> */}
 <div><SignIn/></div>
    </div>
   
  )
}