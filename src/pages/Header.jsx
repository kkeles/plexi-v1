import React, {useContext,useEffect} from 'react'
import { AccContext } from '../components/AWSactions/AccContext';
import { Link, useNavigate } from 'react-router-dom';
import {Auth} from "aws-amplify";

const Header = () => {
    const navigate = useNavigate();
    const accContext = useContext(AccContext);
    const [loggedIn,setLoggedIn] = [accContext.loggedIn,accContext.setLoggedIn];  
      
    useEffect(() => { // to check if the user is logged in
        Auth.currentAuthenticatedUser({
            bypassCache: false //if true, it will call the latest user data.
        }).then(user => setLoggedIn(user))
        .catch(err => console.log(err));
    }, [setLoggedIn]);


    async function signOut() {
    try {
        await Auth.signOut()
        .then(() => {
            navigate("/", { replace: true }); // redirect to homepage once logged in.
            window.location.reload(); // following navigate for reload.
        });
    } catch (error) {
        console.log('error signing out: ', error);
        }
    };

  return (
    <header className="App-header">
    <nav>
      <Link to="/">Home</Link>   
      {loggedIn ? <button onClick={signOut}>Log Out</button> : <h1> </h1>}
    </nav>
  </header>
  )
}

export default Header;