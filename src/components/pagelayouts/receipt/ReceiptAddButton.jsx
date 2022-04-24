import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { APIContext } from '../../AWSactions/APIContext';
import { useNavigate } from 'react-router';

const ReceiptAddButton = ({ props }) => {
    const [note, setNote] = React.useState("");
    const [date, setDate] = React.useState("")
    const [amount, setAmount] = React.useState("");
    const { addReceipt } = React.useContext(APIContext);
    const navigate = useNavigate();



    const receiptAdder = (event) => {
        event.preventDefault();
        const dateSep = date.split("-");
        const newDate = `${dateSep[2]} ${dateSep[1]} ${dateSep[0]}`;
        addReceipt(props.groupnr, note, newDate, amount);
        const redirectURL = `/viewgroup/success/${props.groupnr}/${props.role}`;
        navigate(redirectURL, { replace: true });
    }

    return (
        <Popup
            trigger={<button className="button"> Add Receipt </button>}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <form onSubmit={receiptAdder}>
                        <label htmlFor="note">Note: </label>
                        <input value={note} onChange={e => setNote(e.target.value)} />
                        <br />
                        <label htmlFor="date">Date: </label>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                        <br />
                        <label htmlFor="amount">Amount: </label>
                        <input value={amount} onChange={e => setAmount(e.target.value)} />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                    <br />
                </div>
            )}
        </Popup>
    )
}

export default ReceiptAddButton;