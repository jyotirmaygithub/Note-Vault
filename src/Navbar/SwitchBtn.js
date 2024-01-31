import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SwitchBtn() {
  const userLocation = useLocation();
  const [userSpot, setUserSpot] = useState("Add Note");

  useEffect(() => {
    if (userLocation.pathname === "/existing-notes") {
      setUserSpot('Create Note');
    } else if (userLocation.pathname === "/create-notes") {
      setUserSpot('Available Notes');
    } 
  }, [userLocation.pathname]);

  return (
    <div>
      <button className='bg-white text-black px-4 py-2 rounded-full'>{userSpot}</button>
    </div>
  );
}
