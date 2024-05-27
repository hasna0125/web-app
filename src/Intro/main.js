import React, { useContext } from "react";
import * as Components from './Components';
import './styles.css';
// import logo from '../Images/logo_wb.png';
import logo from '../Images/logo-removebg-preview.png';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';      
import back from '../Images/login.jpg'; 
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UserContext from '../User/userContext';


function Main() {
    const [signIn, toggle] = React.useState(true);
    const navigate = useNavigate();
    const [loginAttempts, setLoginAttempts] = React.useState(0);
    const [loginDisabled, setLoginDisabled] = React.useState(false);
    const maxLoginAttempts = 3;
    const cooldownTime = 30 * 60 * 1000;
  //  function handleClick() { navigate('/dash_admin'); };
//     const [value, setValue] = React.useState('');
//     const handleChange = (event) => {
//     setValue(event.target.value);
//   }

React.useEffect(() => {
  const cooldownTimeout = setTimeout(() => {
    setLoginDisabled(false); // Re-enable login button after cooldown
  }, cooldownTime);
  return () => clearTimeout(cooldownTimeout); // Cleanup timeout on unmount or re-render
}, [loginDisabled]);





    const { login } = useContext(UserContext);

    const [fname, setFname] = React.useState('');
    const fnameChange = (event) => { setFname(event.target.value); }

    const [sname, setSname] = React.useState('');
    const snameChange = (event) => { setSname(event.target.value); }

    const [email, setEmail] = React.useState('');
    const emailChange = (event) => { setEmail(event.target.value); }

    const [place, setPlace] = React.useState('');
    const placeChange = place => { setPlace(place); }

    const [adr, setAdr] = React.useState('');
    const adrChange = (event) => { setAdr(event.target.value); }

    const [number, setNumber] = React.useState('');
    const numberChange = (event) => { 
      // setNumber(event.target.value); 
      const result = event.target.value.replace(/\D/g, '');
      setNumber(result);
    }

    const [pwd, setPwd] = React.useState('');
    const pwdChange = (event) => { setPwd(event.target.value); }

    const [conf_pwd, setConfPwd] = React.useState('');
    const confPwdChange = (event) => { setConfPwd(event.target.value); }

    const [email_login, setEmailLoging] = React.useState('');
    const emailLoginChange = (event) => { setEmailLoging(event.target.value); }

    const [password, setPassword] = React.useState('');
    const passwordChange = (event) => { setPassword(event.target.value); }

    const logInUser = () => {
      //if (loginDisabled) return;
    //   if (email_login.length === 0) {
    //     alert("Veuillez entrer votre adresse email !");
    // }
    // else if (password.length === 0) {
    //   alert("Veuillez saisir le mot de passe !");
    // }
    // else if (password.length <= 8) {
    //   alert("Votre mot de passe doit contenir au moins 8 caractères !");
    // }
    if (email_login.length === 0 || password.length === 0 || password.length < 8) {
      if (loginAttempts < maxLoginAttempts - 1) {
          setLoginAttempts(loginAttempts + 1);
          alert("Email ou mot de passe invalide.");
      } else {
        alert("Nombre maximal de tentatives de connexion dépassé. Veuillez réessayer après 60 secondes.");
        // setLoginDisabled(true);
        setLoginDisabled(true);
        setTimeout(() => {
          setLoginDisabled(false);
          setLoginAttempts(0);
          alert("Essayer de nouveau.");
        }, 60000);
        
      }
    }
    else {
      // alert ("Succès");
      axios.post('http://127.0.0.1:5000/signin', {
        Email : email_login,
        Password : password
      })
      .then(function (response) {
        console.log(response);
        if (response.data.role === 'Admin') {
          navigate("/dash_admin", {replace: true, state: {
            name: response.data.name,
            prenom: response.data.prenom,
            role: response.data.role
          }});
        }
        else if (response.data.role === 'Doctor') {
          navigate("/dash_user", {replace: true, state: {
            id: response.data.id,
            name: response.data.name,
            prenom: response.data.prenom,
            role: response.data.role,
            email: response.data.email,
            phone: response.data.phoneNumber,
            address: response.data.Adresse,
          }});
        }
        const userData = { 
          id: response.data.id,
          name: response.data.name,
          prenom: response.data.prenom,
          role: response.data.role,
          email: response.data.email,
          phone: response.data.phoneNumber,
          address: response.data.Adresse,
         };

        // Call the login function from the context
        login(userData);
      })
      .catch(function (error) {
        console.log(error, 'error');
        if (error.response.status === 404) {
          alert('Informations invalides, réessayer de nouveau');
        }
      });
      setLoginAttempts(0);
    }

  };
// ------------------------------------------------------------------
  // const registerUser = () => {
  //   axios.post('http://127.0.0.1:5000/signup', {
  //     Nom : fname,
  //     Prenom : sname,
  //     Email : email,
  //     Password : pwd,
  //     Adresse : adr,
  //     phoneNumber : number,
  //     // Confirm : conf_pwd,
  //     Confirm_Password : conf_pwd,
  //     Type : place.value,
  //   })
  //   .then(function (response) {
  //     console.log("Response: ", response);
  //     console.log("Name: ", response.data.name);
  //     navigate("/dash_user", {replace: true, state: {
  //       // name: fname,
  //       // prenom: sname,
  //       // role: 'Doctor',
  //       // email: email,
  //       // phone: number,
  //       // address: adr,
  //       name: response.data.name,
  //       prenom: response.data.prenom,
  //       role: response.data.role,
  //       email: response.data.email,
  //       phone: response.data.phoneNumber,
  //       address: response.data.Adresse,
  //     }});
  //     const userData = {
  //       id: response.data.id,
  //       name: response.data.name,
  //       prenom: response.data.prenom,
  //       role: response.data.role,
  //       email: response.data.email,
  //       phone: response.data.phoneNumber,
  //       address: response.data.Adresse,
  //     };
  //     login(userData);
  //     console.log('UserName: ', userData.name);
  //   })
  //   .catch(function (error) {
  //     console.log(error, 'error');
  //     if (error.response.status === 401) {
  //       alert('Informations invalides');
  //     }
  //   });
  //   console.log('Confirm_password: ', conf_pwd);
  // };


  const registerUser = () => {
    const userData = {
        Nom: fname,
        Prenom: sname,
        Email: email,
        Password: pwd,
        Adresse: adr,
        phoneNumber: number,
        Confirm_Password: conf_pwd,
        Type: place.value,
    };
    console.log('Sending data:', userData);  // Debug print

    axios.post('http://127.0.0.1:5000/signup', userData)
        .then(function (response) {
            console.log("Response: ", response);
            console.log("Name: ", response.data.name);
            navigate("/dash_user", {replace: true, state: {
                name: response.data.name,
                prenom: response.data.prenom,
                role: response.data.role,
                email: response.data.email,
                phone: response.data.phoneNumber,
                address: response.data.Adresse,
            }});
            const userData = {
                id: response.data.id,
                name: response.data.name,
                prenom: response.data.prenom,
                role: response.data.role,
                email: response.data.email,
                phone: response.data.phoneNumber,
                address: response.data.Adresse,
            };
            login(userData);
            console.log('UserName: ', userData.name);
        })
        .catch(function (error) {
            console.log(error, 'error');
            if (error.response && error.response.status === 401) {
                alert('Informations invalides');
            } else {
                alert('Server error. Please try again later.');
            }
        });
    console.log('Confirm_password: ', conf_pwd);
};




// ------------------------------------------------------------------
  const options = [
    { value: "hopital", label: "Hospital"},
    { value: "clinique", label: "Private Clinic"}
  ];


  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontWeight: state.isSelected ? "bold" : "normal",
    //    backgroundColor: "#eee",
    //    border: "none",
    //    padding: "12px 15px",
    //    margin: "8px 0",
    //    width: "100%", 
    })
  };
