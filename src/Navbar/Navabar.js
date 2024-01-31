import React from 'react'
import Logo from './Logo'
import HomeContact from './Home_Contact'

export default function Navabar() {
  return (
    <div className='flex space-x-32 justify-start items-center px-5 py-8 bg-black'>
      <Logo/>
      <HomeContact/>
    </div>
  )
}
