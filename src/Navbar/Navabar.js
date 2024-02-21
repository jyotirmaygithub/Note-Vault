import React from 'react'
import Logo from './Logo'
import SwitchBtn from './SwitchBtn'
import UserName from './UserNameLogo/UserName'
import Date from "./Date"

export default function Navabar() {
  return (
    <div className='flex justify-between px-2 sm:px-3 md:px-5 lg:px-8 py-8 bg-black'>
      <div className="flex space-x-[10vw]">
      <Logo/>
      <Date/>
      </div>
      <div className='flex space-x-3'>
      <SwitchBtn/>
      <UserName/>
      </div>
    </div>
  )
}