// ------------------------------------------------------------------
// const [code, setCode] = React.useState('');
// const [id, setId] = React.useState('');
  const forget = () => {
    axios.post('http://127.0.0.1:5000/forgetPass', {
      Email : email_login
    })
    .then(function (response) {
      console.log(response);
      // setCode(response.data.code);
      // setId(response.data.id);
      // const code = response.data.code;
      // const id = response.data.id;
      const info = {code: response.data.code, id: response.data.user_id};
      console.log("code 1: ", info.code);
      // navigate("/forgot", {state: {data: info}});
      navigate("/forgot", {
        state: {
          code: response.data.code,
          id: response.data.user_id
        }});
      console.log("code 1_after: ", response.data.code);
    })
    .catch(function (error) {
      console.log(error, 'error');
      if (error.response.status === 404) {
        alert('Informations invalides');
      }
    });
  };
// ------------------------------------------------------------------


const [showPassword, setShowPassword] = React.useState(false);

const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};


//----------------------------------------------------------------------
     return(
        <div className="main">
        {/* // <img src={logo} alt="LOGO" class="logo" /> */}
        <header id="header_one">
                <div className="logo">
                    <img src={logo}/>
                    <div id="title">
                        <h1 id="title_one">Pen & Tone</h1>
                        <h3 id="title_two">Parkinson</h3>
                    </div>
                </div>
                <nav>
                    <ul>
                        <li><a href="/" id="a_one">Home</a></li>
                        <li><a href="/main" id="a_one">Login</a></li>
                    </ul>
                </nav>
      </header>
      <div id="login">
      <div className="titre">
        <h1>Welcome</h1>
        <img src={back} alt="Background" className="image" />
      </div>
         <Components.Container>
             <Components.SignUpContainer signinIn={signIn}>
             {/* <img src={logo} alt="LOGO" className="logo" /> */}
                 <Components.Form>
                     <Components.Title>Create account</Components.Title>
                     <Components.Input type='text' id="fname" name="fname" onChange={fnameChange} value={fname} placeholder='Last Name' />
                     <Components.Input type='text' id="sname" name="sname" onChange={snameChange} value={sname} placeholder='First Name' />
                     <Components.Input type='email' id="email" minLength={8} name="email" onChange={emailChange} value={email} placeholder='Email' />
                     {/* <Select value={value} options={options} onChange={handleChange} className="select" styles={styles} placeholder='Etablissement' /> */}
                     <Select options={options} className="select" id="place" name="place" onChange={placeChange} value={place} styles={styles} placeholder='Establishment' />
                            {/* <option disabled={true} value="">Etablissement</option>
                            <option value="HP">Hopital</option>
                            <option value="CP">Clinique privée</option> */}
                     {/* </Select>  */}
                     <Components.Input type='text' id="adr" name="adr" onChange={adrChange} value={adr} placeholder='Address' />
                     <Components.Input type='text' id="number" maxLength={10} minLength={10} name="number" onChange={numberChange} value={number} placeholder='Phone N°' />
                     {/* <PhoneInput className="number" country={"us"} id="number" name="number" onChange={numberChange} value={number} placeholder='N° Telephone' /> */}
                     <Components.Input type='password' id="pwd" name="pwd" onChange={pwdChange} value={pwd} minLength={8} placeholder='Password' />
                     <Components.Input type= 'password' id="conf_pwd" name="conf_pwd" 
                     onChange={confPwdChange} value={conf_pwd} minLength={8} placeholder='Confirm Password' />
                     <Components.Button type="button" onClick={registerUser}>Sign Up</Components.Button>
                     {/* <button className="btn" type="button" onClick={registerUser}>Sign Up</button> */}
                 </Components.Form>
             </Components.SignUpContainer>

             <Components.SignInContainer signinIn={signIn}>
             {/* <img src={logo} alt="LOGO" className="logo" /> */}
                  <Components.Form>
                      <Components.Title>Login</Components.Title>
                      <Components.Input type='email' id="email_1" name="email_login" onChange={emailLoginChange} value={email_login} placeholder='Email' />
                      <Components.Input type='password' id="pwd_2" name="password" onChange={passwordChange} value={password} minLength={8} placeholder='Password' />
                      {/* <Components.Anchor href='/forgot'>Mot de passe oublié ?</Components.Anchor> */}
                      <Components.Anchor onClick={forget}>Forgot Password ?</Components.Anchor>
                      {/* <Components.Button type="button" onClick={logInUser} disabled={loginDisabled}>Sign In</Components.Button> */}
                      <ButtonComponent className="btn" type="button" onClick={logInUser} disabled={loginDisabled}>Sign In</ButtonComponent>
                  </Components.Form>
             </Components.SignInContainer>

             <Components.OverlayContainer signinIn={signIn}>
                 <Components.Overlay signinIn={signIn}>

                 <Components.LeftOverlayPanel signinIn={signIn}>
                     <Components.Title>Pen & Tone </Components.Title>
                     <Components.Paragraph>
                      Already have an account ?
                     </Components.Paragraph>
                     <Components.GhostButton onClick={() => toggle(true)}>
                         Sign In
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel signinIn={signIn}>
                       <Components.Title>Pen & Tone </Components.Title>
                       <Components.Paragraph>
                         Don't have an account ?
                       </Components.Paragraph>
                           <Components.GhostButton onClick={() => toggle(false)}>
                               Sign Up
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>
         </Components.Container>
      </div>
        </div>
     );
}

export default Main;