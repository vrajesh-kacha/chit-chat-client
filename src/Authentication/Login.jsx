import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography,Snackbar } from '@mui/material';
import SnackbarContent from '@mui/material/SnackbarContent';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [notify, setNotify] = useState({isOpen:false,color:"",message:""}); 
  const navigate = useNavigate();

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

    if (!formValues.password) {
      errors.password = 'Password is required';
    } 

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async(e) => { 
    e.preventDefault();
    try {
    if (validateForm()) {

      const {data}=await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/login`,{
        email:formValues.email.trim(),
        password:formValues.password.trim(),
      })
         
      if(data.success){
        localStorage.setItem('token',data.token);
        localStorage.setItem('user',JSON.stringify(data.username));
        localStorage.setItem('image',JSON.stringify(data.image));
        setTimeout(() => navigate('/chat'), 2500);
      }

    }
  } catch (error) {
    setNotify({isOpen:true,color:"red",message:error.response.data.message});
  }
  };

  return (
    <>
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
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
          autoComplete="off"
            label="Email"
            type="text"
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
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type="submit">
            Login
          </Button>
        </form>
        <Typography variant="h6" gutterBottom>
        Don't have an account? <Link to="/register">register</Link>
        </Typography>
      </Box>
    </Container>
    </>
  );
};

export default Login;