import Card from 'react-bootstrap/Card';

export default function ShowNote(props) {
    let {note} = props;
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{note.tag}</Card.Subtitle>
        <Card.Text>
          {note.description}
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}
