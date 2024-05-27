import React, { useContext, useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { useTheme, Box, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { tokens, ColorModeContext } from "../theme";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import profile from "../Images/logo_sidebar.png";
import './sidebar.css';
import UserContext from '../User/userContext';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import axios from "axios";
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';



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



const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);



  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        width: "max-content",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};






const Sidebar = ({ name, prenom, role }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dash_User");
  const navigate = useNavigate();
  const profile_ = {
    marginBottom: "25px",
  }
  const items = {
    paddingLeft: isCollapsed ? "inherit" : "10%"
  };

  const { logout } = useContext(UserContext);
  const [isLoggedin, setIsLoggedin] = useState(true);
  const handleLogout = () => {
    // logout();
    navigate('/main', {replace: true}); // assuming your login route is '/login'
    logout();
  };

  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && !user) {
      const userData = JSON.parse(storedUser);
      updateUser(userData);
    }
  }, [updateUser, user]);


  const [istested, setIsTested] = useState(false);

  const use_function = () => {
    console.log('use function ID: ', user?.id);
    axios.post('http://127.0.0.1:5000/use_function', {
      user_id: user?.id,
    })
        .then(function (response) {
            if (response.data.subscribed === true) {
              setIsTested(true);
              // navigate('/test', { replace: false });
            }
            else {
              // navigate('/test', { state: { id, name, prenom }, replace: false });
              alert('You have to subscribe!');
            }
        })
        .catch(function (error) {
            console.log(error, 'error');
            if (error.response && error.response.status === 404) {
                alert('Doctor not found for the given user_id');
            } else {
                alert('Server error. Please try again later.');
            }
        });
  };
  

  useEffect(() => {
    if (user?.id && istested) {
      use_function();
    }
  }, [user?.id, istested]);


  return (
    <Box display="block"
    sx={{
      // "& .pro-sidebar-inner": { background: `${colors.grey[900]} !important`},
      "& .pro-sidebar-inner": { background: `${colors.primary[500]} !important`},
      // , height: "100vh", width: "max-content"
      "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
      "& .pro-inner-item": { padding: "5px 35px 5px 20px !important" },
      "& .pro-inner-item:hover": { color: `${colors.red[300]} !important` },
      "& .pro-menu-item:active": { color: `${colors.green[700]} !important` },
      height: "100vh", 
    }}
  >
    <ProSidebar collapsed={isCollapsed}>
      <Menu iconShape="square">
        <Box display="flex" flexDirection="column" width="100%">
                  {/* LOGO AND MENU ICON */}
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          style={{
            margin: "10px 0 20px 0",
            color: colors.grey[100],
          }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="end"
              alignItems="right"
              // ml="10px"
            >
              <IconButton
                onClick={() => setIsCollapsed(!isCollapsed)}
                sx={{ ml: "5px" }}
              >
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>

        {!isCollapsed && (
          <Box mb="25px"             
            display="flex" 
            flexDirection="column"
            justifyContent="center" 
            alignItems="center" >
            <Avatar style={{
                          display: "flex" ,
                          justifyContent:"center",  
                          alignItems: "center",
                          textAlign: "center",
            }} {...stringAvatar(name)} />
            <Box textAlign="center">
              <Typography
                variant="h3"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                {name + " " + prenom}
              </Typography>
              <Typography variant="h4" color={colors.green[500]}>
                {role}
              </Typography>
            </Box>
          </Box>
        )}
        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          <Item
            title={!isCollapsed ? "Dashboard" : ""}
            to='/dash_user'
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title={!isCollapsed ? "Contact" : ""}
            to='/contacts'
            icon={<ContactsOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          {/* <Item
            title={!isCollapsed ? "Test" : ""}
            to={istested ? '/test' : ''}
            icon={<MedicationOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            // onClick={use_function}
          /> */}
          <Item
            title={!isCollapsed ? "New Patient" : ""}
            to='/new'
            icon={<PersonAddAlt1OutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title={!isCollapsed ? "Subscription" : ""}
            to='/subscribe'
            icon={<CreditCardOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title={!isCollapsed ? "Calendar" : ""}
            to='/calendar'
            icon={<CalendarTodayOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title={!isCollapsed ? "FAQ Page" : ""}
            to='/faq'
            icon={<HelpOutlineOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </Box>
        {!isCollapsed && (
          isLoggedin && (
        <Box mt= "42%" ml="4%" position= "fixed">
          <Button variant="text" onClick={handleLogout} startIcon={<LogoutOutlinedIcon />}>
                Log out
       </Button>
        </Box> ))}
        </Box>
      </Menu>
    </ProSidebar>
  </Box>
  );
};

export default Sidebar;




{/* <Box 
display="flex" 
justifyContent="center"  
alignItems="center" 
textAlign="center"
  p={3} 
  width="60px" 
  height="60px" 
  borderRadius="50%" 
  backgroundColor={colors.yellow[900]}
  color={colors.grey[100]}
  fontWeight="bold"
  fontSize="50px">
  {/* <img
    alt="profile-user"
    width="220px"
    height="140px"
    src={profile}
    style={{ cursor: "pointer", borderRadius: "50%" }}
  /> 
  {name[0]}
</Box> */}