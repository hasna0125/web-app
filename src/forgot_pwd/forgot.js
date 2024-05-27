import React from "react";
import * as Comp from './Comp';
import '../Intro/styles.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';  




function Forgot () {
    const [code, setCode] = React.useState('');
    const codeChange = (event) => { 
        const result = event.target.value.replace(/\D/g, '');
        setCode(result); 
    };
    const navigate = useNavigate();
    const location = useLocation();
    // const {sent_code, id} = useParams();
    // console.log("code 2_before: ", sent_code);
    const Continuer = () => {
        // const info = location.state;
        // if (info.code === code) {
        //     const id = info.user_id;
        //     console.log("code 2: ", info.code);
        //     navigate("/reset", {replace: true, state: {data: id}});
        // }
        // const {sent_code, id} = location.state;
        console.log("code 2: ", location.state.code);
        console.log("entered code: ", code);
        if (location.state.code == code) {
            // console.log("code 2: ", sent_code);
            const id = location.state.id;
            navigate("/reset", {replace: true, state: {data: id}});
        }else {
            alert("Le code est incorrect ! Veuillez resaisir le code.");
        }
        
    };

    // const Continuer = () => {
    //     console.log("code 2: ", sent_code);
    //     if (sent_code === code) {
    //         console.log("code 2: ", sent_code);
    //         navigate("/reset", {replace: true, state: {data: id}});
    //     }else {
    //         alert("Le code est incorrect ! Veuillez resaisir le code.");
    //     }
        
    // };

    return (
        <div className="main">
            <Comp.ForgotContainer>
                    <Comp.Form>
                        <Comp.Title>Mot de passe oublié ?</Comp.Title>
                        <Comp.Paragraph>Vous avez demandé une réinitialisation du mot de passe. Pour obtenir un nouveau mot de passe, veuillez vérifier dans votre boîte de réception (SPAM) et saisir le code de réinitialisation du mot de passe dans la case suivante:</Comp.Paragraph>
                        <Comp.Input type='text' id="code" maxLength={6} minLength={6} name="code" onChange={codeChange} value={code} placeholder='Code' />
                        <ButtonComponent className="btn" type="button" onClick={Continuer}>Continuer</ButtonComponent>
                    </Comp.Form>
            </Comp.ForgotContainer>
        </div>
    );
}
export default Forgot;