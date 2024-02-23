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
import { UserNameContext } from "../Context/UserNameContext";

export default function SignUp() {
  const defaultTheme = createTheme();
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
        NoteVault {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const [combinedState, setCombinedState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [alertState, setAlertState] = useState(false);
  const [details, setDetails] = useState({ type: "", message: "" });
  const Navigation = useNavigate();

  function onchange(e) {
    setCombinedState({ ...combinedState, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await handleCreateUser(
      combinedState.username,
      combinedState.email,
      combinedState.password
    );
  }

  function handleClick(){
    setTimeout(() => {
      Navigation(`/login`)    
    }, 100);
  }

  function alertRemoval() {
    setTimeout(() => {
      setAlertState(false);
    }, 1500);
  }

  async function handleCreateUser(name, email, password) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      )
      if (!response.ok) {
        setAlertState(true);
        alertRemoval();
        setDetails({ type: "error", message: "Invalid Credentials!" });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const userAuth_Token = await response.json();

      if (userAuth_Token && userAuth_Token.auth_token) {
        // Set the cookie with an expiration time
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); // Set to expire in 7 days
        document.cookie = `auth_token=${
          userAuth_Token.auth_token
        }; expires=${expirationDate.toUTCString()}; path=/`;

        setDetails({ type: "success", message: "Account has been successfully created" });
        setAlertState(true);
        alertRemoval();
        handleExistingUsername()
        setTimeout(() => {
          Navigation(`/create-notes`);
        }, 2500);
      }
    } catch (error) {
      console.error("Error creating user:", error);
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MyStyledTextField
                  required
                  fullWidth
                  id="username"
                  label="Username (must be of 4 characters)"
                  name="username"
                  autoComplete="family-name"
                  onChange={onchange}
                />
              </Grid>
              <Grid item xs={12}>
                <MyStyledTextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onchange}
                />
              </Grid>
              <Grid item xs={12}>
                <MyStyledTextField
                  required
                  fullWidth
                  name="password"
                  label="Password (must be of 6 characters)"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={onchange}
                />
              </Grid>
            </Grid>
            <Button
              className="bg-black"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid
              container
              className="text-black cursor-pointer underline flex justify-end"
              onClick={handleClick}

            >
              <Grid item>Already have an account? Log in</Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
