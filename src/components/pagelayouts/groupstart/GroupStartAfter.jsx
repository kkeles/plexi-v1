import React, { useContext, useEffect } from 'react'
import QRCode from "react-qr-code";
import { AccContext } from '../../AWSactions/AccContext';
import { APIContext } from '../../AWSactions/APIContext';
import { useNavigate } from 'react-router';

const GroupStartAfter = () => {
  const accContext = useContext(AccContext);
  const apiContext = useContext(APIContext);
  const email = accContext.email;
  const name = accContext.name;
  const joinGroup = apiContext.joinGroup;
  const refGroupID = apiContext.refGroupID
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      joinGroup(refGroupID, email, name, false);
    }, 1000);
  }, []);

  const visitGroupCreated = () => {
    setTimeout(() => {
      navigate(`/viewgroup/admin/${refGroupID}`, { replace: true });
      window.location.reload(); // following navigate for reload.
    }, 1500);
  }

  return (
    <React.Fragment>
      <h1><QRCode value={"https://plexi.app/" + refGroupID} /></h1>
      <h2>Share the code below to invite:</h2>
      <h2>plexi.app/<b>{refGroupID}</b></h2>
      <h2 style={{ cursor: 'pointer' }} onClick={visitGroupCreated}>visit the Group</h2>
    </React.Fragment>
  )
}

export default GroupStartAfter;