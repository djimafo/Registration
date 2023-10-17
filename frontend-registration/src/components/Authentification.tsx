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


export default function Authentification() {
  const [authen , setAuthen] = useState<{
    email: string;
    password: string
  }>({
    email: "",
    password: ""
  })

  function handleChange(event:any){
    const value =  event.target.value;
    setAuthen({ ...authen,[event.target.name]: value})

  }

    function isValid(){
      if (authen.email === "" || authen.password==="") {
        return false;
      }
      return true;
    };

    function handleSubmit(event:any) {

     /* if (!passwordMatch()) {
         setState({
          errorOpen: true,
          error: "Passwords don't match"
        });
        */
      event.preventDefault(); 
      UserService.authUser(authen).then((response) => {
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
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
                  value={authen.email}
                  
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
                  value={authen.password}
                  
                />
              </Grid>              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Remember me"
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
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>        
      </>
  )
  
}