import React, { useState, useEffect, createContext } from 'react'
import Auth from '@aws-amplify/auth';

const AccContext = createContext();

const AccProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [email, setEmail] = useState(""); //used for signup confirmation
  const [name, setName] = useState("");
  const [groupsMembered, setGroupsMembered] = useState();
  const [groupsAdmined, setGroupsAdmined] = useState();


  useEffect(() => {
    async function fetchData() {
      const { attributes } = await Auth.currentAuthenticatedUser();
      setName(attributes.name);
      setEmail(attributes.email)
    }
    fetchData();
  }, []);

  const contextParams = {
    signedUp, setSignedUp,
    loggedIn, setLoggedIn,
    email, setEmail,
    name, setName,
    groupsMembered, setGroupsMembered,
    groupsAdmined, setGroupsAdmined
  }

  return (
    <AccContext.Provider value={contextParams} >
      {props.children}
    </AccContext.Provider>
  )
}

export { AccContext, AccProvider }