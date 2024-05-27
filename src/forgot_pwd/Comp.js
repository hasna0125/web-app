import styled from 'styled-components';

export const ForgotContainer = styled.div`
position: relative;
// top: 0;
margin-top: 25%;
margin-left: 25%;
height: 50%;
transition: all 0.6s ease-in-out;
// left: 0;
width: 50%;
z-index: 2;
`;


export const ResetContainer = styled.div`
position: relative;
// top: 0;
margin-top: 25%;
margin-left: 25%;
height: 50%;
transition: all 0.6s ease-in-out;
// left: 0;
width: 50%;
z-index: 2;
`;


export const Form = styled.form`
background-color: #ffffff;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0 50px;
height: 100%;
text-align: center;
margin-top: -25%;
`;

export const Title = styled.h1`
font-weight: bold;
margin: 0;
margin-bottom: 6%;
`;

export const Input = styled.input`
background-color: #eee;
border: none;
font-size: 14px;
font-weight: 700;
padding: 12px 15px;
margin: 8px 0;
width: 100%;
`;

export const Button = styled.button`
   border-radius: 20px;
   border: 1px solid #ff6b6b;
   background-color: #ff6b6b;
   color: #ffffff;
   font-size: 14px;
   font-weight: bold;
   padding: 12px 45px;
   letter-spacing: 1px;
   text-transform: uppercase;
   transition: transform 80ms ease-in;
   &:active{
       transform: scale(0.95);
   }
   &:focus {
       outline: none;
   }
`;

export const Paragraph = styled.p`
font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px
`;
