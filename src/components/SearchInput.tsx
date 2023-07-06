"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'


type Props = {}

export default function SearchInput({}: Props) {


  const search = useSearchParams();
  const searchQueryDefault = search ? search.get("q") : null;
  const encodedSearchQueryDefault = encodeURI(searchQueryDefault || "")
    const [searchQuery,setSearchQuery] = useState(encodedSearchQueryDefault);
    const router = useRouter();
    const onSearch = (event:React.FormEvent) => {
event.preventDefault();

const encodedSearchQuery = encodeURI(searchQuery);
router.push(`/search?q=${encodedSearchQuery}`)
console.log("current query", encodedSearchQuery)
    }


  return (
    <form className='flex justify-center w-2/3' onSubmit={onSearch}>

   
    <input 
    value={searchQuery}
    onChange={(event)=> setSearchQuery(event.target.value)}
    className='px-5 py-1 w-2/3 sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 rounded-full focus:bg-black focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-400'
    placeholder='What are you looking for?'
    />
     </form>
  )
}