// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [patient, setPatient] = useState(null);
  console.log("UserContext initialized");
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log('UserContext name: ', storedUser?.name);
    };
  }, []);

  // useEffect(() => {
  //   const storedPatient = localStorage.getItem('patient');
  //   if (storedPatient) {
  //     setPatient(JSON.parse(storedPatient));
  //     console.log('UserContext patient name: ', storedPatient?.firsName);
  //   };
  // }, []);


  const [isLoggedin, setIsLoggedin] = useState(true);
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedin(true);
  };

  // const [isAdded, setIsAdded] = useState(true);
  // const  add_patient = (patientData) => {
  //   setPatient(patientData);
  //   localStorage.setItem('patient', JSON.stringify(patientData));
  //   setIsAdded(true);
  // };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setIsLoggedin(false);
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // const updatePatient= (patientData) => {
  //   setUser(patientData);
  //   localStorage.setItem('patient', JSON.stringify(patientData));
  // };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
// UserContext.js
// import React, { createContext, useState, useEffect } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoggedin, setIsLoggedin] = useState(false); // Set initial state to false

//   useEffect(() => {
//     console.log("UserContext initialized");
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       const userData = JSON.parse(storedUser);
//       setUser(userData);
//       setIsLoggedin(true); // User is logged in if data is in local storage
//       console.log('UserContext loaded from localStorage:', userData);
//     }
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//     setIsLoggedin(true);
//     console.log('UserContext login:', userData);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     setIsLoggedin(false);
//     console.log('UserContext logout');
//   };

//   const updateUser = (userData) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//     console.log('UserContext updated:', userData);
//   };

//   return (
//     <UserContext.Provider value={{ user, isLoggedin, login, logout, updateUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserContext;
