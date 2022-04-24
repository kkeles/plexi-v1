import React,{useState,useContext} from 'react'
import { AccContext } from '../AWSactions/AccContext'
import { APIContext } from '../AWSactions/APIContext';
import {Auth} from "aws-amplify";
import { useNavigate } from "react-router-dom";


const SignupConfirm = () => {
    const accContext = useContext(AccContext);
    const apiContext = useContext(APIContext);
    const [code,setCode] = useState("");
    const navigate = useNavigate();


    const confirmSignUp = async(e) => {
      e.preventDefault();
      const email = accContext.email;
      const name = accContext.name;
      const userToUsersTable = apiContext.userToUsersTable;
      try {
        await Auth.confirmSignUp(email, code);
        userToUsersTable(email,name);
        navigate("/", { replace: true }); // redirect to homepage once signed up.
        window.location.reload(); // following navigate for reload.
      } catch (error) {
          console.log('error confirming sign up', error);
      }
  }

    return (
      <React.Fragment>
          <h2>You will receive a confirmation code shortly. Please enter the code below.</h2>
          <form onSubmit={confirmSignUp}>
              <label htmlFor="email">Confirmation code: </label>
              <input value={code} onChange={e => setCode(e.target.value)}/>
              <br/>
              <button type="submit">Confirm</button>
          </form>
      </React.Fragment>
    )
}

export default SignupConfirm;