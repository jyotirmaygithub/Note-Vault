import Alert from 'react-bootstrap/Alert';

export default function Alerts(props) {
  let { looks,des } = props;
  console.log(looks,des)
  return (
    <>
        <Alert key={looks} variant={looks}>
           {des}
        </Alert>
    </>
  );
}
