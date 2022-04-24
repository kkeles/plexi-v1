import React, { useState, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { APIContext } from '../../AWSactions/APIContext';
import { useNavigate } from 'react-router';
import FinalizeGroupPre from './FinalizeGroupPre';

const GroupUsersTable = ({ groupID }) => {
    const { getGroupMembersInfo, isFinishedToggle, finishReceipt } = useContext(APIContext);
    const [groupMembers, setGroupMembers] = useState();
    const [membersFetched, setMembersFetched] = useState(false);
    const [allMembersFinished, setAllMembersFinished] = useState(true);
    const navigate = useNavigate();

    const getGroupMembers = async () => {
        var grMembers = []
        await getGroupMembersInfo(groupID)
            .then(group => {
                group.forEach(member => {
                    grMembers.push({ ...member })
                })
                setMembersFetched(true);
            })
        return grMembers;
    }
    React.useEffect(() => {
        getGroupMembers()
            .then(response => {
                response.forEach(member => {
                    setGroupMembers(groupMembers => [...groupMembers, member]);
                })
                return response;
            })
            .then((response) => {
                checkFinishStatus(response);
            })
    }, []);

    const checkFinishStatus = (memberReceipts) => {
        memberReceipts.forEach((member) => {
            if (!member.isFinished) { setAllMembersFinished(false) }
        })
    }

    const finishToggle = (memberReceipts, memberID, toggle) => {
        var action = "finish"
        toggle === "false" && (action = "revoke");
        isFinishedToggle(groupID, memberID, toggle);
        finishReceipt(groupID, memberID, memberReceipts, action);
        setTimeout(() => {
            navigate(0);
        }, 500);
    }

    if (membersFetched) {
        return (
            <React.Fragment>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: 450 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">E-mail</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Total Expense</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {groupMembers.map((member) => (
                                <TableRow
                                    key={member.memberID}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center">{member.memberID}</TableCell>
                                    <TableCell align="center">{member.memberName}</TableCell>
                                    <TableCell align="center">{member.isFinished ? <div>Finished <button onClick={() => finishToggle(0, member.memberID, "false")} >⎌</button> </div> : <div>In Progress <button onClick={() => finishToggle(member.memberReceipts, member.memberID, "true")}>✓</button> </div>}</TableCell>
                                    {member.isFinished && <TableCell align="center">{member.totalExpense}</TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
                {allMembersFinished ? <h2>All users are set! <FinalizeGroupPre groupID={groupID} groupMembers={groupMembers} /> </h2> : <h2>Some users are still working on it!</h2>}
            </React.Fragment>
        );
    }
    else {
        return (
            <React.Fragment>Loading...</React.Fragment>
        )
    }
}

export default GroupUsersTable;