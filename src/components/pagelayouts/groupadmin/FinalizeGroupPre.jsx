import React from 'react';
import Popup from 'reactjs-popup';
import { APIContext } from '../../AWSactions/APIContext';
import { useNavigate } from 'react-router';

const FinalizeGroupPre = ({ groupMembers, groupID }) => {
    const { groupFinalizer } = React.useContext(APIContext);
    const navigate = useNavigate();

    const groupFinalizeTrigger = () => {
        groupFinalizer(groupID, groupMembers);
        setTimeout(() => {
            navigate(`/viewgroup/admin/final/${groupID}`, { replace: true });
        }, 500);
    }

    return (
        <Popup
            trigger={<button className="button"> Finalize the Group </button>}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> <h2>Are you sure the group is finished? </h2></div>
                    <div className="content">
                        You won't have a chance to add or change any receipts anymore.
                    </div>
                    <br />
                    <div className="actions">
                        <button
                            className="button"
                            onClick={() => {
                                groupFinalizeTrigger();
                            }}
                        >
                            Yes, We are done!
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

export default FinalizeGroupPre