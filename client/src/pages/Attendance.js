import { Typography, FormControl, InputLabel, Select, MenuItem, Button, TextField, Paper, Modal, CircularProgress, Alert} from '@mui/material'
import React, {useState} from 'react'
import styled from 'styled-components'
import axios from '../api/axios'
// import axios from 'axios'
import AttendanceDoc from '../components/AttendanceDoc'
import attendanceIcon from '../assets/icons/attendance.svg'

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
`

const Container = styled.div`
    padding: 2%;
    width: 90%;
    margin-top: 2%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
`

const HeaderStyle = styled.div`
    display: flex; 
    width: auto; 
    height: 150px; 
    align-items: center;
    gap: 25px; 
    margin-bottom: 2%;
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

const Attendance = () => {
    const [selectedMonth, setSelectedMonth] = useState(1)
    const [selectedSection, setSelectedSection] = useState(1)
    const [selectedYear, setSelectedYear] = useState('')
    const [section1, setSection1] = useState('')
    const [section2, setSection2] = useState('')
    const [attendance1, setAttendance1] = useState(null)
    const [attendance2, setAttendance2] = useState(null)
    
    const [reliever, setReliever] = useState('')
    const [relieverShift, setRelieverShift] = useState(null)

    // Modals and Error States
    const [openLoadingModal, setOpenLoadingModal] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = (e, changed) => {
        if(changed === 'date') {
            setSelectedMonth(e.target.value)
        } else {
            setSelectedSection(e.target.value)
        }
    }

    const handleGenerateButton = async () => {
        console.log(`Button is clicked with month ${selectedMonth}`)
        // Request for the report here using axios
        
        setAttendance1(null)
        setAttendance2(null)
        setOpenLoadingModal(true)
        setErrorMessage('')

        try {
            const response = await axios.get(`/attendance/${selectedYear}/${selectedMonth}/${selectedSection}`)
            if(response.data?.success) {
                setOpenLoadingModal(false)
                setError(false)
                console.log(response.data.data)
                setSection1(response.data.data.section1)
                setSection2(response.data.data.section2)
                setAttendance1(response.data.data.attendance1)
                setAttendance2(response.data.data.attendance2)
                setReliever(response.data.data.reliever)
                setRelieverShift(response.data.data.relieverShift)
            } else {
                setOpenLoadingModal(false)
                setError(true)
                setErrorMessage(response.data?.message)
                console.log(response)
            }
        } catch(err) {
            setError(true)
            console.log(err)
        }
    }


    return(
        <>
        <MainContainer>
            <Container>
            <HeaderStyle>
                <img src={attendanceIcon} style={{objectFit: 'contain', height: '100%'}} alt="inventory icon"/>
                <Typography variant='h2' style={{marginBottom: '1.5%'}}> Attendance Report </Typography>
            </HeaderStyle>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                    <FormControl style={{width: '20%'}}>
                        <InputLabel id="month">Month</InputLabel>
                        <Select 
                        labelId="month"
                        label="Month"
                        defaultValue = ''
                        value={selectedMonth || ''}
                        onChange={(e) => handleChange(e, 'date')}
                        >
                            <MenuItem value={1}>January</MenuItem>
                            <MenuItem value={2}>February</MenuItem>
                            <MenuItem value={3}>March</MenuItem>
                            <MenuItem value={4}>April</MenuItem>
                            <MenuItem value={5}>May</MenuItem>
                            <MenuItem value={6}>June</MenuItem>
                            <MenuItem value={7}>July</MenuItem>
                            <MenuItem value={8}>August</MenuItem>
                            <MenuItem value={9}>September</MenuItem>
                            <MenuItem value={10}>October</MenuItem>
                            <MenuItem value={11}>November</MenuItem>
                            <MenuItem value={12}>December</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{width: '20%', marginLeft: '10px'}}>
                        <InputLabel id="section">Section</InputLabel>
                        <Select 
                        labelId="section"
                        label="Section"
                        defaultValue = ''
                        value={selectedSection || ''}
                        onChange={(e) => handleChange(e, 'section')}
                        >
                            <MenuItem value={1}>Control Room {'&'} HCL</MenuItem>
                            <MenuItem value={2}>PB {'&'} Evap</MenuItem>
                            <MenuItem value={3}>Waste {'&'} Elec</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField 
                    style={{marginLeft: '10px'}} 
                    type='number' 
                    label="Year"
                    value={selectedYear || ''}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    autoComplete='off'
                    />
                    <Button 
                        style={{marginLeft: '1.5%'}} 
                        variant='contained' 
                        disabled={selectedYear.trim() === ''? true: false}
                        onClick={handleGenerateButton}>Generate Report</Button>
                </div>
            {(attendance1 && attendance2) && 
            <AttendanceDoc 
            attendance1={attendance1} 
            section1={section1} 
            attendance2={attendance2} 
            section2={section2} 
            month={selectedMonth}
            reliever={reliever}
            relieverShift={relieverShift}/> }
            {error && <Alert severity='error' style={{marginTop: '2%'}}> {errorMessage || ''}</Alert>}
            </Container>
        </MainContainer>
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
                    <Typography variant="h5"> Generating attendance report </Typography>
                </div>
            </Paper>
        </Modal>
        </>
    )
}

export default Attendance 