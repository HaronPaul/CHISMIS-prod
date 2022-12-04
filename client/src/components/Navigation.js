import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');

    margin: 0;
    width: 100%;
    height: 7vh;
    background-color: black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
`

const Brand = styled.h1`
    color: white;
    margin-left: 2%;
`


const Navigation = () => {
    return(
        <Container>
            <Brand>CHISMIS</Brand>
        </Container>
    )
}

export default Navigation;