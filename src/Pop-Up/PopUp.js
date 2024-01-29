import React from "react";
import Dialog from "./Dialog";

export default function FormDialog(props) {
    // let { popUpState,setPopUpState } =  props;
    // console.log("value of popstate = " , popUpState)
  return (
    <div>
      <Dialog
        // open={popUpState}
        // stateOfModal= {setPopUpState}
        TransitionDuration={0} 
      />
    </div>
  );
}
