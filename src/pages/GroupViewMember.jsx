import React, { useContext, useEffect, useState } from 'react'
import { APIContext } from '../components/AWSactions/APIContext';
import { AccContext } from '../components/AWSactions/AccContext';
import { useParams } from 'react-router';
import ReceiptsTable from "../components/pagelayouts/receipt/ReceiptsTable";
import Auth from '@aws-amplify/auth';
import ReceiptAddButton from '../components/pagelayouts/receipt/ReceiptAddButton';
import MemberFinished from "../components/pagelayouts/receipt/MemberFinished";
import { useNavigate } from 'react-router';

const GroupViewMember = () => {
    const apiContext = useContext(APIContext);
    const { groupnr } = useParams("");
    const [email, setEmail] = [useContext(AccContext).email, useContext(AccContext).setEmail];
    const [memberFinished, setMemberFinished] = useState(false);
    const getMemberReceipts = apiContext.getMemberReceipts;
    const checkGroupFinalized = apiContext.checkGroupFinalized;
    const setFinishedAdminTable = apiContext.setFinishedAdminTable;
    const [receiptsEmpty, setReceiptsEmpty] = useState(true);
    const [memberReceipts, setMemberReceipts] = [apiContext.memberReceipts, apiContext.setMemberReceipts];
    const navigate = useNavigate();


    useEffect(() => {
        Auth.currentAuthenticatedUser({
            bypassCache: false //if true, it will call the latest user data.
        }).then(
            user => {
                setEmail(user.attributes.email)
            }
        )
            .catch(err => console.log(err));
    }, []);


    const popupProps = {
        groupnr,
        memberID: email,
        groupReceipts: memberReceipts,
        memberFinished,
        role: "member"
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
                setEmail(user.attributes.email);
                getMemberReceipts(groupnr, user.attributes.email)
                    .then(result => {
                        if (result.Item.isFinished) {
                            setMemberFinished(result.Item.isFinished);
                        }
                        if (result.Item.memberReceipts.length > 0) {
                            setReceiptsEmpty(false);
                            const receipts = result.Item.memberReceipts;
                            setMemberReceipts(receipts);
                        }
                    })
            })
    }, []);

    useEffect(async () => {
        await checkGroupFinalized(groupnr)
            .then(response => {
                console.log(response);
                if (response) {
                    const groupFinalizedStatus = response.Item.isFinalized["BOOL"]; //true or false
                    if (groupFinalizedStatus) {
                        const finishedTable = JSON.parse(response.Item.finalTransferLog["S"]);
                        setFinishedAdminTable(finishedTable);
                        setTimeout(() => {
                            navigate(`/viewgroup/member/final/${groupnr}`, { replace: true });
                        }, 500);
                    }
                }
            })
    }, []);


    if (memberFinished) {
        return (
            <React.Fragment>
                <h2>Group {groupnr}</h2>
                {receiptsEmpty ? <h2>You don't have any receipts yet</h2> : <h2>here are your receipts:</h2>}
                {receiptsEmpty ? <div></div> : <ReceiptsTable props={popupProps} />}
                <br />
                <h2>You are all set! You can't add receipts anymore!</h2>
                <h3>Please contact your group admin if you want any changes.</h3>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <h2>Group {groupnr}</h2>
                {(!receiptsEmpty) ? <h2>here are your receipts:</h2> : <h2>You don't have any receipts yet</h2>}
                {(!receiptsEmpty) ? <ReceiptsTable props={popupProps} /> : <div></div>}
                <br />
                <div>
                    <ReceiptAddButton props={popupProps} />   <MemberFinished props={popupProps} />
                </div>
                <br />
            </React.Fragment>
        )
    }
}

export default GroupViewMember;