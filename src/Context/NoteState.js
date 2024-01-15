import { useState, useContext, createContext } from "react";

const noteContext = createContext();

export function NoteContextFun(props) {
  // Use "props" instead of "{ Children }"
  const data = [
    {
      "_id": "659e73c832ab79f6571bfe2f",
      "user": "6595588546aef1207535a67a",
      "title": "i want to explore books",
      "description": "for this i need to read more",
      "tag": "General",
      "date": "2024-01-10T10:39:04.687Z",
      "__v": 0
    },
    {
      "_id": "659e958a8dce9969f854148c",
      "user": "6595588546aef1207535a67a",
      "title": "i want to explore books",
      "description": "let see world from new perspective i need to read more",
      "tag": "productive",
      "date": "2024-01-10T13:03:06.610Z",
      "__v": 0
    },
    {
      "_id": "659e96858dce9969f8541493",
      "user": "6595588546aef1207535a67a",
      "title": "soil discovery",
      "description": "today we can use techonology to discover many things",
      "tag": "need of the hour",
      "date": "2024-01-10T13:07:17.210Z",
      "__v": 0
    },
    {
      "_id": "659fc640991a99381001b18b",
      "user": "6595588546aef1207535a67a",
      "title": "soil discovery",
      "description": "today we can use techonology to discover many things",
      "tag": "need of the hour",
      "date": "2024-01-11T10:43:12.506Z",
      "__v": 0
    }
  ]
  const [notes,setnotes] = useState(data)
  return (
    <noteContext.Provider value={{notes,setnotes}}>{props.children}</noteContext.Provider>
    );
}

export function UserNotes() {
  return useContext(noteContext);
}
