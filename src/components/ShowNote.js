import Card from 'react-bootstrap/Card';
import { TrashIcon,PencilSquareIcon } from '@heroicons/react/24/outline'

export default function ShowNote(props) {
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
        <TrashIcon className="h-5 w-5" />
        <PencilSquareIcon className="h-5 w-5" />
        </div>
      </Card.Body>
    </Card>
  );
}
