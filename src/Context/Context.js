import React, { useState, useContext, createContext } from "react";

const UIContext = createContext();

function checkCookie(cookieName) {
  const stroeCookie = document.cookie;
  if (stroeCookie.startsWith(`${cookieName}=`)) {
    return true;
  }
  return false;
}
export function ContextFun(props) {
  let something = "hery "

  return (
    <UIContext.Provider value={{ checkCookie,something }}>
      {props.children}
    </UIContext.Provider>
  );
}

export function updateUI() {
  // return useContext(UIContext) ;
}
