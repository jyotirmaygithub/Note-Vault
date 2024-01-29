import React, { useState, useContext, createContext } from "react";

const Context = createContext();

export function ContextFun(props) {
  // Use "props" instead of "{ Children }"
  const [showModal, setShowModal] = useState(false);

  return (
    <Context.Provider value={{ showModal, setShowModal }}>
      {props.children}
    </Context.Provider>
  );
}

export function States_Func() {
  return useContext(Context);
}
