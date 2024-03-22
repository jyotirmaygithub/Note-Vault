import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alerts";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyStyledTextField from "../components/MyStyledTextField";
import { UserNotes } from "../Context/NoteContext"
import { UserNameContext } from "../Context/UserNameContext";
import Circleprogress from "../components/circleprogress"

export default function Login() {
  const [loader,setLoader] = useState(false)
  const {fetchAllNotes} = UserNotes()
  const {handleExistingUsername} = UserNameContext()

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
          NoteVault {" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const defaultTheme = createTheme();
  const [combinedState, setCombinedState] = useState({
    email: "",
    password: "",
  });
  const [alertState, setAlertState] = useState(false);
  const [details, setDetails] = useState({ type: "", message: "" });
  const Navigation = useNavigate();

  function alertRemoval() {
    setTimeout(() => {
      setAlertState(false);
    }, 1500);
  }

  function handleSubmit(event){
    event.preventDefault();
    handleExistingUser(combinedState.email, combinedState.password);
  };

  function onchange(e) {
    setCombinedState({ ...combinedState, [e.target.name]: e.target.value });
  }
  function handleClick(){
    setTimeout(() => {
        Navigation(`/signup`)      
    }, 100);
  }

  // API call : existing user log in.
  async function handleExistingUser(email, password) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        setAlertState(true);
        setDetails({ type: "error", message: "Invalid Username or Password!" });
        alertRemoval();
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setLoader(true)
      const userAuth_Token = await response.json();

      if (userAuth_Token && userAuth_Token.auth_token) {
        // Set the cookie with an expiration time
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); // Set to expire in 7 days
        document.cookie = `auth_token=${
          userAuth_Token.auth_token
        }; expires=${expirationDate.toUTCString()}; path=/`;

        setDetails({ type: "success", message: "Welcome Back!" });
        setAlertState(true);
        alertRemoval();
        handleExistingUsername()
        const result = await fetchAllNotes()
        setTimeout(() => {
          if(result.length === 0){
            Navigation(`/create-notes`);
          }
          else{
            Navigation(`/fetchingdata`);
          }
        }, 2500);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="h-[50px] mt-1">
        {alertState && <Alert type={details.type} message={details.message} />}
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "black" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <MyStyledTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={onchange}
              autoFocus
            />
            <MyStyledTextField
            className="text-black"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onchange}
            />
            <Button
            className="bg-black"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loader ? (<Circleprogress/>) : (<p className="mb-0">LOG IN</p>)}
            </Button>
            <Grid container className="text-black cursor-pointer underline">
              <Grid item onClick={handleClick}>
                "Don't have an account? Sign Up
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
