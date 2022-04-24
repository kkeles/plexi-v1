import React, { useState, useContext } from 'react';
import { APIContext } from '../../AWSactions/APIContext';
import { AccContext } from '../../AWSactions/AccContext';
import { useNavigate } from 'react-router';

const GroupJoinPre = () => {
    const [groupID, setGroupID] = useState("");
    const accContext = useContext(AccContext);
    const userName = accContext.name;
    const userEmail = accContext.email;
    const joinGroup = useContext(APIContext).joinGroup;
    const navigate = useNavigate()

    const send = (event) => {
        event.preventDefault();
        joinGroup(groupID, userEmail, userName, true);
        navigate(`/viewgroup/member/${groupID}`, { replace: true });
    }

    return (
        <React.Fragment>
            <h2>Enter the group ID you would like to join: </h2>
            <form onSubmit={send}>
                <label htmlFor="groupID">Group ID </label>
                <input value={groupID} onChange={e => setGroupID(e.target.value)} />
                <br />
                <button type="submit">Join</button>
            </form>
        </React.Fragment>
    )
}

export default GroupJoinPre