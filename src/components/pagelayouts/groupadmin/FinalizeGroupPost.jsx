import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { APIContext } from '../../AWSactions/APIContext';


const FinalizeGroupPost = () => {
    const { groupnr } = useParams("");
    const apiContext = useContext(APIContext);
    const finishedAdminTable = apiContext.finishedAdminTable

    return (
        <React.Fragment>
            <h1>The group {groupnr} is finalized</h1>
            {finishedAdminTable.map((transfer, index) => (
                <h2 key={index}>{transfer.sender} should send {transfer.amount} to {transfer.receiver}</h2>
            ))}
            <br />
            <h1>Click here to start a new group</h1>
        </React.Fragment>
    )
}

export default FinalizeGroupPost;