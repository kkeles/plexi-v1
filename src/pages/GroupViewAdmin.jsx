import React, { useContext, useEffect, useState } from 'react'
import { APIContext } from '../components/AWSactions/APIContext';
import { useParams } from 'react-router';
import ReceiptsTable from "../components/pagelayouts/receipt/ReceiptsTable";
import GroupUsersTable from '../components/pagelayouts/groupadmin/GroupUsersTable';
import Auth from '@aws-amplify/auth';
import ReceiptAddButton from '../components/pagelayouts/receipt/ReceiptAddButton';
import MemberFinished from "../components/pagelayouts/receipt/MemberFinished";
import { useNavigate } from 'react-router';


const GroupViewAdmin = () => {
    const apiContext = useContext(APIContext);
    const { groupnr } = useParams("");
    const [email, setEmail] = useState("")
    const [memberFinished, setMemberFinished] = useState(false);
    const getMemberReceipts = apiContext.getMemberReceipts;
    const checkGroupFinalized = apiContext.checkGroupFinalized;
    const [receiptsEmpty, setReceiptsEmpty] = useState(true);
    const [memberReceipts, setMemberReceipts] = [apiContext.memberReceipts, apiContext.setMemberReceipts];
    const setFinishedAdminTable =  apiContext.setFinishedAdminTable;
    const navigate = useNavigate();
    const popupProps = {
        groupnr,
        memberID: email,
        groupReceipts: memberReceipts,
        memberFinished,
        role: "admin"
    }

    const getUser = async () => {
        const user = await Auth.currentAuthenticatedUser({
            bypassCache: true //if true, it will call the latest user data.
        })
        return user;
    }

    useEffect(() => {
        getUser()
            .then((user) => {
                setEmail(user.attributes.email); //problematic.
                getMemberReceipts(groupnr, user.attributes.email)
                    .then(result => {
                        try {
                            setMemberFinished(result.Item.isFinished);
                            if (result.Item.memberReceipts.length > 0) {
                                setReceiptsEmpty(false);
                                const receipts = result.Item.memberReceipts;
                                setMemberReceipts(receipts);
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    })
            })
    }, []);

    useEffect(async () => {
        await checkGroupFinalized(groupnr)
            .then(response => {
                const groupFinalizedStatus = response.Item.isFinalized["BOOL"]; //true or false
                if (groupFinalizedStatus) {
                    const finishedTable = JSON.parse(response.Item.finalTransferLog["S"]);
                    setFinishedAdminTable(finishedTable);
                    setTimeout(() => {
                        navigate(`/viewgroup/admin/final/${groupnr}`, { replace: true });
                    }, 500);
                }
            })
    }, []);

    if (memberFinished) {
        return (
            <React.Fragment>
                <h2>Group {groupnr}</h2>
                <h3>Group Members:</h3>
                <GroupUsersTable groupID={groupnr} />
                {receiptsEmpty ? <h2>You don't have any receipts yet</h2> : <h2>here are your receipts:</h2>}
                {receiptsEmpty ? <div></div> : <ReceiptsTable props={popupProps} />}
                <br />
                <h2>You are all set! You can't add receipts anymore!</h2>
                <h3>Since you are the group admin, feel free to redo finished status for any member.</h3>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <h2>Group {groupnr}</h2>
                <h3>Group Members:</h3>
                <GroupUsersTable groupID={groupnr} />
                <br /> <hr style={{ backgroundColor: "black", height: 3 }} /> <br />
                {(!receiptsEmpty) ? <h2>here are your receipts:</h2> : <h2>You don't have any receipts yet</h2>}
                {(!receiptsEmpty) ? <ReceiptsTable props={popupProps} /> : <div></div>}
                <br />
                <div>
                    <ReceiptAddButton props={popupProps} />   <MemberFinished props={popupProps} />
                </div>
            </React.Fragment>
        )
    }
}

export default GroupViewAdmin;