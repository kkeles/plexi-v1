import React,{Fragment,useState, useContext} from 'react'
import { AccContext } from '../components/AWSactions/AccContext';
import {Auth} from "aws-amplify";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const accContext = useContext(AccContext);
    const [email,setEmail] = [accContext.email,accContext.setEmail];
    const [password,setPassword] = useState("");
    const setLoggedIn = accContext.setLoggedIn;
    const navigate = useNavigate();


    const login = (event) => { //event received as the input. The following form will take onSubmit function
        //prevents to submit the form to the page. It is used to prevent form actions in traditional HTML but React.
        event.preventDefault()
        Auth.signIn(email, password) //applying authenticate function from Account.jsx
            .then(data => {
                setLoggedIn(data);
                navigate("/", { replace: true }); // redirect to homepage once logged in.
                window.location.reload(); // following navigate for reload.
            })
            .catch(err => {
                console.error("error",err);
            });
    }

  return (
    <Fragment>
        <form onSubmit={login}>
            <label htmlFor="email">E-mail: </label>
            <input value={email} onChange={e => setEmail(e.target.value)}/>
            <br/>
            <label htmlFor="password">Password: </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <br/>
            <button type="submit">Login</button>
        </form>
    </Fragment>
  )
}

export default Login;