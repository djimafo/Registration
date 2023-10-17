import * as React from "react";
import {useState} from 'react';
import { TextField, Button, Container, Box } from '@mui/material';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserService from '../api/UserService';

export default function Registration() {

    const [user , setUser]= useState<{
      id: string;
      firstname: string;
      lastname: string;
      email: string;
      password: string;
    }>({
      id:"",
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    })

    function handleChange(event){
      const value =  event.target.value;
      setUser({ ...user,[event.target.name]: value})

    }

    const [confirmPassword, setConfirmPassword] = useState('')
    const [currentRoute, setCurrentRoute] = React.useState("registration");

    //function passwordMatch():Boolean {return password === confirmPassword;} 

    function isValid(){
      if (user.email === "" || user.firstname==="" || user.password===""|| user.lastname==="" || confirmPassword==="") {
        return false;
      }
      return true;
    };

    function handleSubmit(event) {

     /* if (!passwordMatch()) {
         setState({
          errorOpen: true,
          error: "Passwords don't match"
        });
        */
      event.preventDefault();     
      console.log(user) 
      UserService.saveUser(user).then((response) => {
        console.log(response);})
        .catch((error) => {
          console.log(error)});
  }

  return (
      <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 3,
            borderRadius: 2,
          px: 4,
          py: 6,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  onChange={e => handleChange(e)}
                  value={user.firstname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  autoComplete="family-name"
                  name="lastname"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"             
                  onChange={e => handleChange(e)}
                  value={user.lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  autoComplete="email"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={e => handleChange(e)}
                  value={user.email}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  autoComplete="new-password"
                  name="password"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  onChange={e => handleChange(e)}
                  value={user.password}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  autoComplete="confrim-password"
                  name="confrim-password"
                  required
                  fullWidth
                  id="confrim-password"
                  label="Confrim-Password"
                  onChange={e => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              disabled={!isValid()}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link 
                  href="/authentification" 
                  variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>        
      </>
  )
  
}