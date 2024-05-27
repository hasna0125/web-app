import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Components/Header";
import Topbar from "../Components/Topbar";
import "./dashboard_user.css";
import Sidebar from "../Components/Sidebar";
import UserContext from "./userContext";
import { tokens } from "../theme";
import { ColorModeContext, useMode } from "../theme";
import StartOutlinedIcon from "@mui/icons-material/StartOutlined";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import image1 from "../Images/spi.png";
import image2 from "../Images/mea.png";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import ReactRecorder from "../Components/reactRecorder";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { blue } from "@mui/material/colors";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import axios from "axios";
import LinearProgress from '@mui/material/LinearProgress';

const forms = ["Spiral", "Meander"];
const langs = ["Arabic", "English", "French"];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "600px",
    height: "200px",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        // width: "500px",
        padding: "2%",
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        Choose the form
      </DialogTitle>
      <List sx={{ pt: 0 }}>
        {forms.map((item) => (
          <ListItem disableGutters key={item}>
            <ListItemButton onClick={() => handleListItemClick(item)}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function SimpleDialogText(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        // width: "500px",
        padding: "2%",
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        Choose the form
      </DialogTitle>
      <List sx={{ pt: 0 }}>
        {langs.map((leng) => (
          <ListItem disableGutters key={leng}>
            <ListItemButton onClick={() => handleListItemClick(leng)}>
              <ListItemText primary={leng} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialogText.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const Test = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const themes = useTheme();
  const colors = tokens(themes.palette.mode);

  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !user) {
      const userData = JSON.parse(storedUser);
      updateUser(userData);
    }
  }, [updateUser, user]);

  const name = user?.name; // Using optional chaining here
  console.log("name: " + name);

  const currencies = [
    {
      value: "S",
      label: "Spiral",
    },
    {
      value: "M",
      label: "Meander",
    },
  ];

  const languages = [
    {
      value: "A",
      label: "Arabic",
    },
    {
      value: "E",
      label: "English",
    },
    {
      value: "F",
      label: "French",
    },
  ];

  // const location = useLocation();
  // const previousRowData = location.state || {};
  // // const [value, setValue] = useState({ firstName: "", ...previousRowData });

  // const [value, setValue] = useState({ firstName: "", lastName: "", ...previousRowData });

  // // useEffect(() => {
  // //   if (previousRowData.name) {
  // //     setValue((prevValues) => ({
  // //       ...prevValues,
  // //       firstName: previousRowData.prenom,
  // //       lastName: previousRowData.name, // Pre-fill with previous row data
  // //     }));
  // //   }
  // // }, [previousRowData]);
  // console.log(
  //   "previousRowData_name_prenom",
  //   previousRowData.name,
  //   previousRowData.prenom
  // );

  // useEffect(() => {
  //   if (previousRowData && Object.keys(previousRowData).length > 0) {
  //     setValue((prevValues) => {
  //       const updatedValues = {
  //         ...prevValues,
  //         firstName: previousRowData.name || prevValues.firstName,
  //         lastName: previousRowData.prenom || prevValues.lastName,
  //       };
  //       console.log("Updated values:", updatedValues);
  //       return updatedValues;
  //     });
  //   }
  // }, [previousRowData]);

  // const handleChangeName = (e) => {
  //   setValue({ ...value, [e.target.name]: e.target.value });
  // };


  // const location = useLocation();
  // const previousRowData = location.state || {};
  
  // // Initialize state with previousRowData
  // const [value, setValue] = useState({ firstName: "", lastName: "", ...previousRowData });
  // console.log("previousRowData: ", previousRowData.name, previousRowData.prenom);
  // useEffect(() => {
  //   if (previousRowData && Object.keys(previousRowData).length > 0) {
  //     setValue((prevValues) => ({
  //       ...prevValues,
  //       firstName: previousRowData.name || prevValues.firstName,
  //       lastName: previousRowData.prenom || prevValues.lastName,
  //     }));
  //   }
  // }, [previousRowData]);
  
  // const handleChangeName = (e) => {
  //   setValue({ ...value, [e.target.name]: e.target.value });
  // };
  
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setValue((prevValues) => ({
  //     ...prevValues,
  //     [name]: value,
  //   }));
  // };


  // const location = useLocation();
  // const previousRowData = location.state || {};

  // const [value, setValue] = useState({
  //   firstName: previousRowData.name || "",
  //   lastName: previousRowData.prenom || "",
  // });

  const location = useLocation();
  const previousRowData = location.state || {};
  console.log('previousRowData.name: ', previousRowData.name);
  // const initialValues = {
  //   firstName: previousRowData.name || "",
  //   lastName: previousRowData.prenom || "",
  // };

  // const [value, setValue] = useState(initialValues);
  const initialValues = {
    firstName: previousRowData.name || "",
    lastName: previousRowData.prenom || "",
  };
  console.log('initialValues.name: ', initialValues.firstName)

  const [formValue, setFormValue] = useState("");
  const [textValue, setTextValue] = useState("");

  const handleChangeSelect = (event) => {
    setFormValue(event.target.value);
  };
  const handleChangeText = (event) => {
    setTextValue(event.target.value);
  };
  // ----------------------------------------------------------------

  const [openD, setOpenD] = React.useState(false);

  const handleClickOpenD = () => {
    setOpenD(true);
  };
  const handleCloseD = () => {
    setOpenD(false);
  };

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const [openL, setOpenL] = React.useState(false);
  const [selectedLang, setSelectedLang] = React.useState("");

  const handleClickOpenL = () => {
    setOpenL(true);
  };

  const handleCloseL = (value) => {
    setOpenL(false);
    setSelectedLang(value);
  };

  // -----------------------------------------------------

  const [result, setRes] = useState("");
  const [average, setAvg] = useState("");
  const [image, setImage] = useState(null);
  const [record, setRecord] = useState(null);
  const [fileName, setFileName] = useState("No Selected Image");
  const [recordFileName, setRecordFileName] = useState("No Selected Record");
  const [loading, setLoading] = useState(false);

  // const test = async (values) => {
  //     const formData = new FormData();
  //     formData.append(
  //       "data",
  //       JSON.stringify({
  //         user_id: user?.id,
  //         nom_patient: values.firstName,
  //         prenom_patient: values.lastName,
  //       })
  //     );
  //     formData.append("file", record);
  //     formData.append("file1", image);
  
  //     console.log(
  //       "Sending payload data:",
  //       JSON.stringify({
  //         user_id: user?.id,
  //         nom_patient: values.firstName,
  //         prenom_patient: values.lastName,
  //       })
  //     );
  //     console.log("Sending payload image:", image);
  //     console.log("Sending payload record:", record);
  
  //     axios.post("http://127.0.0.1:5000/test/patient_tested", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then(function (response) {
  //         if (
  //           response.data.result === "Healthy" || response.data.result === "Patient") 
  //           {
  //           setRes(response.data.result);
  //           setAvg(response.data.average);
  //         } else {
  //           setRes("No result");
  //           setAvg("???");
  //         }
  //         handleClickOpenD();
  //       })
  //       .catch(function (error) {
  //         console.log(error, "error");
  //         if (error.response && error.response.status === 404) {
  //           alert("Doctor not found for the given user_id");
  //         } else {
  //           alert("Server error. Please try again later.");
  //         }
  //       });
  // };

  const test = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        user_id: user?.id,
        nom_patient: values.firstName,
        prenom_patient: values.lastName,
      })
    );
    formData.append("file", record);
    formData.append("file1", image);

    console.log(
      "Sending payload data:",
      JSON.stringify({
        user_id: user?.id,
        nom_patient: values.firstName,
        prenom_patient: values.lastName,
      })
    );
    console.log("Sending payload image:", image);
    console.log("Sending payload record:", record);

    try {
      const response = await axios.post("http://127.0.0.1:5000/test/patient_tested", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.result === "Healthy" || response.data.result === "Patient") {
        setRes(response.data.result);
        setAvg(response.data.average);
      } else {
        setRes("No result");
        setAvg("???");
      }
      handleClickOpenD();
    } catch (error) {
      console.log(error, "error");
      if (error.response && error.response.status === 404) {
        alert("Doctor not found for the given user_id");
      } else {
        alert("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  // ----------------------------------------------------

  return (
    <div className="dash">
      <Sidebar
        name={user?.name}
        prenom={user?.prenom}
        role={user?.role}
        isSidebar={isSidebar}
      />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px" setIsSidebar={setIsSidebar}>
          <Header
            title="Parkinson's Detection Tools"
            subtitle="Please complete the form with the patient's medical information, including both handwritten and spoken inputs, to facilitate the detection of Parkinson's disease"
          />
          <Formik
            onSubmit={test}
            // initialValues={initialValues}
            initialValues={initialValues}
            // validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} action="">
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 2",
                    },
                    marginBottom: "40px",
                  }}
                >
                  <TextField
                    fullWidth
                    required
                    type="text"
                    label="First Name"
                    InputLabelProps={{ shrink: true }}
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
                    type="text"
                    label="Last Name"
                    InputLabelProps={{ shrink: true }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={!!touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box flex={1} mr="5%">
                    <Card
                      onClick={handleClickOpen}
                      sx={{
                        p: 2,
                        backgroundColor: colors.primary[500],
                        color: colors.grey[100],
                        borderRadius: "10px",
                        boxShadow: `0px 20px 20px -20px ${colors.grey[600]}`,
                      }}
                    >
                      <CardActionArea>
                        <CardContent>
                          <Typography
                            variant="h3"
                            style={{ marginBottom: "10px" }}
                          >
                            <strong>Handwriting Test</strong>
                          </Typography>
                          <Typography variant="h6">
                            Choose either the <strong>Spiral</strong> or{" "}
                            <strong>Meander</strong> form and have the patient
                            draw it on paper. Then, scan the completed form and
                            upload the scanned image to the platform to complete
                            the handwriting test.{" "}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                    <SimpleDialog
                      selectedValue={selectedValue}
                      open={open}
                      onClose={handleClose}
                    />
                    <Box dispaly="flex" flexDirection="column" mt="5%">
                      {selectedValue === "Spiral" && (
                        <img src={image1} alt="S image" className="form" />
                      )}
                      {selectedValue === "Meander" && (
                        <img src={image2} alt="M image" className="form" />
                      )}
                      <div
                        onClick={() =>
                          document.querySelector(".input-field").click()
                        }
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          border: `2px dashed red`,
                          height: "310px",
                          width: "400px",
                          cursor: "pointer",
                          borderRadius: "5px",
                          float: "left",
                          marginLeft: "26%",
                          marginTop: "5%",
                        }}
                      >
                        <input
                          type="file"
                          name="file"
                          accept="image/*"
                          className="input-field"
                          hidden
                          onChange={({ target: { files } }) => {
                            files[0] && setFileName(files[0].name);
                            if (files) {
                              setImage(files[0]);
                            }
                          }}
                        />
                        {image ? (
                          <img
                            src={URL.createObjectURL(image)}
                            width={300}
                            height={300}
                            alt={fileName}
                          />
                        ) : (
                          <>
                            <MdCloudUpload color="#54BBE7" size={60} />
                            <p>Browse Images to upload</p>
                          </>
                        )}
                      </div>
                    </Box>
                  </Box>
                  <Box flex={1}>
                    <Card
                      onClick={handleClickOpenL}
                      sx={{
                        p: 2,
                        backgroundColor: colors.primary[500],
                        color: colors.grey[100],
                        borderRadius: "10px",
                        boxShadow: `0px 20px 20px -20px ${colors.grey[600]}`,
                      }}
                    >
                      <CardActionArea>
                        <CardContent>
                          <Typography
                            variant="h3"
                            style={{ marginBottom: "10px" }}
                          >
                            <strong>Speech Test</strong>
                          </Typography>
                          <Typography variant="h6">
                            Have the patient record the text in one of the
                            following languages:{" "}
                            <strong>Arabic, French, or English,</strong> using
                            the microphone as indicated below to complete the
                            speech test.{" "}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                    <SimpleDialogText
                      selectedValue={selectedLang}
                      open={openL}
                      onClose={handleCloseL}
                    />
                    <Box dispaly="flex" mt="5%">
                      {selectedLang === "Arabic" && (
                        <p className="text-ar">
                          التفاؤل عبارة عن ميل أو نزوع نحو النظر إلى الجانب
                          الأفضل للأحداث أو الأحوال، وتوقع أفضل النتائج. أو هو
                          وجهة نظر في الحياة والتي تبقي الشخص ينظر إلى العالم كم
                          كان إيجابياً، أو تبقي حالته الشخصية إيجابية، والتفاؤل
                          هو النظير الفلسفي للتشاؤم. المتفائلون عموما يعتقدون
                          بأن الناس والأحداث جيدة أصلاً، وأكثر الحالات تسير في
                          النهاية نحو الأفضل
                        </p>
                      )}
                      {selectedLang === "English" && (
                        <p className="text">
                          Optimism is an attitude reflecting a belief or hope
                          that the outcome of some specific endeavor, or
                          outcomes in general, will be positive, favorable, and
                          desirable. A common idiom used to illustrate optimism
                          versus pessimism is a glass filled with water to the
                          halfway point: an optimist is said to see the glass as
                          half full, while a pessimist sees the glass as half
                          empty
                        </p>
                      )}
                      {selectedLang === "French" && (
                        <p className="text">
                          L’optimisme désigne chez l’être humain un état
                          d’esprit, durable ou passager, caractérisé par une
                          perception positive du monde et de l'univers. Le
                          fondement de l'optimisme moderne remonte à Socrate ;
                          Platon l'a professé, puis Aristote
                        </p>
                      )}

                      <div
                        onClick={() =>
                          document.querySelector(".record-field").click()
                        }
                        // className="bg-slate-800 h-[100vh] pt-10 text-white"
                        style={{
                          float: "left",
                          marginLeft: "27%",
                          marginTop: "5%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          border: `2px dashed red`,
                          height: "310px",
                          width: "400px",
                          cursor: "pointer",
                          borderRadius: "5px",
                        }}
                      >
                        <input
                          type="file"
                          name="record"
                          accept="audio/*"
                          className="record-field"
                          hidden
                          onChange={({ target: { files } }) => {
                            files[0] && setRecordFileName(files[0].name);
                            if (files) {
                              setRecord(files[0]);
                            }
                          }}
                        />
                        {record ? (
                          <>
                            <audio controls src={URL.createObjectURL(record)} />
                            <Typography variant="h4">
                              {recordFileName}
                            </Typography>
                          </>
                        ) : (
                          <>
                            <MdCloudUpload color="#54BBE7" size={60} />
                            <p>Browse Record to upload</p>
                          </>
                        )}
                      </div>
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="end" mt="50px">
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    sx={{ width: "200px", fontSize: "16px", fontWeight: "700" }}
                    disabled={loading}
                    // onClick={() => test(values)}
                  >
                    Show Result
                  </Button>
                </Box>
                {loading && (
                  <Box sx={{ width: '100%', mt: '0.5%' }}>
                  <LinearProgress />
                </Box>
            )}

                <BootstrapDialog
                  onClose={handleCloseD}
                  aria-labelledby="customized-dialog-title"
                  open={openD}
                >
                  <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Test Result
                  </DialogTitle>
                  <IconButton
                    aria-label="close"
                    onClick={handleCloseD}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <DialogContent
                    dividers
                    style={{
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h2"
                      style={{ fontWeight: "bold", marginTop: "10%" }}
                    >
                      {result} : {average}%
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleCloseD}>
                      OK
                    </Button>
                  </DialogActions>
                </BootstrapDialog>
              </form>
            )}
          </Formik>
        </Box>
      </main>
    </div>
  );
};

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
});

// const initialValues = {
//   firstName: "",
//   lastName: "",
//   form: "",
//   text: "",
// };

export default Test;
