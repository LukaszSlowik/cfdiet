import React from 'react'
import ResetPassword from './components/ResetPassword'

type Props = {
    params:{
        token:string
    }
}

export default function page({params:{token}}: Props) {

  return (
    <div><ResetPassword token={token}/></div>
  )
}