import React, { useState } from "react";
import { UserNotes } from "../Context/NoteContext";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "styled-components";

export default function AddNote() {

  // Function : To take title,description and tag as argument to make a new note.
  const { fetchAllNotes } = UserNotes();
  // create a object in state with name and values. which need to be update on user entered input and then need to pass as arugement in the given function.
  const [note, setnote] = useState({ title: "", description: "", tag: "" });

  function getCookie(cookieName) {
    const cookies = document.cookie;
    const cookieArray = cookies.split("; ");

    for (const cookie of cookieArray) {
      if (cookie.startsWith(`${cookieName}=`)) {
        const cookieValue = cookie.split("=")[1];
        return cookieValue;
      }
    }

    return null;
  }

  // API call : To add note.
  async function handleAddNote(title, description, tag) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/notes/addnote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": getCookie("auth_token"),
          },
          // sending data to the data base to update.
          body: JSON.stringify({ title, description, tag }),
        }
      );
      fetchAllNotes();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    // passing all required arugements
    handleAddNote(note.title, note.description, note.tag);
  }
  function onchange(e) {
    // IMP spread operator : Making shallow copy of the existing note object.
    // Note State mangement : for numbers and string direct mutation of the state is possible and fesible , but for objects and arrays it not as it previous one.
    setnote({ ...note, [e.target.name]: e.target.value });
  }
  // return (
  //   <div>
  //     <Form>
  //       <Form.Group className="mb-3" controlId="title">
  //         <Form.Label>Title</Form.Label>
  //         <Form.Control
  //           type="text"
  //           placeholder="Enter title"
  //           name="title"
  //           onChange={onchange}
  //         />
  //       </Form.Group>
  //       <Form.Group className="mb-3" controlId="description">
  //         <Form.Label>Description</Form.Label>
  //         <Form.Control
  //           type="text"
  //           placeholder="Enter Description"
  //           name="description"
  //           onChange={onchange}
  //         />
  //       </Form.Group>
  //       <Form.Group className="mb-3" controlId="tag">
  //         <Form.Label>Tag</Form.Label>
  //         <Form.Control
  //           type="text"
  //           placeholder="Enter Tag"
  //           name="tag"
  //           onChange={onchange}
  //         />
  //       </Form.Group>
  //       <Button variant="primary" onClick={handleClick} type="submit">
  //         Submit
  //       </Button>
  //     </Form>
  //   </div>
  // );

  return (
    <Container>
      <Typography variant="h6" color="black" component="h2" gutterBottom>
        Create a new note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleClick}>
        <TextField
          onChange={onchange}
          label="Note Title"
          variant="outlined"
          fullWidth
          required

          // error={titleError}
        />

        <TextField
          onChange={onchange}
          label="Details"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          required
        />

        <FormControl>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup onChange={onchange}>
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<ArrowForwardIosIcon />}
        >
          Submit
        </Button>
      </form>

      <br />
    </Container>
  );
}
