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
    document.cookie = `${value}=; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/;`
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
