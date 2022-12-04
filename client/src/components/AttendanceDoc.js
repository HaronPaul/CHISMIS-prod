import React from 'react'
import styled from 'styled-components'
import { makeStyles } from '@mui/styles'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const TableContainer  = styled.div`
    width: 100%;
    overflow: scroll;
`

const TableStyle = styled.table`
    width: 100%;
    font-family: 'Arial';
`

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const TableColumn = styled.td`
    background-color: ${props => props.bg === 1? '#64b5f6': '#eeeeee'};
    padding: 3px;
    max-width: 3px;
    text-align: center;
`

const Cell = styled.td`
    background-color: ${props => props.bg > 2? 'red':(props.bg == 2? '#ffb74d':'#eeeeee' )};
    padding: 3px;
    max-width: 3px;
    text-align: center;
`
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


const useStyle = makeStyles({
    saveButtonStyle: {
        width: '20%',
        marginTop: '20px',
        backgroundColor: '#1976d2',
        padding: '10px',
        borderRadius: '7px',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'Roboto',
        fontSize: '14px',
        alignSelf: 'flex-end',
        '&:hover': {
            backgroundColor: '#1769aa',
            
        }
    },
    
    tableColumnStyle: {
        backgroundColor: '#eeeeee',
        padding: '10px',
        maxWidth: '3px'
    }
})


const AttendanceDoc = ({attendance1, attendance2, section1, section2, month, reliever, relieverShift}) => {
    const classes = useStyle()

    return(
        <MainContainer>
        <TableContainer>
            <TableStyle id="attendanceTable">
                <tr>
                    <th className={classes.tableColumnStyle} colSpan={32} bgcolor="#EEEEEE">{monthNames[month - 1]}</th>
                </tr>
                <tr>
                    <TableColumn style={{maxWidth: '40px'}}> <b>Name</b></TableColumn>
                    <th bgcolor="#EEEEEE"> 1 </th>
                    <th bgcolor="#EEEEEE"> 2 </th>
                    <th bgcolor="#EEEEEE"> 3 </th>
                    <th bgcolor="#EEEEEE"> 4 </th>
                    <th bgcolor="#EEEEEE"> 5 </th>
                    <th bgcolor="#EEEEEE"> 6 </th>
                    <th bgcolor="#EEEEEE"> 7 </th>
                    <th bgcolor="#EEEEEE"> 8 </th>
                    <th bgcolor="#EEEEEE"> 9 </th>
                    <th bgcolor="#EEEEEE"> 10 </th>
                    <th bgcolor="#EEEEEE"> 11 </th>
                    <th bgcolor="#EEEEEE"> 12 </th>
                    <th bgcolor="#EEEEEE"> 13 </th>
                    <th bgcolor="#EEEEEE"> 14 </th>
                    <th bgcolor="#EEEEEE"> 15 </th>
                    <th bgcolor="#EEEEEE"> 16 </th>
                    <th bgcolor="#EEEEEE"> 17 </th>
                    <th bgcolor="#EEEEEE"> 18 </th>
                    <th bgcolor="#EEEEEE"> 19 </th>
                    <th bgcolor="#EEEEEE"> 20 </th>
                    <th bgcolor="#EEEEEE"> 21 </th>
                    <th bgcolor="#EEEEEE"> 22 </th>
                    <th bgcolor="#EEEEEE"> 23 </th>
                    <th bgcolor="#EEEEEE"> 24 </th>
                    <th bgcolor="#EEEEEE"> 25 </th>
                    <th bgcolor="#EEEEEE"> 26 </th>
                    <th bgcolor="#EEEEEE"> 27 </th>
                    <th bgcolor="#EEEEEE"> 28 </th>
                    <th bgcolor="#EEEEEE"> 29 </th>
                    <th bgcolor="#EEEEEE"> 30 </th>
                    <th bgcolor="#EEEEEE"> 31 </th>
                </tr>
                <tr>
                    <th colSpan={32} bgcolor="#64b5f6">{section1 || ''}</th>
                </tr>
                {attendance1 && Object.keys(attendance1).map((k, i) => {
                    return (
                    <tr key={k}>
                        {/* Name of the Section */}
                        <th
                        bgcolor="#EEEEEE"
                        style={{ padding: '2px', textAlign: 'center',  textOverflow: 'ellipsis'}}> 
                            {k} 
                        </th>

                        {/* Map the values of the array. These are the shifts */}
                        {attendance1[k]?.map((a, i) => {
                            return(
                                <td 
                                key={i} 
                                bgcolor={a.split('\\').length > 2? 'red':(a.split('\\').length == 2? '#ffb74d':'#eeeeee' )}
                                style={{ textAlign: 'center',  textOverflow: 'ellipsis', width: 'auto'}}>
                                    {a.trim() === ''? '-':a}
                                </td>
                            ) 
                        })}
                    </tr>)
                    })
                }
                {/* Reliever Section */}
                <tr>
                    <th colSpan={32} bgcolor="#EEEEEE">&nbsp;</th>
                </tr>
                <tr>
                    <th bgcolor="#EEEEEE" style={{ padding: '2px', textAlign: 'center',  textOverflow: 'ellipsis'}}> 
                        {reliever || ''} 
                    </th>
                    { relieverShift && relieverShift.map((a,i) => {
                        return(
                            <td 
                            key={i} 
                            bgcolor={a.split('\\').length > 2? 'red':(a.split('\\').length == 2? '#ffb74d':'#eeeeee' )}
                            style={{ padding: '2px', textAlign: 'center',  textOverflow: 'ellipsis'}}>
                                {a.trim() === ''? '-':a}
                            </td>
                        )
                    })
                    }
                </tr>
                <tr>
                    <th colSpan={32} bgcolor="#EEEEEE">&nbsp;</th>
                </tr>
                <tr>
                    <th colSpan={32} bgcolor="#64b5f6">{section2 || ''}</th>
                </tr>
                {attendance2 && Object.keys(attendance2).map((k, i) => {
                    return (
                    <tr key={k}>
                        <th
                        bgcolor="#EEEEEE"
                        style={{ padding: '2px', textAlign: 'center',  textOverflow: 'ellipsis'}}> 
                            {k} 
                        </th>
                        {attendance2[k]?.map((a, i) => {
                            return(
                                <td 
                                key={i} 
                                bgcolor={a.split('\\').length > 2? 'red':(a.split('\\').length == 2? '#ffb74d':'#eeeeee' )}
                                style={{ padding: '2px', textAlign: 'center',  textOverflow: 'ellipsis'}}>
                                    {a.trim() === ''? '-':a}
                                </td>
                            )
                        })}
                    </tr>)
                    })
                }
            </TableStyle>
        </TableContainer>
        <ReactHTMLTableToExcel
            className={classes.saveButtonStyle}
            table="attendanceTable"
            filename="attendance"
            sheet="Attendance Sheet"
            buttonText="Save Attendance Report"/>
        </MainContainer>
    )
}

export default AttendanceDoc    