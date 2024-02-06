import React from 'react';
import { Typography, Container, Grid, Paper } from '@mui/material';

export default function AboutUs(){
  return (
    <Container className='mt-4'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
              About Us: Empowering Your Ideas, Preserving Your Thoughts
            </Typography>
            <Typography variant="body1" paragraph>
              Welcome to NoteVault, where innovation meets simplicity! At NoteVault, we believe in the power of ideas and the importance of preserving your thoughts. Our mission is to provide you with a secure and user-friendly platform to capture and organize your notes effortlessly.
            </Typography>
            <Typography variant="h5" gutterBottom>
              Why NoteVault?
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Seamless Notekeeping:</strong> NoteVault is your digital sanctuary for all things noteworthy. Whether it's project details, creative inspirations, or important reminders, our platform ensures that your thoughts are captured and organized with ease.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Secure and Private:</strong> Your ideas are valuable, and we prioritize the security and privacy of your notes. With cutting-edge encryption and robust security measures, NoteVault safeguards your information, allowing you to focus on what matters most—your creativity.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Intuitive Design:</strong> We understand the importance of a user-friendly experience. NoteVault boasts an intuitive design, making it easy for you to navigate and access your notes whenever and wherever inspiration strikes.
            </Typography>
            <Typography variant="h5" gutterBottom>
              Our Vision: Transforming Note-Taking Into an Art
            </Typography>
            <Typography variant="body1" paragraph>
              At NoteVault, we envision a world where note-taking is not just a task but an art form. We aspire to empower individuals, teams, and creators by providing a platform that enhances productivity and sparks creativity.
            </Typography>
            <Typography variant="h5" gutterBottom>
              Join the NoteVault Community
            </Typography>
            <Typography variant="body1" paragraph>
              Become a part of the NoteVault community and embark on a journey where your ideas are valued, and your notes become a source of inspiration. Whether you're a student, professional, or creative mind, NoteVault is here to amplify your note-taking experience.
            </Typography>
            <Typography variant="body1" paragraph>
              Thank you for choosing NoteVault—a place where your thoughts find a home, and your ideas flourish.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

