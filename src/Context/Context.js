import React, { useContext, createContext } from "react";

const UIContext = createContext();

async function checkCookie(cookieName) {
  const stroeCookie = document.cookie;
  if (stroeCookie.startsWith(`${cookieName}=`)) {
    return true;
  }
  return false;
}

async function deleteAuthTokenCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export function ContextFun(props) {

  return (
    <UIContext.Provider value={{ checkCookie,deleteAuthTokenCookie}}>
      {props.children}
    </UIContext.Provider>
  );
}

export function UpdateUI() {
  return useContext(UIContext)
}
