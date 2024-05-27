import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Main from './Intro/main';
import Dash_Admin from './Admin/dashboard_admin';
import Dash_User from './User/dashboard_user';
import Home from './home';
import Forgot from './forgot_pwd/forgot';
import Reset from './forgot_pwd/reset';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./Components/Dashboard";
import New from "./User/New";
import Contacts from "./User/Contacts";
import Test from "./User/Test";
import Calendar from "./User/Calendar";
import { UserProvider } from './User/userContext';
import FAQ from "./User/Faq";
import NewUser from "./Admin/new_user";
import Subscription from "./User/Subscription";






function App() {

  const [theme, colorMode] = useMode();

  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
        <Router>
            {/* <Main /> */}
            <Routes>
                {/* <Route exact path="/" element={<Home />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="/main" element={<Main />} />
                <Route path="/dash_admin" element={<Dash_Admin />} />
                <Route path="/dash_user" element={<Dash_User />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route path="/reset" element={<Reset />} />
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                <Route path="/new" element={<New />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/test" element={<Test />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/new_user" element={<NewUser />} />
                <Route path="/subscribe" element={<Subscription />} />
                {/* <Route
                    path="/contact"
                    element={<Contact />}
                /> */}
            </Routes>
        </Router>
        </UserProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
    
  );
}

export default App;
