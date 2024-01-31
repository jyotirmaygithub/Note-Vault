import React, { useState, useContext, createContext } from "react";

const UIContext = createContext();

async function checkCookie(cookieName) {
  const stroeCookie = document.cookie;
  if (stroeCookie.startsWith(`${cookieName}=`)) {
    return true;
  }
  return false;
}
export function ContextFun(props) {

  return (
    <UIContext.Provider value={{ checkCookie }}>
      {props.children}
    </UIContext.Provider>
  );
}

export function UpdateUI() {
  return useContext(UIContext)
}
