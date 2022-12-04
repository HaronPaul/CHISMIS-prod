import React, {useEffect, useState} from 'react'
import {Typography, TextField, Button, Paper, Alert, Modal, Box, CircularProgress} from '@mui/material' 
import styled from 'styled-components'
import reportSVG from '../assets/icons/report.svg'
import axios from '../api/axios'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
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

function convertDate(newDate) {
    const dateString = newDate.toString()
    console.log(dateString)
    const DD = String(dateString.getDate()).padStart(2, '0');
    const MM = String(dateString.getMonth() + 1).padStart(2, '0');
    const YYYY = dateString.getFullYear();
    const convertedDate = `${MM}-${DD}-${YYYY}`
    return convertedDate
}

const SignPendingReports = () => {
    const axiosPrivate = useAxiosPrivate()

    const [reports, setReports] = useState([])
    const [date, changeDate] = useState('')
    const [error, setError] = useState(true)
    const [open, setOpen] = useState(false);
    const [currentReport, setCurrentReport] = useState('')

    const {role, firstName, lastName} = useSelector((state) => state.user)
    let {signCount, isComplete} = useSelector((state) => state.section)
    const dispatch = useDispatch()
    
    const handleOpen = () => setOpen(true); // For opening the document modal
    const handleClose = () => setOpen(false); // For closing the document modal
    
    const [openLoadingModal, setOpenLoadingModal] = useState(false)
    const [message, setMessage] = useState('') // Message for the loading modal
    
    const [openAlertModal, setOpenAlertModal] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

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
        const queryParam = role === 2121? {incomingSupervisor: ''}:{manager: ''}

        if(!error){
            try {
                const response = await axios.get(`/shift_report/get_reports/${date}`, {params: {...queryParam}})
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
        // Set the current report's ID state
        setCurrentReport(reportID) 

        // Request for the details of the shift report here
        setOpenLoadingModal(true)
        setMessage('Retrieving shift report...')
        try {
            const response = await axios.get(`/shift_report/get_report/${reportID}`)
            if(response.data.success) {
                setOpenLoadingModal(false)
                dispatch(retrieveState(response.data.shiftReport))
                handleOpen()
            }
        } catch(err) {
            setOpenLoadingModal(false)
            setMessage('')
            console.log(err)
        }
    }

    const handleSignButton = async () => {
        
        // Update the value of the incoming supervisor/manager
        let signature = role === 2121? {incomingSupervisor: `${firstName} ${lastName}`}:{manager: `${firstName} ${lastName}`}
        signCount += 1
        isComplete = signCount === 3? true: false
        setOpenLoadingModal(true)
        setMessage('Signing Shift Report...')
        try {
            const response = await axiosPrivate.put(`/shift_report/update/${currentReport}`, {
                ...signature,
                signCount: signCount,
                isComplete: isComplete
            })
            if(response.status === 200){
                // Update modal states
                setOpenLoadingModal(false)
                handleClose()
                setOpenAlertModal(true)
                setAlertMessage('Successfully signed report')
                setMessage('')

                // Delete the report from the array
                setReports((reports) => reports.filter((report) => currentReport !== report._id))
            }
        } catch(err) {
            setOpenLoadingModal(false)
            setMessage('')
            handleClose()
            setOpenAlertModal(true)
            if(!err?.response) {
                setAlertMessage('No server response')
            } else if(err.response?.status === 400) {
                setAlertMessage('An error occured when signing the report. Please try again')
            }
            console.log(err)
        }
    }

    return(
        <>
        <MainContainer> 
            <Container>
                <Typography variant='h2' style={{marginBottom: '1.5%'}}> Sign a Report </Typography>
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
                <ShiftReportDoc download={false}></ShiftReportDoc>
                <Button variant="contained" style={{marginTop: '10px'}} onClick={handleSignButton}>Sign This Report</Button>
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
                    <Typography variant="h5"> {message} </Typography>
                </div>
            </Paper>
        </Modal>
        <Modal
            open={openAlertModal}
            onClose={() => setOpenAlertModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center' ,padding: '0.5%'}}
        >
            <Paper sx={loadingModalStyle} elevation={5}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant="h5"> {alertMessage} </Typography>
                </div>
            </Paper>
        </Modal>
        </>
        
    )
}

export default SignPendingReports