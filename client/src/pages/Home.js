import React, {useState} from "react";
import HomeImage from '../assets/wallpaper2.jpg'
import { Grid, Paper, Typography} from "@mui/material";
import {makeStyles} from '@mui/styles'
import Register from '../components/Register'
import LogIn from "../components/Login";
import '@fontsource/bebas-neue'

const paperContainer = {
  width: '70%',
  padding: '2.5rem',
  display: 'flex',
  flexDirection: 'column',
}

const mainTitle = {
  color: 'white',
  textAlign: 'center'
}

const mainContainer = {
  display: 'flex',
  flexDirection: 'row-reverse',
  flexWrap: 'wrap',
}

const rightGrid = {
  color: 'black',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: `url(${HomeImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',

  '@media (minWidth: 600px) and (maxWidth: 900px)': {
    padding: '3%',
  },
}

const leftGrid = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(to top, #136a8a, #267871)',


  '@media (minWidth: 600px) and (maxWidth: 900px)': {
    justifyContent: 'flex-start',
    height: '95vh',
  },
}


const Home = (props) => {
    const [isLogin, setLogin] = useState(1)

    const handleClick = () => {
      isLogin? setLogin(0):setLogin(1)
      console.log(isLogin)
    }

    return(
      <Grid container style={mainContainer}>
        <Grid item lg={6} sm={12} style={rightGrid}>
            <h1 style={{fontFamily: 'Bebas Neue', fontSize: '7rem', letterSpacing: '5px', color: 'white', textShadow: '2px 2px 10px rgba(0, 0, 0, 1)'}}> CHISMIS </h1>
            <Typography variant="h4" style={mainTitle}>Centralized Historical and Integrated Shift Management Information System</Typography>
        </Grid>
        <Grid item lg={6} sm={12} style={leftGrid}>
          <Paper style={paperContainer} elevation={7}>
            {isLogin===1? <LogIn handleClick={handleClick}/>:<Register handleClick={handleClick}/>}
          </Paper>
        </Grid>
      </Grid>
    )
}

export default Home