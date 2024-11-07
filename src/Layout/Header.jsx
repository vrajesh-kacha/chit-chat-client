import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Container,
  Modal,
  TextField,Button,Snackbar,
 
} from "@mui/material";
import SnackbarContent from "@mui/material/SnackbarContent";
import AdbIcon from "@mui/icons-material/Adb";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
 const [anchorElUser,setAnchorElUser] = useState(null);
 const [open,setOpen] = useState(false);
 const [notify, setNotify] = useState({isOpen:false,color:"",message:""}); 
 const [profileData, setProfileData] = useState({
  username: '',
  password: '',
  image:''
});
const navigate=useNavigate()

  const handleUserMenu = (e) => {
   setAnchorElUser(e.target)
   if(anchorElUser) {
    setAnchorElUser(null)
  };

  }
  const handleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("image");

    navigate("/");
  }

    
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = async() => {
     try {
        const {data} = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/updateprofile`, 
          {
            username: profileData.username ?profileData.username.trim():"",
            password: profileData.password? profileData.password.trim():"",
            image: profileData.image? profileData.image:"" 
            
          },{
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
   if(data.success){
      localStorage.setItem("user",JSON.stringify(data.username)); 
      setOpen(false)
      setNotify({isOpen:true,color:"green",message:"Profile updated successfully"});
    };
  }
  catch (error) {
     setNotify({isOpen:false,color:"red",message:error.response.data.message});
  }
  }
  return (
    <>
    <AppBar position="static">
      <Container maxWidth="xl">
        
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

        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              mr: 2,
            }}
          >
            <AdbIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
             
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Box>

       
      

         
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <AdbIcon sx={{ mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Box>

     
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={localStorage.getItem("image")}/>
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleUserMenu}
            >
                <MenuItem key="Profile" onClick={()=>setOpen(true)}>
                  <Typography sx={{ textAlign: "center" }}>Profile</Typography>
                </MenuItem>
                <MenuItem key="Logout" onClick={handleLogout}>
                  <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
        <Modal open={open} onClose={()=>{setOpen(false);
        setProfileData({username:"",password:"",image:""})}}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          <Typography variant="h6" component="h2" sx={{ marginBottom: '16px' }}>
            Update Profile
          </Typography>
          <TextField
            fullWidth
            label="username"
            name="username"
            value={profileData.username}
            onChange={handleChange}
            variant="outlined"
            sx={{ marginBottom: '16px' }}
            autoComplete="off"
          />
          <TextField
            fullWidth
            label="password"
            name="password"
            type="password"
            value={profileData.password}
            onChange={handleChange}
            variant="outlined"
            sx={{ marginBottom: '16px' }}
          />
           <Button
      variant="contained"
      component="label"
      sx={{ marginBottom: '10%', marginRight: '20%' }}
      onChange={(e) => setProfileData({...profileData,image:e.target.files[0]})}
    >
      <input type="file" hidden accept="image/*" />
    {profileData.image?profileData.image.name.split(".")[0]:"Update Profile Picture"}
    </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Box>
      </Modal>
      </>
  );
}
export default Header;
