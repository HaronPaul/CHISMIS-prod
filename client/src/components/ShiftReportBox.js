import React, {useState} from "react";
import { Typography, Button, Box, Paper, CircularProgress  } from "@mui/material";
import ShiftReportDoc from "./ShiftReportDoc";
import {useSelector, useDispatch} from 'react-redux'
import { Modal } from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// Redux imports
import {resetState} from "../redux/sectionSlice";

const style = {
    display: 'flex',
    flexDirection: 'column',
    width: '70vw',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 5,
    overflowY: 'scroll',
};

const loadingBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '500px',
    p: '2%',
    height: '10%'
};

const ShiftReportBox = ({closeDocModal, editMode, currentReport, handleCloseEdit}) => {
    const shiftReportData = useSelector((state) => state.section)
    const dispatch = useDispatch()
    const axiosPrivate = useAxiosPrivate()

    const [open, setOpen] = useState(false);
    const [isSubmitted, setSubmitted] = useState(false)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')
    
    // Modal functions
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async() => {
        handleOpen()
        try {
            let response
            if(editMode)
                response = await axiosPrivate.put(`/shift_report/edit/${currentReport}`, shiftReportData)
            else     
                response = await axiosPrivate.post('/shift_report/create', shiftReportData)
            setMessage(response.data.message)
            if(response.status === 200) {
                setSubmitted(true)
                setSuccess(true)
            } else {
                setSubmitted(true)
                setSuccess(false)
            }
        } catch(err) {
            setSubmitted(false)
                console.log(err)
        } 
    }

    const closeSubmitModal = () => {
        if(success) {
            // dispatch(resetState())
            closeDocModal()
        }
        
        setMessage('')
        setSuccess(false)
        setSubmitted(false)
        handleClose()
        handleCloseEdit()
    }

    return(
        <>
        <Box sx={style}>
            <Typography variant="h4" textAlign={"center"}>Preview Shift Report</Typography>
            <ShiftReportDoc download={false}/>
            <Button variant="contained" style={{marginTop: '20px'}} onClick={handleSubmit}>Submit Report</Button>
        </Box>
        <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center' ,padding: '0.5%'}}>
            <Paper sx={loadingBoxStyle} elevation={5}>
                { !isSubmitted && 
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem '}}>
                        <CircularProgress style={{marginRight: '20px'}} />
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Submitting Report.. 
                        </Typography>
                    </div>
                }
                { isSubmitted &&
                    <div style={{marginBottom: '5%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography variant="h5"> {message} </Typography>
                        <Button variant="outlined" onClick={closeSubmitModal}> Close </Button>
                    </div>
                }
            </Paper>
        </Modal>
       </>
    )
}

export default ShiftReportBox