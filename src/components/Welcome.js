import React from 'react'
import {UserNameContext} from "../Context/UserNameContext"

export default function Welcome() {
    const {userName} = UserNameContext()
  return (
    <div>
      <h2 className='font-bold'>Welcome Back : {userName} </h2>
    </div>
  )
}
