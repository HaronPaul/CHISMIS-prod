import React from 'react'
import styled from 'styled-components'
import { Typography } from '@mui/material'
import people from '../assets/icons/people.svg'

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

const device = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`
}

const MainContainer = styled.div`
    margin: 2%;
    padding: 2%;
    display: flex;
    flex-direction: column;
    background-color: whitesmoke;
    border-radius: 10px;
`

const OptionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Box = styled.div`
    position: relative;
    width: 225px;
    height: 225px;
    margin-right: 20px;
    margin-bottom: 20px;
    border-radius: 20px;
    background-color: #00695C;
    /* background: linear-gradient(to top, #2980b9, #2c3e50); */
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;

    transition: all .2s ease-in-out;

    :hover {
        cursor: pointer;
        /* opacity: 0.6; */
        background-color: #009688;
        transform: scale(1.1)
    }
`

const Image = styled.img`
    width: 50%;
    height: 50%;
    object-fit: contain;
`


const Admin = () => {

    return(
        <MainContainer>
            <Typography variant="h2"> Welcome Administrator</Typography>
            <Typography variant='h4' style={{margin: '20px 0'}}> What do you want to do?</Typography>
            <OptionsContainer>
                <Box>
                    <Image src={people}/>
                    <Typography variant='h6' style={{color: 'whitesmoke'}}>Edit Users  </Typography>
                </Box>
                <Box></Box>
                <Box> </Box>
                <Box> </Box>
                <Box> </Box>
                <Box> </Box>
                <Box></Box>
            </OptionsContainer> 
        </MainContainer>
    )
}

export default Admin