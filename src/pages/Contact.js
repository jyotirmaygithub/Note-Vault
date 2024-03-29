import React, { useState } from "react";
import { Typography, Container, Grid, Paper, Button } from "@mui/material";
import MyStyledTextField from "../components/MyStyledTextField";
import { FeedbackContext } from "../Context/ReviewContext";
import Alert from "../components/Alerts";
// import Alert from '@mui/material/Alert';


export default function Contact() {
  const { handleComment } = FeedbackContext();
  const [review, setReview] = useState({ title: "", message: "" });
  const [alertState, setAlertState] = useState(false);
  const [details, setDetails] = useState({ type: "", message: "" });

  function alertRemoval() {
    setTimeout(() => {
      setAlertState(false);
    }, 1500);
  }


  function handleClick(e) {
    e.preventDefault()
    setAlertState(true)
    setDetails({ type: "success", message: "Message Submitted." });
    alertRemoval()
    handleComment(review.title, review.message);
  }

  function onchange(e) {
    setReview({ ...review, [e.target.name]: e.target.value });
  }
  return (
    <>
    <div className="h-[50px] mt-1">
        {alertState && <Alert type={details.type} message={details.message} />}
      </div>
      <Container className="mt-4">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h4" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body1" paragraph>
                Have a question, suggestion, or just want to say hello? We'd
                love to hear from you! Reach out to us using the form below:
              </Typography>
              <form onSubmit={handleClick}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <MyStyledTextField
                      label="Review Title"
                      variant="outlined"
                      name="title"
                      onChange={onchange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MyStyledTextField
                      label="Your Message"
                      multiline
                      rows={4}
                      variant="outlined"
                      name="message"
                      onChange={onchange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      className="bg-black"
                      type="submit"
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
