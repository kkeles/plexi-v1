import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { APIContext } from '../../AWSactions/APIContext';
import { useNavigate } from 'react-router';


export default function ReceiptsTable({ props }) {
    const deleteReceipt = React.useContext(APIContext).deleteReceipt;
    const navigate = useNavigate();
    const addReceiptRows = () => {
        var receiptRows = [];
        props.groupReceipts.map(receipt => receiptRows.push({ ...receipt }));
        return receiptRows;
    }
    const recrows = addReceiptRows();

    const deleteRow = (listNum) => {
        deleteReceipt(props.groupnr, props.memberID, listNum)
        navigate(`/viewgroup/success/${props.groupnr}/${props.role}`, { replace: true });
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 450 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Note</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Amount&nbsp;(€)</TableCell>
                        {!props.memberFinished && <TableCell align="center"></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recrows.map((row, index) => (
                        <TableRow
                            key={row[0]}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="center">{row[0] /*Note*/}</TableCell>
                            <TableCell align="center">{row[1] /*Date*/}</TableCell>
                            <TableCell align="center">{row[2] /*Amount*/}</TableCell>
                            {!props.memberFinished && <TableCell onClick={() => { deleteRow(index) }} oalign="center"><IconButton aria-label="delete" disabled color="primary"><ClearIcon /></IconButton></TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}