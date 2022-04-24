import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { APIContext } from '../../AWSactions/APIContext';
import { useNavigate } from 'react-router';

const MemberFinished = ({ props }) => {
    const navigate = useNavigate();
    const { isFinishedToggle,finishReceipt } = React.useContext(APIContext);

    const evFinisher = (grnr, memid) => {
        isFinishedToggle(grnr, memid, "true");
        finishReceipt(grnr,memid,props.groupReceipts,"finish")
        setTimeout(() => {
            navigate(0)
        }, 200);
    }


    return (
        <Popup
            trigger={<button className="button"> I'm all set! </button>}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> <h2>Are you sure you are done? </h2></div>
                    <div className="content">
                        You won't have a chance to add or change any receipts anymore.
                    </div>
                    <br />
                    <div className="actions">
                        <button
                            className="button"
                            onClick={() => {
                                evFinisher(props.groupnr, props.memberID)
                            }}
                        >
                            Yes, I'm done!
                        </button>
                        <button
                            className="button"
                            onClick={() => {
                                close();
                            }}
                        >
                            No, take me back
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default MemberFinished;