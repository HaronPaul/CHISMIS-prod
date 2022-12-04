import React, {useState, useEffect} from "react";
import {Grid, Paper, Typography, Button} from '@mui/material'
import { makeStyles } from '@mui/styles'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import styled from "styled-components";
import {useNavigate, useLocation} from 'react-router-dom'

import { useSelector } from "react-redux";

const UserContainer = styled.div`
    background: linear-gradient(to right, #4568dc, #b06ab3);
    display: flex;
    flex-direction: column;
    padding: 3%;
    border-radius: 20px;
`

const MiniContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: "blue";
`

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

const useStyles = makeStyles({
    paperContainer: {
        margin: '10px 0',
        padding: '20px',
    },

    gridContainer: {
        display: 'flex',
        alignItems: 'center'
    }
})

const UserDetails = ({user, handleClick, index, verified, handleDeleteClick}) => {
    const classes = useStyles()

    let roleText
    if(user.role === 1999)
        roleText = 'Administrator'
    else if(user.role === 2121)
        roleText = 'Supervisor'
    else
        roleText = 'Manager'
    
    return(
        <Paper elevation={6} className={classes.paperContainer}>
            <Grid container spacing={1} className={classes.gridContainer}> 
                <Grid item lg={6} sm={4} xs={6}>
                    <Typography variant="h6">{user.firstName.toUpperCase()} {user.lastName.toUpperCase()}</Typography>
                </Grid>
                <Grid item lg={2} sm={6} xs={6}>
                    <MiniContainer>
                        <Typography style={{textAlign: 'center'}}>{roleText}</Typography>
                    </MiniContainer>
                </Grid>
                <Grid item lg={2} sm={6} xs={12}>
                    {!verified && 
                        <Button variant="contained" color="primary" style={{minWidth: '100%'}} onClick={() => handleClick(index)}>Verify</Button>
                    }
                </Grid>
                <Grid item lg={2} sm={6} xs={12}>
                    <Button variant="contained" color="secondary" style={{minWidth: '100%'}} onClick={() => handleDeleteClick(index)}>Delete</Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

const ManageUsers = () => {
    const classes = useStyles()
    const [unverifiedUsers, setUnverifiedUsers] = useState([])
    const axiosPrivate = useAxiosPrivate()

    const {id} = useSelector((state) => state.user)

    const navigate = useNavigate()
    const location = useLocation()

    const handleVerifyClick = async (index) => {
        try {
            const response = await axiosPrivate.put(`/user/${unverifiedUsers[index]._id}`, {verified: true})
            if(response.status === 200)
            
            // setUnverifiedUsers((unverifiedUsers) => unverifiedUsers.filter((_, i)=> i !== index))
            setUnverifiedUsers(unverifiedUsers.map((u,i) => {
                if(i === index) {
                    return {...u, verified: true}
                }

                return u
            }))

        } catch(error) {
            console.log(error.message)
        }
    }

    const handleDeleteClick = async (index) => {
        console.log('Delete button clicked')
        try {
            const response = await axiosPrivate.delete(`/user/${unverifiedUsers[index]._id}`)
            setUnverifiedUsers((unverifiedUsers) => unverifiedUsers.filter((_, i)=> i !== index))
        } catch(err) {
            console.log(err)
        }
    }


    useEffect(()=> {
        let isMounted = true
        const controller = new AbortController()

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/user', {
                    signal: controller.signal
                }) 
                console.log(response.data)
                isMounted && setUnverifiedUsers(response.data)
            } catch(error) {
                navigate('/', {state: {from: location},  replace: true})
            }
        }

        getUsers()
        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    return(
        <MainContainer>
            <Container>
                <Typography variant="h2" style={{marginBottom: '1.5%'}}> Manage Users </Typography>
                <UserContainer>
                    <Typography variant="h4" style={{color: 'white'}}> Pending Users</Typography>
                    {unverifiedUsers.map((user, index) => {
                        if(!user.verified) {
                            return(
                                <UserDetails 
                                    user={user} 
                                    key={index} 
                                    handleClick={handleVerifyClick} 
                                    handleDeleteClick={handleDeleteClick} 
                                    index={index}
                                    verified={false} />
                            )
                        }
                    })}
                </UserContainer>
                <UserContainer style={{marginTop: '1.5%'}}>
                    <Typography variant="h4" style={{color: 'white'}}> Verified Users</Typography>
                    {unverifiedUsers.map((user, index) => {
                        if(user.verified && (user._id !== id)) {
                            return(
                                <UserDetails 
                                    user={user} 
                                    key={index} 
                                    handleClick={handleVerifyClick} 
                                    handleDeleteClick={handleDeleteClick} 
                                    index={index}
                                    verified={true} />
                            )
                        }
                    })}
                </UserContainer>
            </Container>
        </MainContainer>
    )
}

export default ManageUsers