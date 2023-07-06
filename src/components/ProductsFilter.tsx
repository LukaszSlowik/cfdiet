import React, { useState } from 'react'


type Props = {
    filter:any,
    setFilter:any
}

export default function ProductsFilter({filter,setFilter}: Props) {

    // const count = preGlobalFilteredRows.length;
    // const [value,setValue] = useState(globalFilter)

    // const onChange = useAsyncDebounce()
  return (
    <span>
        Search: {' '}
        <input value={filter || ""}
        onChange={e=> setFilter(e.target.value)}/>
    </span>
  )
}