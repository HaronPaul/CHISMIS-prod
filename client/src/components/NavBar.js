import {Typography, AppBar, Box, Toolbar, Button, } from '@mui/material'
import styled from 'styled-components'
import "@fontsource/bebas-neue"
import "@fontsource/roboto"
import { Link, useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout'

// Redux Imports
import {useSelector} from 'react-redux'

const NavContainer = styled.div`
    width: 100%;
    height: 80px;
    background-color: #263238;
    display: flex;
`

const Container1 = styled.div`
    display: flex;
    color: whitesmoke;
    align-items: center;
    flex-grow: 1;
`

const ItemsContainer = styled.div`
    display: flex;
    color: whitesmoke;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 1;
    gap: 25px;
    padding-right: 20px;
    font-family: 'Roboto';
`

const Logo = styled.h3`
    font-family: "Bebas Neue";
    letter-spacing: 2px;
    font-size: 2.3rem;
    margin-left: 30px;
`

const NavItem = styled.h3`
    color: whitesmoke;
    text-decoration: none;
    font-weight: 200;
    font-size: 1.1rem;

    &:hover{
        color: #b0bec5;
        transition: ease-in-out 1ms;
    }
`

const NavBar = () => {
    const { userLoggedIn } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const logout = useLogout()

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }
        
    return (
        <NavContainer>
            <Container1>
                <Logo> CHISMIS </Logo> 
            </Container1>
            <ItemsContainer>
                {!userLoggedIn &&
                <Link to='/' style={{textDecoration: 'none'}}>
                    <NavItem> Login </NavItem> 
                </Link>
                }
                {userLoggedIn && 
                    <Link to='/home' style={{textDecoration: 'none'}}>
                        <NavItem> Home </NavItem> 
                    </Link>
                }
                <Link to='attendance' style={{textDecoration: 'none'}}>
                    <NavItem> Attendance </NavItem> 
                </Link>
                <Link to='weekly' style={{textDecoration: 'none'}}>
                    <NavItem> Weekly Reports </NavItem>
                </Link> 
                <Link to='view' style={{textDecoration: 'none'}}>
                    <NavItem> Shift Reports </NavItem> 
                </Link>
                <Link to='inventory' style={{textDecoration: 'none'}}>
                    <NavItem> Inventory </NavItem> 
                </Link>
                {userLoggedIn && <Button variant='contained' color='secondary' onClick={handleLogout}> Logout </Button>}
            </ItemsContainer>
        </NavContainer>
    )
}

export default NavBar