import React, {useEffect, useState} from 'react'
import {Typography, TextField, Button, Paper, Alert, Modal, Box, CircularProgress} from '@mui/material' 
import styled from 'styled-components'
import reportSVG from '../assets/icons/report.svg'
import axios from '../api/axios'
import ShiftReportDoc from '../components/ShiftReportDoc'

// Date Imports
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns  from '@mui/lab/AdapterDateFns'

// Redux Imports
import { useSelector, useDispatch } from 'react-redux'
import {retrieveState} from '../redux/sectionSlice'

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
`

const Container = styled.div`
    padding: 2%;
    width: 90%;
    margin-top: 2%;
    border-radius: 20px;
`

const ReportsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 100px;
`

const ReportContainer = styled.div`
    margin-top: 2%;
    width: 280px;
    height: 280px;
    border-radius: 20px;
    padding: 2%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 10px 17px -6px rgba(0,0,0,0.64);
    -webkit-box-shadow: 2px 10px 17px -6px rgba(0,0,0,0.64);
    -moz-box-shadow: 2px 10px 17px -6px rgba(0,0,0,0.64);
    transition: all .2s ease-in-out;

    &:hover{
        cursor: pointer;
        background-color: #0093E9;
        background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
        transform: scale(1.1) 
    }
`

const loadingModalStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '500px',
    p: '2%',
    height: '10%'
};

const reportModalStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '70vw',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 5,
    overflowY: 'scroll',
};

const paperStyle = {
    '&:hover': {
        background: "#efefef"
    }
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function convertDate(newDate) {
    const dateString = newDate.toString()
    console.log(dateString)
    const DD = String(dateString.getDate()).padStart(2, '0');
    const MM = String(dateString.getMonth() + 1).padStart(2, '0');
    const YYYY = dateString.getFullYear();
    const convertedDate = `${MM}-${DD}-${YYYY}`
    return convertedDate
}

const ViewReport = () => {
    const [reports, setReports] = useState([])
    const [date, changeDate] = useState('')
    const [error, setError] = useState(true)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch()

    const [openLoadingModal, setOpenLoadingModal] = useState(false)
    
    const handleDateChange = (newDate) => {
        try {
            const dateString = newDate.toString()
            if(dateString !== "Invalid Date") {
                setError(false)
                const DD = String(newDate.getDate()).padStart(2, '0');
                const MM = String(newDate.getMonth() + 1).padStart(2, '0');
                const YYYY = newDate.getFullYear();
                const dateCreated = `${MM}-${DD}-${YYYY}`
                console.log(dateCreated)
                changeDate(dateCreated)
            } else {
                setError(true)
                changeDate('')
                console.log("Date is invalid")
            }
        } catch(err) {
            console.log('No date inputted')
        }
    }

    const handleViewButton = async () => {
        if(!error){
            try {
                const response = await axios.get(`/shift_report/get_reports/${date}}`)
                console.log(response.data.success)
                if(response.data.success === true) {
                    console.log('Successfully retrieved data')
                    setReports(response.data.shiftReports)
                }
            } catch(err) {
                console.log(err)
            }
        }
    }

    const handleReportClick = async (reportID) => {
        // Request for the details of the shift report here
        setOpenLoadingModal(true)
        try {
            const response = await axios.get(`/shift_report/get_report/${reportID}`)
            console.log(response.data)
            if(response.data.success) {
                setOpenLoadingModal(false)
                dispatch(retrieveState(response.data.shiftReport))
                handleOpen()
            }
        } catch(err) {
            setOpenLoadingModal(false)
            console.log(err)
        }
    }

    return(
        <>
        <MainContainer> 
            <Container>
                <Typography variant='h2' style={{marginBottom: '1.5%'}}> View a Shift Report </Typography>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                            label="Pick a date"
                            inputFormat="MM/dd/yyyy"
                            value={date || null}
                            onChange={(newDate)=>handleDateChange(newDate)}
                            renderInput={(params) => <TextField {...params} style={{marginRight: '20px'}} />}
                            />
                    </LocalizationProvider>
                    <Button variant="contained" size="large" onClick={handleViewButton} disabled={error? true: false}> View Report</Button>
                </div>
                {error && <Alert severity='error' style={{marginTop: '2%'}}>  Please select a valid date </Alert>}
                <ReportsContainer>
                    {reports.length > 0? reports.map((report) => {
                        return(
                            <ReportContainer key={report._id} onClick={() => handleReportClick(report._id)}> 
                                <img src={reportSVG} style={{width: '40%', height: 'auto', objectFit: 'contain', marginBottom: '15px'}}></img>
                                <Typography variant='h6' textAlign={'center'} style={{marginBottom: '20px'}}> Prepared by: <b> {report.currentSupervisor} </b></Typography>
                                <Typography variant='h6'> Shift: <b> {report.shift} </b></Typography>
                            </ReportContainer>    
                        )
                    }):<></>}
                </ReportsContainer>
            </Container>
        </MainContainer>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{display: 'flex', justifyContent: 'center', padding: '0.5%'}}
        >
            <Box sx={reportModalStyle}>
                <ShiftReportDoc download={true}></ShiftReportDoc>
            </Box>
        </Modal>
        <Modal
            open={openLoadingModal}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center' ,padding: '0.5%'}}
        >
            <Paper sx={loadingModalStyle} elevation={5}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <CircularProgress style={{marginRight: '20px'}} />
                    <Typography variant="h5"> Retrieving shift report </Typography>
                </div>
            </Paper>
        </Modal>
        </>
        
    )
}

export default ViewReport
