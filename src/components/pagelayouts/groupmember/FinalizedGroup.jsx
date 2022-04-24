import React,{useContext} from 'react';
import { useParams } from 'react-router';
import { APIContext } from '../../AWSactions/APIContext';
import { AccContext } from '../../AWSactions/AccContext';

const FinalizedGroup = () => {
    const { groupnr } = useParams("");
    const apiContext = useContext(APIContext);
    const finishedAdminTable = apiContext.finishedAdminTable;
    const [finishedMemberTable,setFinishedMemberTable] = React.useState();
    const userEmail = useContext(AccContext).email;

    React.useEffect(() => {
        const filteredAdminTable = finishedAdminTable.filter(transferLog => (transferLog.senderMail === userEmail || transferLog.receiverMail === userEmail))
        const finishedMemberLogs = []
        filteredAdminTable.map(transfer => {
            if (transfer.senderMail === userEmail) {
                finishedMemberLogs.push(`You should transfer ${transfer.amount} to ${transfer.receiver}`);
            }
            else if (transfer.receiverMail === userEmail) {
                finishedMemberLogs.push(`You should expect to receive ${transfer.amount} from ${transfer.sender}`);
            };
            setFinishedMemberTable(finishedMemberLogs);
            return transfer;
        })
    }, []);

    return (
        <React.Fragment>
           <h1>The group {groupnr} is finalized</h1>
           {finishedMemberTable.map((log, index) => (
               <h2 key={index}>{log}</h2>
            ))}
            <br />
            <h1>Click here to start a new group</h1>
        </React.Fragment>
    )
}

export default FinalizedGroup;