import {useState} from 'react'
import {Typography, TextField, Button, Paper, Alert, Modal, Box, CircularProgress} from '@mui/material' 
import styled from 'styled-components'
import reportSVG from '../assets/icons/report.svg'
import axios from '../api/axios'
import CreateSR from './CreateSR'

// Date Imports
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns  from '@mui/lab/AdapterDateFns'

// Redux Imports
import {useDispatch } from 'react-redux'
import {changeDate, retrieveState} from '../redux/sectionSlice'

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
    width: '90vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 5,
    gap: '10px',
    overflowY: 'scroll',
};

function convertISODate(newDate) {
    const dateString = newDate.toISOString().split('T')[0]
    const splitDate = dateString.split('-')
    const convertedDate = `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`
    return convertedDate
}

const EditReport = () => {
    const [reports, setReports] = useState([])
    const [currentReport, setCurrentReport] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState(true)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const dispatch = useDispatch()
    
    const [openLoadingModal, setOpenLoadingModal] = useState(false)
    
    const handleDateChange = (newDate) => {
        try {
            console.log(newDate)
            const dateString = newDate.toString()
            if(dateString !== "Invalid Date") {
                setError(false)
                const DD = String(newDate.getDate()).padStart(2, '0');
                const MM = String(newDate.getMonth() + 1).padStart(2, '0');
                const YYYY = newDate.getFullYear();
                const dateCreated = `${MM}-${DD}-${YYYY}`
                console.log(dateCreated)
                setDate(dateCreated)
            } else {
                setError(true)
                setDate('')
                console.log("Date is invalid")
            }
        } catch(err) {
            console.log('No date inputted')
        }
    }

    // handler for clicking the view button 
    const handleViewButton = async () => {
        if(!error){
            try {   
                const response = await axios.get(`/shift_report/get_reports/${date}}`)
                console.log(response.data.success)
                if(response.data.success === true) {
                    setReports(response.data.shiftReports)
                }
            } catch(err) {
                console.log(err)
            }
        }
    }

    // handler for clicking a report thumbnail
    const handleReportClick = async (reportID) => {
        setOpenLoadingModal(true)

        try {
            // Get data of this shift report by ID
            const response = await axios.get(`/shift_report/get_report/${reportID}`)
            if(response.data.success) {
                setOpenLoadingModal(false)
                dispatch(retrieveState(response.data.shiftReport))
                dispatch(changeDate(convertISODate(new Date(response.data.shiftReport.date)))) 
                setCurrentReport(reportID)
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
                <Typography variant='h2' style={{marginBottom: '1.5%'}}> Edit Shift Report </Typography>
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
                <CreateSR editMode={true} currentReport={currentReport} reports={reports} setReports={setReports} handleCloseEdit={handleClose}/>
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

export default EditReport
