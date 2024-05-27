import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavTopbar from "./navTopbar";
import "./dash_admin.css";
import NavSidebar from "./navSidebar";
import NewHeader from "./newHeader";
import UserContext from '../User/userContext';
import { ColorModeContext, useMode } from "../theme";
import StartOutlinedIcon from '@mui/icons-material/StartOutlined';
import MenuItem from '@mui/material/MenuItem';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';


const NewUser = () => {

    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
  
    const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };
 
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



  const currencies = [
    {
      value: 'F',
      label: 'Female',
    },
    {
      value: 'M',
      label: 'Male',
    },
  ];

  const places = [
    {
      value: 'hopital',
      label: 'Hospital',
    },
    {
      value: 'Clinique',
      label: 'Private Clinic',
    },
  ];


  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );




  return (

    <div className="dash">
    <NavSidebar name={user?.name} prenom={user?.prenom} role={user?.role} isSidebar={isSidebar} />
    <main className="content">
      <NavTopbar setIsSidebar={setIsSidebar} />
    <Box m="20px" setIsSidebar={setIsSidebar}>
      <NewHeader title="Add New User" subtitle="Fill the form with the user's information" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              // gap="30px"
              // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                marginBottom: "20px"
              }}
            >
              <TextField
                fullWidth
                required
                // variant="standard"
                type="text"
                label="First Name"
                InputLabelProps={{
                    shrink: true,
                  }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstNameUser}
                name="firstNameUser"
                error={!!touched.firstNameUser && !!errors.firstNameUser}
                helperText={touched.firstNameUser && errors.firstNameUser}
                sx={{ gridColumn: "span 2", marginBottom: "30px" }}
              />
              <TextField
                fullWidth
                required
                // variant="standard"
                type="text"
                label="Last Name"
                InputLabelProps={{
                    shrink: true,
                  }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastNameUser}
                name="lastNameUser"
                error={!!touched.lastNameUser && !!errors.lastNameUser}
                helperText={touched.lastNameUser && errors.lastNameUser}
                sx={{ gridColumn: "span 2", marginBottom: "30px" }}
              />
              <TextField
                fullWidth
                required
                // variant="standard"
                type="date"
                label="Birth Date"
                InputLabelProps={{
                    shrink: true,
                  }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dateUser}
                name="dateUser"
                error={!!touched.dateUser && !!errors.dateUser}
                helperText={touched.dateUser && errors.dateUser}
                sx={{ gridColumn: "span 2", marginBottom: "30px" }}
              />
              <TextField
                fullWidth
                required
                select
                // variant="standard"
                type="text"
                label="Gender"
                defaultValue=""
                InputLabelProps={{
                    shrink: true,
                  }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.genderUser}
                name="genderUser"
                error={!!touched.genderUser && !!errors.genderUser}
                helperText={touched.genderUser && errors.genderUser}
                sx={{ gridColumn: "span 2", marginBottom: "30px" }}
              >
            {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
              </TextField>
              <TextField
                fullWidth
                required
                multiline
                // variant="standard"
                type="text"
                label="Address"
                InputLabelProps={{
                    shrink: true,
                  }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.addressUser}
                name="addressUser"
                error={!!touched.addressUser && !!errors.addressUser}
                helperText={touched.addressUser && errors.addressUser}
                sx={{ gridColumn: "span 4", marginBottom: "30px" }}
              />
              <TextField
                fullWidth
                required
                // variant="standard"
                type="text"
                label="Contact Number"
                InputLabelProps={{
                    shrink: true,
                  }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactUser}
                name="contactUser"
                error={!!touched.contactUser && !!errors.contactUser}
                helperText={touched.contactUser && errors.contactUser}
                sx={{ gridColumn: "span 2", marginBottom: "30px" }}
              />
              <TextField
                fullWidth
                required
                select
                // variant="standard"
                type="text"
                label="Establishment"
                InputLabelProps={{
                    shrink: true,
                  }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.placeUser}
                name="placeUser"
                error={!!touched.placeUser && !!errors.placeUser}
                helperText={touched.placeUser && errors.placeUser}
                sx={{ gridColumn: "span 2", marginBottom: "30px" }}
              >
            {places.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
              </TextField>
              <TextField
                fullWidth
                // variant="standard"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2", marginBottom: "30px" }}
              />
               <TextField
                fullWidth
                // variant="standard"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2", marginBottom: "30px" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="50px" mb="10%">
              <Button type="submit" color="secondary" variant="contained" onClick={handleClick}>
                Create New User
              </Button>
              <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="User created successfully"
              action={action}
            />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
    </main>
    </div>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstNameUser: yup.string().required("required"),
  lastNameUser: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contactUser: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  addressUser: yup.string().required("required"),
});
const initialValues = {
  firstNameUser: "",
  lastNameUser: "",
  // sexe: "",
  email: "",
  contactUser: "",
  addressUser: "",
};

export default NewUser;