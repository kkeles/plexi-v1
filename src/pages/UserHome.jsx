import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AccContext } from "../components/AWSactions/AccContext";
import ContinueGroup from '../components/pagelayouts/groupcontinue/ContinueGroup';
import { APIContext } from '../components/AWSactions/APIContext';
import uniqueRandom from 'unique-random';

const UserHome = () => {
  const navigate = useNavigate();
  const apiContext = useContext(APIContext);
  const name = useContext(AccContext).name;
  const [cGroupClicked, setCGroupClicked] = useState(false);
  const [refGroupID, setRefGroupID] = [apiContext.refGroupID, apiContext.setRefGroupID]
  const startGroup = apiContext.startGroup;
  const getUserGroups = apiContext.getUserGroups;
  

  useEffect(() => {
    const random = uniqueRandom(100000, 999999);
    const grID = random().toString();
    setRefGroupID(grID)
  }, [setRefGroupID]);
  

  const stGroup = () => {
    startGroup(refGroupID,name);
    navigate("/startgroup", { replace: true });
  }

  const jGroup = () => {
    navigate("/joingroup", { replace: true }); // redirect to homepage once logged in.
  }

  const cGroup = async () => {
    getUserGroups();
    setCGroupClicked(true);
  }

  return (
    <Fragment>
      <div>hello {name}</div>
      <h3 style={{ cursor: 'pointer' }} onClick={stGroup}>Start a New Group</h3>
      <h3 style={{ cursor: 'pointer' }} onClick={jGroup}>Join a Group</h3>
      <h3 style={{ cursor: 'pointer' }} onClick={cGroup}>Continue a Group</h3>
      <br />
      {cGroupClicked ? <ContinueGroup /> : <div></div>}

    </Fragment>
  )
}

export default UserHome;