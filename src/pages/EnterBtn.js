import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function EnterBtn() {
  const navigation = useNavigate()

  function handleclick(){
    setTimeout(() => {
      navigation(`/home`)   
    }, 500);
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-evenly ">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-2">Welcome to NoteVault</h1>
        <p className="text-gray-600">Your Secure Space for Effortless Note-Taking and Quick Retrieval</p>
      </div>
      {/* <div> */}
        <Button className="bg-black text-white h-14 w-44 flex justify-center items-center space-x-2" variant="contained" onClick={handleclick}disableElevation>
         <p className="mb-0">Build Notes</p>
          <ArrowRightIcon className="h-7 w-5"/>
        </Button>
      {/* </div> */}
    </div>
  );
}
