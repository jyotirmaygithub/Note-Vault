import React from 'react'
import Logo from './Logo'
import HomeContact from './Home_Contact'
import SwitchBtn from './SwitchBtn'

export default function Navabar() {
  return (
    <div className='flex justify-between px-5 py-8 bg-black'>
      <div className="flex space-x-32">
      <Logo/>
      <HomeContact/>
      </div>
      <SwitchBtn/>
    </div>
  )
}
