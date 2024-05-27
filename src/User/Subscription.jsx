import { Box, Button, TextField, Typography, IconButton, CardActionArea, CardActions } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Components/Header";
import Topbar from "../Components/Topbar";
import "./dashboard_user.css";
import Sidebar from "../Components/Sidebar";
import UserContext from './userContext';
import { ColorModeContext, useMode } from "../theme";
import StartOutlinedIcon from '@mui/icons-material/StartOutlined';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import test from "../Images/test.png";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { tokens } from "../theme";
import axios from "axios";
import subscribe_img from "../Images/subscribe-removebg-preview.png";
// import subscribe_img from "../Images/Subscription.gif";





const Subscription = () => {

    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const colors = tokens(theme.palette.mode);
    // const colorMode = useContext(ColorModeContext);
  
    const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  // const handleFormSubmit = (values) => {
  //   console.log(values);
  // };
 
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
      value: 'Paypal',
      label: 'Paypal',
    },
    {
      value: 'Visa',
      label: 'Visa',
    },
    {
        value: 'Paysera',
        label: 'Paysera',
      },
  ];



  const [open, setOpen] = useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  //   console.log('HandleClick');
  // };

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

  // const { add_patient } = useContext(UserContext);

  const subscribe = (values) => {

    axios.post('http://127.0.0.1:5000/subscribe', {
        user_id: user?.id,
    })
        .then(function (response) {
            setOpen(true);
            console.log('HandleClick');
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



const handleFormSubmit = (values) => {
  // Your form submission logic, for example:
  console.log('Form submitted with values:', values);
  // Set submitting to false when done
};


  return (

    <div className="dash">
    <Sidebar name={user?.name} prenom={user?.prenom} role={user?.role} isSidebar={isSidebar} />
    <main className="content">
      <Topbar setIsSidebar={setIsSidebar} />
    <Box m="20px" setIsSidebar={setIsSidebar} display="flex" flexDirection="column" marginBottom="-3%">
      <Box sx={{marginLeft: "30%"}} flex={1}>
      <Header title="Subscription" subtitle="Pen & Tone provides a one-year (12-month) subscription priced at 15,000.00 (DA)." />

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
        display="grid"
        // flexDirection="column"
        width="50%"
        gap="10%"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          marginBottom: "100px"
        }}
      >
        <TextField
          fullWidth
          required
          // variant="standard"
          type="email"
          label="Email"
          InputLabelProps={{
              shrink: true,
            }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          fullWidth
          required
          select
          // variant="standard"
          type="text"
          label="Credit Card"
          defaultValue=""
          InputLabelProps={{
              shrink: true,
            }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.card}
          name="card"
          error={!!touched.card && !!errors.card}
          helperText={touched.card && errors.card}
          sx={{ gridColumn: "span 4" }}
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
          // variant="standard"
          type="text"
          label="Card Information"
        //   inputProps={{ maxLength: 10 }}
          InputLabelProps={{
              shrink: true,
            }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.info}
          name="info"
          error={!!touched.info && !!errors.info}
          helperText={touched.info && errors.info}
          sx={{ gridColumn: "span 4" }}
        />
      </Box>
      <Box display="flex" justifyContent="start" mt="50px" mb="10%">
        <Button type="submit" variant="contained"
            onClick={() => {
              // handleClick();
              subscribe();
            }}
        size="large">
          <strong>Subscribe</strong>
        </Button>
        {/* <Button variant="text" endIcon={<StartOutlinedIcon />} onClick={() => navigate('/test', { replace: true })}>
          Go To TEST Page
        </Button> */}
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Subscription done successfully"
        action={action}
      />
      
    </form>
  )}
</Formik>
      </Box>
      </Box>
      <img src={subscribe_img} alt="Subscribe" 
      style={{
        maxHeight: '25%',
        maxWidth: '100%',
        marginLeft: '71%',
        // marginTop: '-7%',
      }}
      />
    </main>
    </div>
  );
};

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
// const phoneRegExp = /^(?:(?:(?:\+[1-9]{1,4}[ -]?)|(?:\([0-9]{2,3}\)[ -]?)|(?:[0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4})$/;
// const phoneRegExp = /^\d{10}$/;
const phoneRegExp = /^(\+?\d{1,4}[ -]?)?\(?(0\d{2,3})?\)?[ -]?(\d{3,4})[ -]?(\d{3,4})$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  fName: yup.string().required("required"),
  lName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
  .string()
  .matches(phoneRegExp, "Phone number is not valid")
  .test(
    'is-ten-digits',
    'Phone number must be exactly 10 digits',
    value => {
      // Remove all non-digits and count the length
      const digits = value.replace(/\D/g, '');
      return digits.length === 10;
    }
  )
  .required("required"),
contactG: yup
  .string()
  .matches(phoneRegExp, "Phone number is not valid")
  .test(
    'is-ten-digits',
    'Phone number must be exactly 10 digits',
    value => {
      // Remove all non-digits and count the length
      const digits = value.replace(/\D/g, '');
      return digits.length === 10;
    }
  )
  .required("required"),
  address: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  contact: "",
  address: "",
  fName: "",
  lName: "",
  contactG: "",
};

export default Subscription;