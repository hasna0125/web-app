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





const New = () => {

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
      value: 'Feminin',
      label: 'Female',
    },
    {
      value: 'Masculin',
      label: 'Male',
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
  const [isSaved, setIsSaved] = useState(false)

  const addPatient = (values) => {
    const patientData = {
      user_id: user?.id,
      nom_patient: values.firstName,
      prenom_patient: values.lastName,
      date_naissance: values.date,
      adresse: values.address,
      sexe: values.gender,
      phoneNumber: values.contact,
      nom_de_tuteur_du_patient: values.fName,
      prenom_de_tuteur_du_patient: values.lName,
      nemure_telephone_de_tuteur_du_patient: values.contactG,
    };
    console.log('values.date: ', values.date);
    console.log('Sending Patient data:', patientData);  // Debug print

    axios.post('http://127.0.0.1:5000/add_patient', patientData)
        .then(function (response) {
            console.log("Response Patient: ", response);
            console.log("Patient_Name: ", response.data.fname);
            setOpen(true);
            // setIsSaved(true);
            console.log('HandleClick');
            // navigate("/dash_user", {replace: true, state: {
            //     firstName: response.data.fname,
            //     lastName: response.data.lname,
            //     date: response.data.DateN,
            //     addresse: response.data.adress,
            //     gender: response.data.gender,
            //     contact: response.data. tlp,
            //     fname: response.data.name_g,
            //     lname: response.data.pre_g,
            //     contactG: response.data.tlp_g,
            // }});
            // const patientData = {
            //     firstName: response.data.created_patient.fname,
            //     lastName: response.data.created_patient.lname,
            //     date: response.data.created_patient.DateN,
            //     addresse: response.data.created_patient.adress,
            //     gender: response.data.created_patient.gender,
            //     contact: response.data.created_patient.tlp,
            //     fname: response.data.created_patient.name_g,
            //     lname: response.data.created_patient.pre_g,
            //     contactG: response.data.created_patient.tlp_g,
            // };
            // add_patient(patientData);
            // console.log('PatientName: ', patientData.firstName);
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

const cardClick = (values) => {
  if (isSaved === true) {
    use_function(values);
  } else {
    alert("Patient creation failed");
  }
}


const use_function = (values) => {
  console.log('use function ID: ', user?.id);
  axios.post('http://127.0.0.1:5000/use_function', {
    user_id: user?.id,
  })
      .then(function (response) {
          if (response.data.subscribed === true) {
            navigate('/test', { state: {
              name: values.firstName,
              prenom: values.lastName,
            }, replace: false });
            console.log('new_values: ', values.firstName, values.lastName);
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

const [isSubmitting, setSubmitting] = useState(true)
const handleFormSubmit = (values) => {
  // Check if all required fields are filled
  if (values.firstName && values.lastName && values.date && values.gender && values.address && values.contact) {
    // Your form submission logic if all required fields are filled
    console.log('Form submitted with values:', values);
    // Set submitting to false when done
  } else {
    // If any required field is empty, display an error message or handle it as needed
    console.error('Please fill all required fields');
  }
};

  return (

    <div className="dash">
    <Sidebar name={user?.name} prenom={user?.prenom} role={user?.role} isSidebar={isSidebar} />
    <main className="content">
      <Topbar setIsSidebar={setIsSidebar} />
    <Box m="20px" setIsSidebar={setIsSidebar} display="flex">
      <Box sx={{marginLeft: "30%"}} flex={1}>
      <Header title="Add New Patient" subtitle="Fill the form with the patient's personal information" />

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
          type="text"
          label="First Name"
          InputLabelProps={{
              shrink: true,
            }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.firstName}
          name="firstName"
          error={!!touched.firstName && !!errors.firstName}
          helperText={touched.firstName && errors.firstName}
          sx={{ gridColumn: "span 2" }}
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
          value={values.lastName}
          name="lastName"
          error={!!touched.lastName && !!errors.lastName}
          helperText={touched.lastName && errors.lastName}
          sx={{ gridColumn: "span 2" }}
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
          value={values.date}
          name="date"
          error={!!touched.date && !!errors.date}
          helperText={touched.date && errors.date}
          sx={{ gridColumn: "span 2" }}
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
          value={values.gender}
          name="gender"
          error={!!touched.gender && !!errors.gender}
          helperText={touched.gender && errors.gender}
          sx={{ gridColumn: "span 2" }}
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
          value={values.address}
          name="address"
          error={!!touched.address && !!errors.address}
          helperText={touched.address && errors.address}
          sx={{ gridColumn: "span 4" }}
        />
        {/* <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={{ gridColumn: "span 2" }}
        /> */}
        <TextField
          fullWidth
          required
          // variant="standard"
          type="text"
          label="Contact Number"
          inputProps={{ maxLength: 10 }}
          InputLabelProps={{
              shrink: true,
            }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.contact}
          name="contact"
          error={!!touched.contact && !!errors.contact}
          helperText={touched.contact && errors.contact}
          sx={{ gridColumn: "span 2" }}
        />
        {/* ---------------------------------------------------------------- */}
        {/* <TextField
          fullWidth
          required
          // variant="standard"
          type="date"
          label="Diagnosis Date"
          InputLabelProps={{
              shrink: true,
            }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.dateD}
          name="dateD"
          error={!!touched.dateD && !!errors.dateD}
          helperText={touched.dateD && errors.dateD}
          sx={{ gridColumn: "span 2" }}
        /> */}
        {/* ---------------------------------------------------------------- */}
      </Box>
        <Header title="Guardian Information" subtitle="Fill the form with the guardian's personal information" />
        <Box
        display="grid"
        width="50%"
        gap="10%"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          // marginBottom: "20px"
        }}
      >
        <TextField
          fullWidth
          // required
          // variant="standard"
          type="text"
          label="First Name"
          InputLabelProps={{
              shrink: true,
            }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.fName}
          name="fName"
          error={!!touched.fName && !!errors.fName}
          helperText={touched.fName && errors.fName}
          sx={{ gridColumn: "span 2", marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          // required
          // variant="standard"
          type="text"
          label="Last Name"
          InputLabelProps={{
              shrink: true,
            }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.lName}
          name="lName"
          error={!!touched.lName && !!errors.lName}
          helperText={touched.lName && errors.lName}
          sx={{ gridColumn: "span 2", marginBottom: "10px" }}
        />
        {/* ---------------------------------------------------------------- */}
        {/* <TextField
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
          value={values.genderG}
          name="genderG"
          error={!!touched.genderG && !!errors.genderG}
          helperText={touched.genderG && errors.genderG}
          sx={{ gridColumn: "span 2" }}
        >
      {currencies.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
        </TextField> */}
        {/* ---------------------------------------------------------------- */}
        <TextField
          fullWidth
          // required
          // variant="standard"
          type="text"
          label="Contact Number"
          inputProps={{ maxLength: 10 }}
          InputLabelProps={{
              shrink: true,
            }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.contactG}
          name="contactG"
          error={!!touched.contactG && !!errors.contactG}
          helperText={touched.contactG && errors.contactG}
          sx={{ gridColumn: "span 2" }}
        />
      </Box>
      <Box display="flex" justifyContent="start" mt="50px" mb="10%">
        <Button type="submit" variant="contained"
            onClick={() => {
              // handleClick();
              addPatient(values);
              setIsSaved(true);
            }}
        size="large">
          <strong>Save</strong>
        </Button>
        {/* <Button variant="text" endIcon={<StartOutlinedIcon />} onClick={() => navigate('/test', { replace: true })}>
          Go To TEST Page
        </Button> */}
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Patient created successfully"
        action={action}
      />
      <Card sx={{ maxWidth: 300, mt: "-68%", ml:"75%", mr:"20px", maxHeight: 730 }} 
      onClick={() => cardClick(values, isSaved)}>
      <CardActionArea sx={{display: "flex", flexDirection: "column"}}>
      <Box mt="20px"></Box>
        <CardMedia
          component="img"
          height="200px"
          image={test}
          alt="green iguana"
        />
        {/* <Box mt="200px"></Box> */}
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            <strong>Pen & Tone: Revolutionizing Early Detection of Parkinson's Disease! </strong>
          </Typography>
          <Typography variant="h5">
          At Pen & Tone, we're proud to offer a cutting-edge platform that makes early detection of Parkinson's disease simple and effective. Help your patients take control of their health with just two easy tests: Handwriting and Speech. By identifying early symptoms, we empower individuals to get timely treatment and fight this condition head-on. Discover the future of diagnosis with Pen & Tone – where simplicity meets innovation! 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" endIcon={<StartOutlinedIcon />} onClick={() => cardClick(values, isSaved)}>
        Go To TEST Page
        </Button>
      </CardActions>
    </Card>
    </form>
  )}
</Formik>
      </Box>
      {/* <Card sx={{ maxWidth: 300, flex: "1", mt: "-20px", mr:"20px", maxHeight: 730 }} onClick={() => navigate('/test', { replace: true })}>
      <CardActionArea sx={{display: "flex", flexDirection: "column"}}>
      <Box mt="20px"></Box>
        <CardMedia
          component="img"
          height="200px"
          image={test}
          alt="green iguana"
        />
        
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            <strong>Pen & Tone: Revolutionizing Early Detection of Parkinson's Disease! </strong>
          </Typography>
          <Typography variant="h5">
          At Pen & Tone, we're proud to offer a cutting-edge platform that makes early detection of Parkinson's disease simple and effective. Help your patients take control of their health with just two easy tests: Handwriting and Speech. By identifying early symptoms, we empower individuals to get timely treatment and fight this condition head-on. Discover the future of diagnosis with Pen & Tone – where simplicity meets innovation! 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" endIcon={<StartOutlinedIcon />} onClick={use_function}>
        Go To TEST Page
        </Button>
      </CardActions>
    </Card> */}
    </Box>
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
  fName: yup.string(),
  lName: yup.string(),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
  .string()
  .matches(phoneRegExp, "Phone number is not valid")
  .test(
    'is-ten-digits',
    'Phone number must be exactly 10 digits',
    valeur => {
      // Check if valeur is defined and is a string
      if (typeof valeur !== 'string') {
        return false; // Not a string, validation fails
      }
      
      // Remove all non-digits and count the length
      const digits = valeur.replace(/\D/g, '');
      return digits.length === 10;
    }
  )
  .required("required"),
  contactG: yup.string()
  .matches(phoneRegExp, "Phone number is not valid")
  .nullable()
  .test(
    'is-ten-digits',
    'Phone number must be exactly 10 digits',
    value => {
      // If value is empty, validation passes
      if (!value) {
        return true;
      }
      // Check if value is a 10-digit number
      const digits = value.replace(/\D/g, '');
      return digits.length === 10;
    }
  ),
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

export default New;

// .test(
//   'is-ten-digits',
//   'Phone number must be exactly 10 digits',
//   valeur => {
//     // Remove all non-digits and count the length
//     const digits = valeur.replace(/\D/g, '');
//     return digits.length === 10;
//   }
// )