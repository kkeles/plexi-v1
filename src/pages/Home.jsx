import React, { Fragment, useEffect, useContext } from 'react'
import { AccContext } from '../components/AWSactions/AccContext';
import { Auth } from 'aws-amplify';
import GuestHome from './GuestHome';
import UserHome from './UserHome';

const Home = () => {
  const accContext = useContext(AccContext);
  const [loggedIn, setLoggedIn] = [accContext.loggedIn, accContext.setLoggedIn];
  const setEmail = accContext.setEmail;

  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false //if true, it will call the latest user data.
    }).then(
      user => {
        setLoggedIn(true);
        setEmail(user.attributes.email)
      }
    )
      .catch(err => console.log(err));
  }, [setLoggedIn,setEmail]);

  return (
    <Fragment>
      {loggedIn ? <UserHome /> : <GuestHome />}
    </Fragment>
  )
}



export default Home;