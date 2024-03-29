import React, { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { UpdateUI } from "../Context/Context";
import { UserNotes } from "../Context/NoteContext";
import Circleprogress from "../components/circleprogress"

export default function EnterBtn() {
  const navigation = useNavigate();
  const { checkCookie } = UpdateUI();
  const { fetchAllNotes } = UserNotes();
  const [loader,setLoader] = useState(false)

  async function handleclick() {
    setLoader(true)
    const response = await checkCookie("auth_token");
    if (response) {
      const result = await fetchAllNotes();
      if (result.length === 0) {
        navigation(`/create-notes`);
      } else {
        navigation(`/fetchingdata`);
      }
    } else {
      setTimeout(() => {
        navigation(`/login`);
      }, 500);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-evenly ">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2 font-size">
          Welcome to NoteVault
        </h1>

        <p className="text-gray-600">
          Your Secure Space for Effortless Note-Taking and Quick Retrieval
        </p>
      </div>
      <Button
        className="bg-black text-white h-14 w-44 flex justify-center items-center space-x-2"
        variant="contained"
        onClick={handleclick}
        disableElevation
      >
        {loader ? <Circleprogress/> : <p className="mb-0">Build Notes</p> }
        {!loader && <ArrowRightIcon className="h-7 w-5" />}
      </Button>
    </div>
  );
}
