import React from 'react'
import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function ProgressCircle() {
    const toNavigate = useNavigate()
    setTimeout(() => {
        toNavigate("/existing-notes")
    }, 1000);
  return (
    <div className='h-screen flex justify-center items-center'>
     <CircularProgress style={{ color: 'black'}} />
    </div>
  )
}
