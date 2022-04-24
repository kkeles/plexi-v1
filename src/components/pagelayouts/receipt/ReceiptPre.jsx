import React from 'react'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';


const ReceiptPre = () => {
    const navigate = useNavigate();
    const { groupnr,role } = useParams("");

    React.useEffect(() => {
        navigate(`/viewgroup/${role}/${groupnr}`, { replace: true });  
    }, []);
    return(
        <React.Fragment>
           <div>aa {groupnr}</div> 
        </React.Fragment>
    )
}

export default ReceiptPre;