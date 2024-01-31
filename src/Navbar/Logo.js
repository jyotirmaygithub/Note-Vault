import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { PencilIcon } from '@heroicons/react/24/solid';
export default function Logo() {
  return (
    <div className='flex space-x-1'>
      <PencilIcon className='h-8 w-6'/>
      <h3>NoteVault</h3>
    </div>
  )
}
