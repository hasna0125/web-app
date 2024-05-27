import React, { useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavTopbar from "./navTopbar";
import "./dash_admin.css";
import NavSidebar from "./navSidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataTeam } from "../Components/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import NewHeader from "./newHeader";
import UserContext from '../User/userContext';
import {
  GridColDef,
  GridRowsProp,
  GridCellEditStopParams,
  GridCellEditStopReasons,
  MuiEvent,
} from '@mui/x-data-grid';
import StartOutlinedIcon from '@mui/icons-material/StartOutlined';





function Dash_Admin() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();

  // const location = useLocation();
  // const name = location.state.name;
  // const prenom = location.state.prenom;
  // const role = location.state.role;


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




  const themes = useTheme();
  const colors = tokens(themes.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
      // editable: true
    },
    {
    field: "prenom",
    headerName: "First Name",
    flex: 1,
    cellClassName: "name-column--cell",
    // editable: true
  },
    {
      field: "birth",
      headerName: "Birth Date",
      // type: "date",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "sexe",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "diagnosis",
      headerName: "Diagnosis Date", 
      // type: "date",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "result",
      headerName: "Result",
      flex: 1,
    },
  ];

  const [selectedRow, setSelectedRow] = useState(null);

  const handleSelectionChange = (selectionModel) => {
    if (selectionModel.length > 0) {
      const selectedRowData = mockDataTeam.find((row) => row.id === selectionModel[0]);
      setSelectedRow(selectedRowData);
    } else {
      setSelectedRow(null);
    }
  };

  const handleButtonClick = () => {
    if (selectedRow) {
      const { id, name, prenom } = selectedRow; // Extract desired fields
      navigate('/test', { state: { id, name, prenom }, replace: false });
    } else {
      alert('Please select a row first');
    }
  };


  return (
    <div className="dash">
      <NavSidebar name={user?.name} prenom={user?.prenom} role={user?.role} isSidebar={isSidebar} />
      <main className="content">
        <NavTopbar setIsSidebar={setIsSidebar} />
        <Box m="20px" setIsSidebar={setIsSidebar}>
          {/* <Box m="20px"> */}
          <NewHeader title="Dashboard" subtitle="Managing the Plateforme" />
        </Box>
      </main>
    </div>
  );
}

export default Dash_Admin;
