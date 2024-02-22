import React from 'react';
import { Typography, Box } from '@mui/material';

export default function DateComponent() {
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  return (
    <Box className="date-style">
      <Typography className='text-white' variant="p">Day & Date</Typography>
      <Typography className='text-white' variant="subtitle1">{formattedDate}</Typography>
    </Box>
  );
}
