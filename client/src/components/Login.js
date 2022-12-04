import React, { useState, useRef, useEffect} from "react"
import { Typography, Grid, TextField, Button, Alert} from "@mui/material"
import {useNavigate, useLocation} from 'react-router-dom'
import GeneralModal from "./GeneralModal"

// Redux related imports
import {useDispatch} from 'react-redux'
import { setUser } from "../redux/userSlice"
import axios from '../api/axios'

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

const LogIn = ({handleClick}) => {
    const dispatch = useDispatch()  
    
    // Refs
    const userRef = useRef()

    // States
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState(0)
    const [message, setMessage] = useState("")
    const [disabled, setDisabled] = useState(true)

    // Router functions
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/home' 

    // Modal states
    const [openModal, setOpenModal] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    useEffect(()=> { 
      userRef.current.focus()
    }, [])

    // Disbales the button if username and password fields are empty
    useEffect(()=> {
      setAlert(0)
      if(username.trim().length > 0 && password.trim().length > 0)
        setDisabled(false)
      else
        setDisabled(true)
    }, [username, password])

    // Send an axios request to the backend when button is clicked
    const handleLoginButton = async (e) => {
      e.preventDefault()
      const body = {username,password}

      setOpenModal(true)
      setModalMessage('Signing In...')
      try {
        const response = await axios.post('/auth', JSON.stringify(body), {
          headers: {'Content-type': 'application/json'},
          withCredentials: true
        })
        const accessToken = response?.data?.accessToken
        const role = response?.data?.role
        const username = response?.data?.username
        const firstName = response?.data?.firstName
        const lastName = response?.data?.lastName

        // Update Modal states
        setOpenModal(false)
        setModalMessage('')

        // Set the global variable user with the credentials
        dispatch(setUser({accessToken, role, username, firstName, lastName}))
        navigate(from, {replace: true})
      } catch(err) {
        setOpenModal(false)
        setModalMessage('')
        setAlert(-1)
        if(!err?.response) {
          console.log(err)
          setMessage('No Server Response')
        } else if(err.response?.status === 400) {
          setMessage('Missing username/password')
        } else if(err.response?.status === 401) {
          console.log(err.response)
          if(err.response?.data?.message) 
            setMessage(err.response?.data.message)
          else 
            setMessage('Unauthorized')
        } else {
          setMessage('Login Failed')
        }
      }
    }


    return(
      <>
        <form onSubmit={handleLoginButton}>
          <Typography variant="h2" style={{margin: '1%', textAlign: 'center'}}>Sign In</Typography>
          <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xs={12}>
              <TextField 
                inputRef={userRef}
                id="username"
                variant="outlined" 
                label="Username" 
                autoComplete="off"
                style={{ minWidth: '100%'}} 
                onChange={(e)=>setUsername(e.target.value)}
                required
                />
            </Grid>
            <Grid item lg={12} sm={12} xs={12}>
              <TextField 
                id="password"
                variant="outlined" 
                label="Password" 
                style={{ minWidth: '100%'}} 
                autoComplete="off"
                type='password'
                required 
                onChange={(e)=>setPassword(e.target.value)}/>
            </Grid>
            {alert === 1 && <SuccessAlert message={message}/>}
            {alert === -1 && <ErrorAlert message={message}/>}
            <Grid item lg={12} sm={12} xs={12}>
              <Button size="large" type="submit" variant="contained" color='primary' onClick={handleLoginButton} disabled={disabled} style={{minWidth: '100%'}}>Sign In</Button>
            </Grid>
            <Grid item>
                <Typography style={{marginRight: '10px'}}>Don't have an account yet?</Typography>
                <Button size="small" variant="outlined" onClick={() => handleClick()}>Register Here</Button>
            </Grid>
          </Grid>
        </form>
        <GeneralModal message={modalMessage} openModal={openModal} />
      </>
    )
}

export default LogIn  