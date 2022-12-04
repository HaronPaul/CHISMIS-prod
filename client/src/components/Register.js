import React, {useState, useEffect} from "react";
import { Typography, Grid, FormControl, InputLabel, MenuItem, TextField, Button, Alert}
from "@mui/material";
import Select from '@mui/material/Select'
import axios from '../api/axios'
import GeneralModal from "./GeneralModal"

let initialCreds = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  role: '',
  matchedPwd: ''
}

const SuccessAlert = ({message}) => {
  return(
    <Grid item lg={12} sm={12}>
      <Alert severity="success">{message}</Alert>
    </Grid>
  )
}

const ErrorAlert = ({message}) => {
  return(
    <Grid item lg={12} sm={12}>
      <Alert severity="error">{message}</Alert>
    </Grid>
  )
}

const Register = ({handleClick}) => {
    const [credentials, setCredentials] = useState(initialCreds)
    const [alert, setAlert] = useState(0)
    const [message, setMessage] = useState("")
    const [disabled, setDisabled] = useState(true)

    // Modal states
    const [openModal, setOpenModal] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    const handleInputChange = e => {
      const {name, value} = e.target
      setCredentials({
        ...credentials,
        [name]: value
      })
    }

    useEffect(() => { 
      // Check if fields have an empty string/not yet filled. If so, disable the button, else enable
      if(Object.values(credentials).some(value => value.length === 0)) {
        setDisabled(true)
      }
      else {
        setDisabled(false)
        // Check if passwords matched. If so, enable the button, else disable
        if(credentials.password.trim().length > 0 && credentials.password.trim().length > 0) 
          (credentials.password !== credentials.matchedPwd)? setDisabled(true): setDisabled(false)
        else
          setDisabled(true)
      }
    }, [credentials])


    const handleRegisterButton = async () => {
      setOpenModal(true)
      setModalMessage('Creating new user...')
      try {
        const response = await axios.post('/user', JSON.stringify(credentials), {
          headers: {'Content-Type': 'application/json'},
        })
        response.data?.success? setAlert(1):setAlert(-1)
        setMessage(response.data.message)
        
        // Update modal states
        setOpenModal(false)
        setModalMessage('')
        
      } catch(err) {  
        setOpenModal(false)
        setModalMessage('')

        console.log(Object.keys(err))
        // When server is down
        if(!err?.response) { 
          setMessage('No Server response')
        } else if(err.response?.status === 409) {
          setMessage('Username is taken')
        } else {
          setMessage('Registration failed')
        }
        setAlert(-1)
      }
    }

    return(
      <>
        <Typography variant="h2" style={{margin: '1%', textAlign: 'center'}}>Register</Typography>
        <Grid container spacing={2}>
          <Grid item lg={6} sm={12} xs={12}>
            <TextField
            variant="outlined"
            label="First Name"
            name="firstName"
            autoComplete="off"
            style={{ minWidth: '100%'}}
            onChange={handleInputChange}
            value={credentials?.firstName || ''}
            /> 
          </Grid>
          <Grid item lg={6} sm={12} xs={12}>  
            <TextField
            variant="outlined"
            name='lastName'
            label="Last Name"
            autoComplete="off"
            style={{ minWidth: '100%'}}
            onChange={handleInputChange}
            value={credentials?.lastName || ''}> </TextField>
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <TextField 
            variant="outlined"
            label="Username"
            style={{ minWidth: '100%'}}
            name="username"
            autoComplete="off"
            onChange={handleInputChange}
            value={credentials?.username || ''}></TextField>
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <TextField 
            type='password'
            variant="outlined"
            label="Password"
            style={{ minWidth: '100%'}}
            name="password"
            onChange={handleInputChange}
            value={credentials?.password || ''}></TextField>
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <TextField 
            type='password'
            variant="outlined"
            label="Confirm Password"
            style={{ minWidth: '100%'}}
            name="matchedPwd"
            onChange={handleInputChange}
            value={credentials?.matchedPwd || ''}></TextField>
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
              <FormControl style={{ minWidth: '100%'}}>
                  <InputLabel labelid="role">Role</InputLabel>
                  <Select defaultValue = '' name="role" id="role" label="Role" onChange={handleInputChange}>
                      <MenuItem value={'SUPERVISOR'}>SUPERVISOR</MenuItem>
                      <MenuItem value={'MANAGER'}>MANAGER</MenuItem>
                      <MenuItem value={'ADMINISTRATOR'}>ADMINISTRATOR</MenuItem>
                  </Select>
              </FormControl>
          </Grid>
          {alert === 1 && <SuccessAlert message={message}/>}
          {alert === -1 && <ErrorAlert message={message}/>}
          <Grid item lg={12} sm={12} xs={12}>
            <Button size="large" variant="contained" color='primary' disabled={disabled} style={{minWidth: '100%'}} onClick={() => handleRegisterButton()}>Register</Button>
          </Grid>
          <Grid item>
              <Typography style={{marginRight: '10px'}}>Already have an account?</Typography>
              <Button size="small" variant="outlined" onClick={() => handleClick()}>Sign In</Button>
          </Grid>
        </Grid>
        <GeneralModal message={modalMessage} openModal={openModal} />
      </>
    )
}

export default Register