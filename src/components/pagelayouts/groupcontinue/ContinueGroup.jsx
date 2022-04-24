import React, { useContext } from 'react'
import { AccContext } from '../../AWSactions/AccContext';
import { APIContext } from '../../AWSactions/APIContext';
import { useNavigate } from 'react-router';

const ContinueGroup = () => {
  const accContext = useContext(AccContext);
  const apiContext = useContext(APIContext);
  const email = accContext.email;
  const groupsMembered = accContext.groupsMembered;
  const groupsAdmined = accContext.groupsAdmined;
  const getMemberReceipts = apiContext.getMemberReceipts;


  const navigate = useNavigate();

  const visitGroup = async (groupNR,mail,role) => {
    await getMemberReceipts(groupNR,mail)
    navigate(`/viewgroup/${role}/${groupNR}`, { replace: true });
  }

  const displayGroups = (groupType,role) => {
    if (groupType) {
      return (groupType.map(group => <h3 style={{ cursor: 'pointer' }} key={group} onClick={() => {visitGroup(group,email,role)}}>{group}</h3>))
      
    }
    else {
      return <div></div>
    }
  }

  return (
    <React.Fragment>
      <div>Groups Membered:</div>
      {displayGroups(groupsMembered,"member")}
      <div>Groups Admined:</div>
      {displayGroups(groupsAdmined,"admin")}
    </React.Fragment>
  )
}

export default ContinueGroup;