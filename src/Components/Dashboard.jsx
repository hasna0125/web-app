import { Box, Typography, useTheme } from "@mui/material";
import { React, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import { tokens } from "../theme";
import { mockDataTeam } from "./mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "./Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import New from "../User/New";
import Dash_User from "../User/dashboard_user";
import Topbar from "./Topbar";
import '../User/dashboard_user.css';
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [themes, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const location = useLocation();
  const name = location.state.name;
  const prenom = location.state.prenom;
  const role = location.state.role;



  return (
    <div className="dash">
      <Sidebar name={name} prenom={prenom} role={role} isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        {/* <Router> */}
          {/* <Main /> */}
          <Routes>
            {/* <Route exact path="/" element={<Home />} /> */}
            <Route path="/dash_user" element={<Dash_User />} />
            <Route path="/new" element={<New />} />
            {/* <Route
                path="/contact"
                element={<Contact />}
            /> */}
          </Routes>
        {/* </Router> */}
      </main>
    </div>
  );
};

export default Dashboard;
