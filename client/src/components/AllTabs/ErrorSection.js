import React from "react"
import styled from 'styled-components'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Alert from '@mui/material/Alert'

const ErrorContainer = styled.div`
    width: 100%;
    height: 125px;
    margin: 1% 0 0 0;
    overflow: auto;
    border-radius: 20px;
`

const ErrorSection = ({errors, type}) => {
    return(
        <ErrorContainer>
            <List>
                {errors.map(err => {
                    return(
                        <ListItem key={type + errors.indexOf(err)}> 
                            <Alert severity="error" style={{width: '100%'}}>{err}</Alert>    
                        </ListItem>   
                    )    
                })}
            </List>
        </ErrorContainer>
    )
}

export default ErrorSection
