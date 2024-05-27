import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { mockDataContacts } from "../Components/mockData";
import { useTheme } from "@mui/material";

import { tokens } from "../theme";
import { ColorModeContext, useMode } from "../theme";
import Header from "../Components/Header";
import Topbar from "../Components/Topbar";
import "./dashboard_user.css";
import Sidebar from "../Components/Sidebar";
import UserContext from './userContext';
import axios from "axios";




const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },

    {
      field: "name",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "prenom",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "nemure_telephone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "adress",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "nom_de_tuteur_du_patient",
      headerName: "Guardian's First Name",
      flex: 1,
    },
    {
      field: "prenom_de_tuteur_du_patient",
      headerName: "Guardian's Last Name",
      flex: 1,
    },
    {
      field: "nemure_telephone_de_tuteur_du_patient",
      headerName: "Guardian's Phone Number",
      flex: 1,
    },
  ];


  const [isSidebar, setIsSidebar] = useState(true);
  
  const navigate = useNavigate();

  // const { user, updateUser } = useContext(UserContext);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser && !user) {
  //     const userData = JSON.parse(storedUser);
  //     updateUser(userData);
  //   }
  // }, [updateUser, user]);
  
  // const name = user?.name; // Using optional chaining here
  // console.log("name: " + name);

  const [patientData, setPatientData] = useState([]);
  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && !user) {
      const userData = JSON.parse(storedUser);
      updateUser(userData);
    }
  }, [updateUser, user]);

  // useEffect(() => {
  //   if (user) {
  //     listPatient();
  //   }
  // }, [user]);

  // const listPatient = () => {
  //   console.log('listPatient ID: ', user?.id);
  //   axios.post('http://127.0.0.1:5000/doctor_dash/listpatient', {
  //     user_id: user?.id,
  //   })
  //   .then(function (response) {
  //     setPatientData(response.data.patient_data || []);
  //     console.log('listPatient Name: ', response.data.patient_data.name);
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

  useEffect(() => {
    if (user?.id) {
      listPatient();
    }
  }, [user]);

  const listPatient = () => {
    console.log('listPatient ID: ', user?.id);
    axios.post('http://127.0.0.1:5000/doctor_dash/listpatient', {
      user_id: user?.id,
    })
    .then(function (response) {
      console.log('listPatient Data from back: ', response.data); // Log the entire response data
      const patientData = response.data || []; // response.data is the array of patient data
      setPatientData(patientData);
      console.log('listPatient Data: ', patientData); // Log the patient data array
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



  return (
    <div className="dash">
    <Sidebar name={user?.name} prenom={user?.prenom} role={user?.role} isSidebar={isSidebar} />
    <main className="content">
      <Topbar setIsSidebar={setIsSidebar} />
    <Box m="20px" setIsSidebar={setIsSidebar}>
      <Header
        title="CONTACT"
        subtitle="Contact information of patients"
      />
      <Box
        m="40px 0 0 0"
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
            fontSize: "15px",
            fontWeight: "600",
            borderBottom: "none",
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
        <DataGrid
          rows={patientData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          initialState={{
            ...mockDataContacts.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
        />
      </Box>
    </Box>
    </main>
    </div>
  );
};

export default Contacts;