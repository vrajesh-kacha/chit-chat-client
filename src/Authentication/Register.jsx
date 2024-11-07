import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography,Snackbar} from '@mui/material';
import SnackbarContent from '@mui/material/SnackbarContent';
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"

const Register = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' ,username: '',image:"" });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' ,username: '' });
  const [notify, setNotify] = useState({isOpen:false,color:"",message:""}); 
  const navigate=useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setFormErrors({"email":"" ,
    "password":"" });
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.email) {
      errors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
.test(formValues.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formValues.username) {
        errors.username = 'username is required';
      }

    if (!formValues.password) {
      errors.password = 'Password is required';
    } 

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async(e) => { 
    e.preventDefault();
    try{
    if (validateForm()) {
      const {data}=await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/register`,{...formValues},{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if(data.success)
      {
        setNotify({isOpen:true,color:"green",message:"You have successfully registered"});
        setTimeout(() => navigate('/'), 2500);
      }
    
    }
    }
    catch(error) {
      console.log(error);

       setNotify({isOpen:true,color:"red",message:error.response.data.message});
    }
  }


  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
     <Snackbar
  open={notify.isOpen}
  onClose={() => setNotify({ isOpen: false, color: '', message: '' })}
  autoHideDuration={2000}
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'center',
  }}
>
  <SnackbarContent
    message={notify.message}
    sx={{ backgroundColor: notify.color }}
  />
</Snackbar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 3,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>

        <TextField
            label="username"
            type="Text"
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(formErrors.username)}
            helperText={formErrors.username}
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
           autoComplete="off"
            
          />
          <TextField
            label="Email"
            type="text"
            autoComplete="off"
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            
          />
      <Button
      variant="contained"
      component="label"
      onChange={(e) => setFormValues({...formValues,image:e.target.files[0]})}
    >
      <input type="file" hidden accept="image/*" />
    {formValues.image?formValues.image.name.split(".")[0]:"Profile Picture"}
    </Button>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type="submit">
            Sign Up
          </Button>
        </form>
        <Typography variant="h6" gutterBottom>
        Already have an account? <Link to="/">Login</Link>
        </Typography>
      </Box>
      
    </Container>
  );
};

export default Register;