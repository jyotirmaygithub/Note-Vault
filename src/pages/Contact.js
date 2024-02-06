import React from 'react';
import { Typography, Container, Grid, Paper, Button } from '@mui/material';
import MyStyledTextField from '../components/MyStyledTextField';

export default function Contact(){
  return (
    <Container className='mt-4'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
              Have a question, suggestion, or just want to say hello? We'd love to hear from you! Reach out to us using the form below:
            </Typography>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <MyStyledTextField label="Your Name" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MyStyledTextField label="Your Email" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <MyStyledTextField
                    label="Your Message"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" className='bg-black' type="submit">
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
