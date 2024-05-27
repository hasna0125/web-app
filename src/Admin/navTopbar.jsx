import { Box, IconButton, useTheme, Button } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import './navTopbar.css';
import logo from "../Images/logo_sidebar.png";
import Avatar from '@mui/material/Avatar';
import UserContext from '../User/userContext';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';




function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  
  // function stringAvatar(name) {
  //   return {
  //     sx: {
  //       bgcolor: stringToColor(name),
  //     },
  //     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  //   };
  // }
  function stringAvatar(name) {
    if (typeof name !== 'string') {
      console.error('Invalid input: name is not a string');
      return {
        sx: {
          bgcolor: '#000',  // Default color in case of an error
        },
        children: '??',    // Default children in case of an error
      };
    }
  
    const nameParts = name.split(' ');
  
    // Check if there are at least two parts
    if (nameParts.length < 2) {
      console.error('Invalid input: name does not contain at least two words');
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${nameParts[0][0]}`, // Default second initial if only one word
      };
    }
  
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${nameParts[0][0]}${nameParts[1][0]}`,
    };
  }



const NavTopbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    // display="flex"; justifyContent="space-between" p={2}




    const { user, updateUser } = useContext(UserContext);

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser && !user) {
        const userData = JSON.parse(storedUser);
        updateUser(userData);
      }
    }, [updateUser, user]);
    
    const name = user?.name; // Using optional chaining here
    console.log("name: " + name);


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const navigate = useNavigate();
    const { logout } = useContext(UserContext);
    const [isLoggedin, setIsLoggedin] = useState(true);
    const handleLogout = () => {
      // logout();
      navigate('/main', {replace: true}); // assuming your login route is '/login'
      logout();
    };


    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box width="6.5%" height="3.5%" ml="-30px"><img src={logo} /></Box>
            {/* <Box dispaly="flex" backgroundColor={colors.primary[500]} borderRadius="3px" width="max-content" height="max-content">
                <InputBase sx={{ml: 2, flex: 1 }} placeholder = "Search..."/>
                <IconButton type="button" sx={{p: 1}}><SearchIcon/></IconButton>
            </Box> */}
            <Box dispaly="flex" width="max-content">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "light" 
                        ? (<LightModeOutlinedIcon />)
                        : (<DarkModeOutlinedIcon />)}
                </IconButton>
                <IconButton><NotificationsOutlinedIcon/></IconButton>
                <IconButton><SettingsOutlinedIcon /></IconButton>
                <IconButton 
                                onClick={handleClick}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar style={{
                          display: "flex" ,
                          justifyContent:"center",  
                          alignItems: "center",
                          textAlign: "center",
                    }} {...stringAvatar(name)} />
                </IconButton>
                <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          {/* <LogoutOutlinedIcon />
          Logout*/}
          <Button variant="text" onClick={handleLogout} startIcon={<LogoutOutlinedIcon />}>Log out</Button>
        </MenuItem> 
      </Menu>
            </Box>
        </Box>
    );

};

export default NavTopbar;