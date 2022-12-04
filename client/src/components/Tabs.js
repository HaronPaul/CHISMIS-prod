import React, { useState } from 'react'
import {Tabs, Tab} from '@mui/material'
import { makeStyles } from '@mui/styles'

import ControlRoomTab from './AllTabs/ControlRoomTab'
import HCLTab from './AllTabs/HCLTab'
import EvapTabs from './AllTabs/EvapTabs'
import BrineTab from './AllTabs/BrineTab'
import ElectrolysisTab from './AllTabs/ElectrolysisTab'
import NaCLOTab from './AllTabs/NaClOTab'
import QCBrine from './AllTabs/QCBrine'
import SpecificUsagesTab from './AllTabs/SpecificUsages'
import {useSelector} from 'react-redux'
 
const useStyles = makeStyles({
    mainContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    container: {
        width: (props) => props.editMode? '100%':'90%',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
        backgroundColor: '#4dabf5',
    },

    tabPanelContainer: {
        width: (props) => props.editMode? '100%':'90%',
        backgroundColor: 'whitesmoke',
        boxSizing: 'border-box',
        padding: '1%'
    }
})

const OSRTabs = (props) => {
    const classes = useStyles(props)
    const [value, setValue] = useState(0)
    const {shift} = useSelector((state) => state.section)    

    const handleTabs = (event, value) => {
        setValue(value)
    }

    return( 
        <>
        <div className={classes.mainContainer}>
            <div className={classes.container}>
                <Tabs 
                    value={value}
                    onChange={handleTabs}
                    variant="fullWidth" 
                    scrollButtons="auto"
                    indicatorColor='secondary'
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "#000000"
                         }
                    }}>
                        <Tab label="Control Room" wrapped />
                        <Tab label="HCL" wrapped />
                        <Tab label="Evaporator" wrapped /> 
                        <Tab label="Primary Brine" wrapped/> 
                        <Tab label="Electrolysis" wrapped /> 
                        <Tab label="Hypochlorite" wrapped/> 
                        {parseInt(shift) === 2 && <Tab label="QC Brine" wrapped/>} 
                        <Tab label="Specific Usages" wrapped/>
                </Tabs>
            </div>
            <div className={classes.tabPanelContainer} >
                <TabPanel value={value} shift={shift}></TabPanel>
            </div>
        </div>
        </>
    )
}

const TabPanel = ({value, shift}) => {
    switch(value) {
        case 0: return <ControlRoomTab/>
        case 1: return <HCLTab />
        case 2: return <EvapTabs />
        case 3: return <BrineTab />
        case 4: return <ElectrolysisTab />
        case 5: return <NaCLOTab/>
        case 6: 
            if(parseInt(shift) === 2) return <QCBrine />
            else return <SpecificUsagesTab/> 
        case 7: return <SpecificUsagesTab/>  
        default: return <ControlRoomTab />
    }
}

export default OSRTabs