import React from "react";
import * as Comp from './Comp';
import '../Intro/styles.css';
import logo from '../Images/logo_wb.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';  



function Reset () {
    const [conf_new_pwd, setConfNewPwd] = React.useState('');
    const confNewPwdChange = (event) => { setConfNewPwd(event.target.value); }

    const [new_pwd, setNewPwd] = React.useState('');
    const newPwdChange = (event) => { setNewPwd(event.target.value); }

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.data;
    const Confirmer = () => {
        axios.post('http://127.0.0.1:5000//forgetPass/newpass', {
            user_id: id,
            nouveau_password: new_pwd,
            confirm_nouveau_password: conf_new_pwd
          })
          .then(function (response) {
            console.log(response);
            navigate("/main", { replace: true});
          })
          .catch(function (error) {
            console.log(error, 'error');
            if (error.response.status === 404) {
              alert('Informations invalides');
            } else if (error.response.status === 500) {
                alert('Confirmer le nouveau mot de passe');
            }
          });
        navigate("/main", {replace: true});
    }

    return (
        <div className="main">
            <Comp.ResetContainer>
                    <Comp.Form>
                        <Comp.Title>Réintialiser le mot de passe</Comp.Title>
                        <Comp.Input type='password' id="new_pwd" name="new_pwd" onChange={newPwdChange} value={new_pwd} minLength={8} placeholder='Nouveau Mot de passe' />
                        <Comp.Input type='password' id="conf_new_pwd" name="conf_new_pwd" onChange={confNewPwdChange} value={conf_new_pwd} minLength={8} placeholder='Confirmer Nouveau Mot de passe' />
                        <ButtonComponent className="btn" type="button" onClick={Confirmer}>Confirmer</ButtonComponent>
                    </Comp.Form>
            </Comp.ResetContainer>
        </div>
    );
}
export default Reset;