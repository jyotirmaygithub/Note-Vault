import Card from 'react-bootstrap/Card';
import { TrashIcon,PencilSquareIcon } from '@heroicons/react/24/outline'
import { UserNotes } from '../Context/NoteContext';


export default function ShowNote(props) {
  const{handleDeleteNote,handleEditNote} = UserNotes();
  let { note } = props;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{note.tag}</Card.Subtitle>
        <Card.Text>
          {note.description}
        </Card.Text>
        <div className='flex'>
          {/* from here sending the id of the document which we want to delete from the database */}
          {/* handledeletenote is a function passing by using usecontex api */}
        <TrashIcon className="h-5 w-5 cursor-pointer"  onClick={()=>handleDeleteNote(note._id)}/>
        <PencilSquareIcon className="h-5 w-5 cursor-pointer" onClick={()=>handleEditNote(note._id)} />
        </div>
      </Card.Body>
    </Card>
  );
}
