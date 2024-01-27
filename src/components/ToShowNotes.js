import React, { useState } from "react";
// import Card from "react-bootstrap/Card";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { UserNotes } from "../Context/NoteContext";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { styled } from "@mui/system";
import { yellow, green, pink, blue } from "@mui/material/colors";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

export default function ShowNote(props,{ n }) {
  let { note } = props;
  const { handleDeleteNote, handleEditNote } = UserNotes();
  const [showModal, setShowModal] = useState(false);
  const [noteObjvalue, setNoteObj] = useState({
    title: "",
    description: "",
    tag: "",
  });
  // Note : Instead of making three state , i did it with one only afte passing an object into it.
  const [combinedState, setCombinedState] = useState({
    title: note.title,
    description: note.description,
    tag: note.tag,
  });

  function handleIconClick(){
    setShowModal(true);
  };

  function handleCloseModal(e){
    if (e) {
      e.preventDefault();
    }
    setShowModal(false);
  };

  function handleClick(id) {
    handleEditNote(
      id,
      noteObjvalue.title,
      noteObjvalue.description,
      noteObjvalue.tag
    );
  }
  function onchange(e) {
    setCombinedState({ ...combinedState, [e.target.name]: e.target.value})
    setNoteObj({ ...noteObjvalue, [e.target.name]: e.target.value });
  }

//   return (
//     <Card key={note._id} style={{ width: "18rem" }}>
//       <Card.Body>
//         <Card.Title>{note.title}</Card.Title>
//         <Card.Subtitle className="mb-2 text-muted">{note.tag}</Card.Subtitle>
//         <Card.Text>{note.description}</Card.Text>
//         <div className="flex">
//           {/* from here sending the id of the document which we want to delete from the database */}
//           {/* handledeletenote is a function passing by using usecontex api */}
//           <TrashIcon
//             className="h-5 w-5 cursor-pointer"
//             onClick={() => handleDeleteNote(note._id)}
//           />
//           <PencilSquareIcon
//             className="h-5 w-5 cursor-pointer"
//             onClick={() => handleIconClick(note._id)}
//           />

//           {/* Use EditModal component to update the note */}
//         </div>
//         <Modal show={showModal} onHide={handleCloseModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Note</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group className="mb-3" controlId="title">
//                 <Form.Label>Title</Form.Label>
//                 <Form.Control
//                 value={combinedState.title}
//                   type="text"
//                   placeholder="Enter title"
//                   name="title"
//                   onChange={onchange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="description">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control
//                 value={combinedState.description}
//                   as="textarea"
//                   rows={3}
//                   placeholder="Enter Description"
//                   name="description"
//                   onChange={onchange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="tag">
//                 <Form.Label>Tag</Form.Label>
//                 <Form.Control
//                 value={combinedState.tag}
//                   type="text"
//                   placeholder="Enter Tag"
//                   name="tag"
//                   onChange={onchange}
//                 />
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCloseModal}>
//               Close
//             </Button>
//             <Button
//               variant="primary"
//               onClick={() => {
//                 handleCloseModal();
//                 handleClick(note._id);
//               }}
//             >
//               Click me
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </Card.Body>
//     </Card>
//   );
// }



const StyledCard = styled(Card)({
  // Add any additional styles you need for the Card component
});

const useStyles = (n) => {
  return {
    avatar: {
      backgroundColor: () => {
        if (n.category === "work") {
          return yellow[700];
        }
        if (n.category === "money") {
          return green[500];
        }
        if (n.category === "todos") {
          return pink[500];
        }
        return blue[500];
      },
    },
    // Add any additional styles you need
  };
};

  const classes = useStyles(n);
  return (
    <div>
      <StyledCard elevation={1} className={classes.test}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.tag[0].toUpperCase()}
            </Avatar>
          }
          action={
            <div>
              <IconButton onClick={() => handleDeleteNote(note._id)}>
                <DeleteOutlineOutlined />
              </IconButton>
              <IconButton onClick={() => handleIconClick(note._id)}>
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
            </div>
          }
          title={note.title}
          subheader={note.tag}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.description}
          </Typography>
        </CardContent>
      </StyledCard>
    </div>
  );
}
