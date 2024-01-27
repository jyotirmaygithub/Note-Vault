import styled from 'styled-components';
import TextField from '@mui/material/TextField';

const MyStyledTextField = styled(TextField)`
  & label.Mui-focused {
    color: black; 
  }
  & .MuiInputBase-input.Mui-focused {
    color: black; 
  }
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: black; 
  }
`;

export default MyStyledTextField;
