import React, { useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Topbar from "../Components/Topbar";
import "./dashboard_user.css";
import Sidebar from "../Components/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataTeam } from "../Components/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../Components/Header";
import UserContext from "./userContext";
import {
  GridColDef,
  GridRowsProp,
  GridCellEditStopParams,
  GridCellEditStopReasons,
  MuiEvent,
} from "@mui/x-data-grid";
import StartOutlinedIcon from "@mui/icons-material/StartOutlined";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function Dash_User() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();

  // const location = useLocation();
  // const name = location.state.name;
  // const prenom = location.state.prenom;
  // const role = location.state.role;

  // const { user, updateUser } = useContext(UserContext);

  // useEffect(() => {
  // //   const storedUser = localStorage.getItem('user');
  // //   if (storedUser && !user) {
  // //     const userData = JSON.parse(storedUser);
  // //     updateUser(userData);
  // //   }
  // // }, [updateUser, user]);

  // // const name = user?.name; // Using optional chaining here
  // // console.log("name: " + name);

  // // // const { user, updateUser } = useContext(UserContext);

  // // // useEffect(() => {
  // // //   const storedUser = localStorage.getItem('user');
  // // //   if (storedUser && !user) {
  // // //     const userData = JSON.parse(storedUser);
  // // //     updateUser(userData);
  // // //     console.log('Dashboard loaded user from localStorage:', userData);
  // // //   }
  // // // }, [updateUser, user]);

  // const name = user?.name;
  // console.log("Dashboard name: " + name);

  const themes = useTheme();
  const colors = tokens(themes.palette.mode);

  // // // const { add_patient } = useContext(UserContext);
  // // const [patientData, setPatientData] = useState([]);

  // // const listPatient = () => {
  // //   axios.post('http://127.0.0.1:5000/doctor_dash/listpatient', {
  // //     user_id: user?.id,
  // //   })
  // //   .then(function (response) {
  // //     setPatientData(response.data.patient_data);
  // //   })
  // //   .catch(function (error) {
  // //     console.log(error, 'error');
  // //     if (error.response && error.response.status === 404) {
  // //       alert('Doctor not found for the given user_id');
  // //     } else {
  // //       alert('Server error. Please try again later.');
  // //     }
  // //   });
  // // };

  // // useEffect(() => {
  // //   if (user) {
  // //     listPatient();
  // //   }
  // // }, [user]);

  // const [patientData, setPatientData] = useState([]);
  // const [patientDetails, setPatientDetails] = useState(null);
  // const { user, updateUser } = useContext(UserContext);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser && !user) {
  //     const userData = JSON.parse(storedUser);
  //     updateUser(userData);
  //     // listPatient();
  //   }
  // }, [updateUser, user]);

  // // useEffect(() => {
  // //   if (user) {
  // //     listPatient();
  // //   }
  // // }, [user]);

  // useEffect(() => {
  //     listPatient();
  //   });

  // const listPatient = () => {
  //   console.log('listPatient ID: ', user?.id);
  //   axios.post('http://127.0.0.1:5000/doctor_dash/listpatient', {
  //     user_id: user?.id,
  //   })
  //   .then(function (response) {
  //     setPatientData(response.data.patient_data || []);
  //     console.log('listPatient Name: ', response.data.patient_data.name);
  //     setPatientData(response.data.patient_data);
  //   })
  //   .catch(function (error) {
  //     console.log(error, 'error');
  //     if (error.response && error.response.status === 404) {
  //       alert('Doctor not found for the given user_id');
  //     } else {
  //       alert('Server error. Please try again later.');
  //     }
  //   });
  // };

  const [patientData, setPatientData] = useState([]);
  const [patientDetails, setPatientDetails] = useState(null);
  const { user, updateUser } = useContext(UserContext);

  // First useEffect to fetch user data from local storage and update context
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !user) {
      const userData = JSON.parse(storedUser);
      updateUser(userData);
    }
  }, [updateUser, user]);

  // Second useEffect to list patients when user.id changes
  useEffect(() => {
    if (user?.id) {
      listPatient();
    }
  }, [user]);

  const listPatient = () => {
    console.log("listPatient ID: ", user?.id);
    axios
      .post("http://127.0.0.1:5000/doctor_dash/listpatient", {
        user_id: user?.id,
      })
      .then(function (response) {
        console.log("listPatient Data from back: ", response.data); // Log the entire response data
        const patientData = response.data || []; // response.data is the array of patient data
        setPatientData(patientData);
        console.log("listPatient Data: ", patientData); // Log the patient data array
      })
      .catch(function (error) {
        console.log(error, "error");
        if (error.response && error.response.status === 404) {
          alert("Doctor not found for the given user_id");
        } else {
          alert("Server error. Please try again later.");
        }
      });
  };

  const patientDetail = (rowData) => {
    console.log("patientDetails ID: ", user?.id);
    console.log("patient_id: ", rowData?.id);
    axios
      .post("http://127.0.0.1:5000/listpatient/patient_details", {
        user_id: user?.id,
        patient_id: rowData?.id,
      })
      // .then(function (response) {
      //   console.log('patientDetail Data from back: ', response.data); // Log the entire response data
      //   const patientDetails = response.data; // response.data is the array of patient data
      //   setPatientDetails(patientDetails);
      //   console.log('patientDetail name: ', patientDetails?.nom); // Log the patient data array
      // })
      //
      .then(function (response) {
        console.log("patientDetail Data from back: ", response.data); // Log the entire response data
        const patientDetail = response.data; // response.data is the object containing patient data and tests
        setPatientDetails(patientDetail);
        console.log("patientDetail name: ", patientDetails?.nom); // Log the patient data object
      })
      .catch(function (error) {
        console.log(error, "error");
        if (error.response && error.response.status === 404) {
          alert("Doctor not found for the given user_id");
        } else {
          alert("Server error. Please try again later.");
        }
      });
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
      // editable: true
    },
    {
      field: "prenom",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
      // editable: true
    },
    {
      field: "date_naissance",
      headerName: "Birth Date",
      // type: "date",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "date_de_dernier_test",
      headerName: "Last Diagnosis Date",
      // type: "date",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "resultat",
      headerName: "Result",
      flex: 1,
    },
  ];

  const [selectedRow, setSelectedRow] = useState(null);
  const [isSelectedRow, setIsSelectedRow] = useState(false);

  const handleSelectionChange = (selectionModel) => {
    if (selectionModel.length > 0) {
      const selectedRowData = patientData.find(
        (row) => row.id === selectionModel[0]
      );
      setSelectedRow(selectedRowData);
      use_function();
    } else {
      setSelectedRow(null);
    }
  };

  const handleButtonClick = () => {
    if (isSelectedRow) {
      const { name, prenom } = selectedRow; // Extract desired fields
      navigate("/test", { state: { name, prenom }, replace: false });
      console.log("row name and prenom", name, prenom);
    } else {
      alert("Please select a row first");
    }
  };

  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  //   patientDetail();
  // };

  const handleClickOpen = (rowData) => {
    // setSelectedRow(params.row);
    setOpen(true);
    patientDetail(rowData); // Pass the patient id to the detail fetching function
  };

  const handleClose = () => {
    setOpen(false);
  };

  const use_function = () => {
    console.log("use function ID: ", user?.id);
    axios
      .post("http://127.0.0.1:5000/use_function", {
        user_id: user?.id,
      })
      .then(function (response) {
        if (response.data.subscribed === true) {
          // handleButtonClick();
          setIsSelectedRow(true);
        } else {
          // navigate('/test', { state: { id, name, prenom }, replace: false });
          alert("You have to subscribe!");
        }
      })
      .catch(function (error) {
        console.log(error, "error");
        if (error.response && error.response.status === 404) {
          alert("Doctor not found for the given user_id");
        } else {
          alert("Server error. Please try again later.");
        }
      });
  };

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
          {/* <Box m="20px"> */}
          <Header title="Dashboard" subtitle="Managing the Patients" />
          <Box display="flex" justifyContent="end" mt="50px">
            {/* <Button variant="text" endIcon={<StartOutlinedIcon />} onClick={() => navigate('/test', { replace: true })}> */}
            <Button
              variant="text"
              endIcon={<StartOutlinedIcon />}
              onClick={handleButtonClick}
              sx={{
                width: "150px",
                fontSize: "16px",
                fontWeight: "700",
                backgroundColor: colors.yellow[900],
              }}
            >
              Test Now
            </Button>
          </Box>
          <Box
            m="0 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.grey[100],
                fontSize: "15px",
                fontWeight: "600",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.yellow[900],
                borderBottom: "none",
                fontSize: "15px",
                fontWeight: "600",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.grey[900],
                fontSize: "15px",
                fontWeight: "600",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.yellow[900],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.primary[600]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            {/* <DataGrid checkboxSelection rows={mockDataTeam} columns={columns}  */}
            {/* <DataGrid 
            rows={patientData} 
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionChange}
            onRowDoubleClick={(params) => handleClickOpen(params.row)}   //{handleClickOpen}
            components={{ Toolbar: GridToolbar }}
            onCellEditStop={(params, event) => {
              if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                event.defaultMuiPrevented = true;
              }
        }}
        initialState={{
          ...mockDataTeam.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]} /> */}
          <DataGrid 
            rows={patientData} 
            columns={columns}
            checkboxSelection
            onRowClick={(params, event) => {
              const isCheckboxClick = event.target.tagName === 'INPUT' && event.target.type === 'checkbox';
              if (!isCheckboxClick && event.detail === 1) {
                handleSelectionChange([params.id]);
              } else if (event.detail === 2) {
                handleClickOpen(params.row);
              }
            }}
            components={{ Toolbar: GridToolbar }}
            onCellEditStop={(params, event) => {
              if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                event.defaultMuiPrevented = true;
              }
            }}
            initialState={{
              ...mockDataTeam.initialState,
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 25, 50, 100]} 
          />

          </Box>
        </Box>

        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Patient's Details
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom variant="h5">
              Full Name:{" "}
              <strong>
                {(patientDetails?.nom, " ", patientDetails?.prenom)}
              </strong>
            </Typography>
            <Typography gutterBottom variant="h5">
              Birth Date: <strong>{patientDetails?.date_naissance}</strong>
            </Typography>
            <Typography gutterBottom variant="h5">
              Gender: <strong>{patientDetails?.gender}</strong>
            </Typography>
            <Typography gutterBottom variant="h5">
              Contact Number:{" "}
              <strong>{patientDetails?.nemure_telephone}</strong>
            </Typography>
            <Typography gutterBottom variant="h5">
              Address: <strong>{patientDetails?.adress}</strong>
            </Typography>
            <Typography gutterBottom variant="h5">
              Guardian's Name:{" "}
              <strong>
                {patientDetails?.nom_de_tuteur_du_patient} {patientDetails?.prenom_de_tuteur_du_patient}
              </strong>
            </Typography>
            <Typography gutterBottom variant="h5">
              Guardian's Phone Number:{" "}
              <strong>
                {patientDetails?.nemure_telephone_de_tuteur_du_patient}
              </strong>
            </Typography>
            <Typography gutterBottom variant="h5">
              Diagnosis Dates:
              <ul>
                {patientDetails?.list_of_tests
                  .slice()
                  .reverse()
                  .map((test, index) => (
                    <li key={index}>
                      <strong>Date {index + 1}: </strong>{" "}
                      {test.date_du_cet_test}
                    </li>
                  ))}
              </ul>
            </Typography>
            <Typography gutterBottom variant="h5">
              Results:
              <ul>
                {patientDetails?.list_of_tests
                  .slice()
                  .reverse()
                  .map((test, index) => (
                    <li key={index}>
                      <strong>Result {index + 1}: </strong> {test.resultat}
                    </li>
                  ))}
              </ul>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              OK
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </main>
    </div>
  );
}

export default Dash_User;
