import React from 'react'
import { PencilIcon } from '@heroicons/react/24/solid';

export default function Logo() {
  return (
    <div className='flex justify-center items-center'>
      <PencilIcon className='h-8 w-6 text-white'/>
      <h3 className='text-white'>NoteVault</h3>
    </div>
  )
}
