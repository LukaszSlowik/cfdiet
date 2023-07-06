"use client"

import React from 'react'
import {useSession,signOut,signIn} from 'next-auth/react'
import { split } from 'postcss/lib/list'

export default function SignInButton() {
    const {data:session} = useSession()
console.log(session)
    if(session && session.user){
        return (
            <div className='flex gap-4 ml-auto'>
                {/* <p className='text-sky-600'>{session.user.name.split(" ")}</p> */}
                <button onClick={()=>signOut()} className='text-slate-400'>
                   Wyloguj
                </button>
            </div>
        )
    }
  return (
    <button onClick={()=> signIn()} className='text-green-600 ml-auto'>Zaloguj</button>
  )
}
