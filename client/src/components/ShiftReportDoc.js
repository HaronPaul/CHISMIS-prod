import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import { useSelector } from "react-redux";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { makeStyles } from "@mui/styles";
import "@fontsource/roboto"

const TableContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
`

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const tableStyle = {
    tableLayout: 'fixed'
}

const tdStyle = {
    maxWidth: '230px',
    wordWrap: 'break-word',
    padding: '10px',
    whiteSpace: 'pre-wrap'
}

const useStyle = makeStyles({
    saveButtonStyle: {
        marginTop: '20px',
        backgroundColor: '#1976d2',
        padding: '10px',
        borderRadius: '7px',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'Roboto',
        fontSize: '14px',
        '&:hover': {
            backgroundColor: '#1769aa'
        }
    },
})

function getDay(date) {
    try {
        const jsDate = new Date(date)
        if(isNaN(jsDate)) {
            console.log("Not a valid date")
            return;
        }

        if(jsDate.getDay() == 1) {
            let monday = date.split('/')[1]
            let increment = 0
            while(monday > 0) {
                monday -= 7
                increment++            
            }
            return {isMonday: true, numMonday: increment}
        } else {
            return {isMonday: false}
        }
    }catch(error) {
        return {isMonday: false, error}
    }
}

const ShiftReportDoc = ({download}) => {
    const {controlRoomSection, hclSection, evapSection, prBrineSection, electroSection, nacloSection, qcBrineSection, usagesSection} = useSelector((state) => state.section)
    const {date, shift, currentSupervisor, incomingSupervisor, manager} = useSelector((state)=> state.section)
    const [monday, setMonday] = useState(0)
    const classes = useStyle()

    useEffect(() => {
        const day = getDay(date)
        if(day.isMonday) {
            setMonday(day.numMonday)
        }
    }, [date])

    return(
        <MainContainer>
            <TableContainer>
                <table border="1" align="center" cellPadding={2} cellSpacing="0" style={tableStyle} id="shiftReportTable">
                    <thead> 
                        <tr>
                            <td colSpan={5} align="center"><font face="Arial" size="2"> <b> Date: {date || ''} </b> </font></td>
                            <td colSpan={6} align="center"><font face="Arial" size="2"> <b> Shift: {shift || ''}  </b> </font></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td width={170} bgcolor="#BFBFBF" align="center"><font face="Arial" size="2"> <b> Control Room </b> </font></td>
                            <td width={75} bgcolor="#BFBFBF" align="center" colSpan={2}><font face="Arial" size="2">{controlRoomSection.hours  || ''} hours</font></td>
                            <td width={150} bgcolor="#BFBFBF" align="center"><font face="Arial" size="2"> <b> Prev Optr </b></font></td>
                            <td width={150} bgcolor={controlRoomSection.previous_operator === ''? "#f6685e":"#BFBFBF"} colSpan={3} align="center">
                                <font face="Arial" size="2">{controlRoomSection.previous_operator || ''}</font>
                            </td>
                            <td width={150} bgcolor="#BFBFBF" align="center"><font face="Arial" size="2"><b> Pres Optr </b></font></td>
                            <td 
                            width={150} 
                            bgcolor={controlRoomSection.present_operator === ''? "#f6685e":"#BFBFBF"} 
                            colSpan={3} 
                            align="center">
                                <font face="Arial" size="2">{controlRoomSection.present_operator || ''}</font>
                            </td>
                            <td 
                            bgcolor="#BFBFBF" 
                            colSpan={2} 
                            align="center"
                            >
                                <font face="Arial" size="2">OPERATIONAL REMARKS</font>
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                <font face="Arial" size="2"> <b>Interlock engaged </b></font>
                            </td>
                            <td align="center" colSpan={2}>
                                <font face="Arial" size="2">{controlRoomSection.interlock_engaged || ''}</font>
                            </td>
                            <td align="center">
                                <font face="Arial" size="2"><b>Cells</b></font>
                                </td>
                            <td align="center" colSpan={3}>
                                <font face="Arial" size="2">{controlRoomSection.cells || ''}</font>
                            </td>
                            <td align="center"><font face="Arial" size="2"> <b> Cells w/ voltage</b></font></td>
                            <td 
                            align="center" 
                            colSpan={3}
                            bgcolor={controlRoomSection.cells_voltage? "f6685e":"white"}>
                                <font face="Arial" size="2">{controlRoomSection.cells_voltage || ''}</font>
                            </td>
                            <td 
                            rowSpan={3} 
                            colSpan={2} 
                            align="center"
                            style={tdStyle}
                            >
                                <font face="Arial" size="2">{controlRoomSection.remarks || ''}</font>
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                <font face="Arial" size="2"><b>DAQ Operational</b></font>
                            </td>
                            <td align="center" colSpan={2}>
                                <font face="Arial" size="2">{controlRoomSection.daq_operational || ''}</font>
                            </td>
                            <td align="center">
                                <font face="Arial" size="2"><b> Ave(13.25) / EOS(13.25): </b></font>
                            </td>
                            <td 
                            align="center" 
                            colSpan={3}
                            bgcolor={(controlRoomSection.avg_load || controlRoomSection.eos_load)? ((controlRoomSection.avg_load < 13.25 || controlRoomSection.eos_load < 13.25)? "#f6685e":"white"):"white"}
                            >
                                <font face="Arial" size="2">{controlRoomSection.avg_load || ''} / {controlRoomSection.eos_load || ''} </font>
                            </td>
                            <td align="center">
                                <font face="Arial" size="2"><b> Cells tot volt {"<"} 299.2: </b> </font>
                            </td>
                            <td
                            align="center" 
                            colSpan={3} 
                            bgcolor={controlRoomSection.cells_total_voltage? (controlRoomSection.cells_total_voltage >= 299.2? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2">{controlRoomSection.cells_total_voltage || ''}</font>
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                <font face="Arial" size="2"> <b>Recti RW (≥250): </b></font>
                            </td>
                            <td 
                            align="center" 
                            colSpan={2} 
                            bgcolor={controlRoomSection.rr_water? (controlRoomSection.rr_water < 250? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2">{controlRoomSection.rr_water || ''}</font>
                            </td>
                            <td align="center">
                                <font face="Arial" size="2"> <b>Recti DW (≥180): </b></font>
                            </td>
                            <td
                            align="center" 
                            colSpan={3} 
                            bgcolor={controlRoomSection.rd_water? (controlRoomSection.rd_water < 180? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2" >{controlRoomSection.rd_water || ''}</font>
                            </td>
                            <td align="center">
                                <font face="Arial" size="2"><b> X'formr Oil Temp({"<"}90): </b></font>
                            </td>
                            <td 
                            align="center" 
                            colSpan={3}
                            bgcolor={controlRoomSection.xformer_oil_temp? (controlRoomSection.xformer_oil_temp >= 90? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2">{controlRoomSection.xformer_oil_temp || ''}</font>
                            </td>
                        </tr>

                        {/* ------------- HCL Section -----------------------*/}
                        <tr>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2" ><b>HCL</b></font></td>
                            <td width={75} bgcolor="#BFBFBF" align="center"><font face="Arial" size="2" ><b>Eff% </b></font></td>
                            <td width={75} bgcolor="#BFBFBF" align="center"><font face="Arial" size="2" >{hclSection.hcl_synth_eff}</font></td>
                            <td bgcolor="#BFBFBF" align="center"> <font face="Arial" size="2" ><b>Prev Optr</b></font></td>
                            <td 
                            bgcolor={hclSection.previous_operator === ''? "#f6685e":"#BFBFBF"} 
                            align="center" 
                            colSpan={3}
                            >
                                <font face="Arial" size="2" >{hclSection.previous_operator || ''}</font>
                            </td>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2" ><b>Pres Optr</b></font></td>
                            <td 
                            bgcolor={hclSection.present_operator === ''? "#f6685e":"#BFBFBF"}  
                            align="center" colSpan={3}><font face="Arial" size="2" >{hclSection.present_operator || ''}</font></td>
                            <td 
                            rowSpan={4} 
                            colSpan={2} 
                            align="center"
                            style={tdStyle}
                            >
                                <font face="Arial" size="2">{hclSection.remarks || ''}</font>
                            </td>
                        </tr>
                        <tr>
                            <td 
                            align="center">
                                <font face="Arial" size="2" ><b>HCL (11.01):</b></font>
                            </td>
                            <td 
                            align="center" 
                            colSpan={2}
                            bgcolor={hclSection.hcl? (hclSection.hcl < 11.01? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2">{hclSection.hcl || ''} dmt</font>
                            </td>
                            <td align="center">
                                <font face="Arial" size="2"><b>Conc (32+1.5%)</b></font>
                            </td>
                            <td 
                            align="center"
                            bgcolor={hclSection.hcl_conc? ((hclSection.hcl_conc < 32 || hclSection.hcl_conc >33.5)? "#f6685e": "white"):"white"}
                            width={75}
                            >
                                <font face="Arial" size="2">{hclSection.hcl_conc || ''}</font>
                            </td>
                            <td 
                            align="center"
                            width={75}>
                                <font face="Arial" size="2"><b>SG</b></font>
                            </td>
                            <td 
                            align="center"
                            width={75}>
                                <font face="Arial" size="2">{hclSection.hcl_sg || ''}</font>
                            </td>
                            <td align="center">
                                <font face="Arial" size="2"><b>Cl2H2O flowrate (20)</b></font>
                            </td>
                            <td 
                            align="center" 
                            colSpan={3}
                            bgcolor={hclSection.clh20_flowrate? (hclSection.clh20_flowrate < 20? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2">{hclSection.clh20_flowrate || ''} m³/hr</font>
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                <font face="Arial" size="2" ><b>Scrub Cl2(40 mx)</b></font>
                            </td>
                            <td 
                            align="center" 
                            colSpan={2}
                            bgcolor={hclSection.scrubbed_cl_temp? (hclSection.scrubbed_cl_temp > 40? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2" >{hclSection.scrubbed_cl_temp || ''} &deg;C</font>
                            </td>
                            <td align="center" colSpan={1}><font face="Arial" size="2" > <b>Sigri cool H2O (3) </b></font></td>
                            <td 
                            align="center" 
                            colSpan={3}
                            bgcolor={hclSection.sigri_cooling_water? (hclSection.sigri_cooling_water != 3? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2" >{hclSection.sigri_cooling_water || ''} ksc</font>
                            </td>
                            <td align="center"><font face="Arial" size="2" ><b>Sigri in pres(Cl2/H2):</b></font></td>
                            <td 
                            align="center"
                            bgcolor={hclSection.sigri_inlet_pressure_c? (hclSection.sigri_inlet_pressure_c > 250? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2">{hclSection.sigri_inlet_pressure_c || ''}</font>
                            </td>
                            <td 
                            align="center" 
                            colSpan={2}
                            bgcolor={hclSection.sigri_inlet_pressure_h? (hclSection.sigri_inlet_pressure_h > 250? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2" >{hclSection.sigri_inlet_pressure_h || ''}</font>
                            </td>
                        </tr>
                        <tr>
                            <td align="center"><font face="Arial" size="2" ><b> HCL prod (50 mx) </b></font></td>
                            <td
                            align="center" colSpan={2}
                            bgcolor={hclSection.hcl_prod? (hclSection.hcl_prod_temp > 50? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2">{hclSection.hcl_prod_temp || ''} &deg;C</font>
                            </td>
                            <td align="center"><font face="Arial" size="2" ><b>HCL Space (378)</b></font></td>
                            <td 
                            align="center" 
                            colSpan={3}
                            bgcolor={hclSection.hcl_space? (hclSection.hcl_space < 200? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2" >{hclSection.hcl_space || ''} m³</font>
                            </td>
                            <td align="center" ><font face="Arial" size="2"><b>Full N2 on site (10 min)</b></font></td>
                            <td 
                            align="center" 
                            colSpan={3}
                            bgcolor={hclSection.full_n2? (hclSection.full_n2 <10? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2" >{hclSection.full_n2 || ''} cyl</font>
                            </td>
                        </tr>

                        {/* Evaporator Section */}
                        <tr>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2" ><b>Evap</b></font></td>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2">Eff%</font></td>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2" >{evapSection.evap_eff || ''}</font></td>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2" ><b>Prev Optr</b></font></td>
                            <td 
                            bgcolor={evapSection.previous_operator === ''? "#f6685e":"#BFBFBF"}
                            align="center" colSpan={3}><font face="Arial" size="2" >{evapSection.previous_operator || ''}</font></td>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2" ><b>Pres Optr</b></font></td>
                            <td 
                            bgcolor={evapSection.present_operator === ''? "#f6685e":"#BFBFBF"}
                            align="center" colSpan={3} ><font face="Arial" size="2" >{evapSection.present_operator || ''}</font></td>
                            <td 
                            rowSpan={3} 
                            colSpan={2} 
                            align="center"
                            style={tdStyle}
                            >
                                <font face="Arial" size="2">{evapSection.remarks || ''}</font>
                            </td>
                        </tr>
                        <tr>
                            <td align="center"><font face="Arial" size="2"><b>NaOH (10.83): </b></font></td>
                            <td 
                            align="center" 
                            colSpan={2}
                            bgcolor={evapSection.naoh_prod? (evapSection.naoh_prod< 10.83? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2">{evapSection.naoh_prod || ''} dmt</font>
                            </td>
                            <td align="center"><font face="Arial" size="2"><b>Conc (49±1%)</b></font></td>
                            <td 
                            align="center"
                            bgcolor={evapSection.naoh_conc? ((evapSection.naoh_conc< 48 || evapSection.naoh_conc > 50)? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2">{evapSection.naoh_conc || ''}</font>
                            </td>
                            <td align="center"><font face="Arial" size="2"><b>SG</b></font></td>
                            <td align="center">
                                <font face="Arial" size="2">{evapSection.naoh_sg || ''}</font>
                            </td>
                            <td align="center"><font face="Arial" size="2"><b>Vac Press (400-600)</b></font></td>
                            <td 
                            align="center" 
                            colSpan={3}
                            bgcolor={evapSection.vacuum_pressure? ((evapSection.vacuum_pressure< 400 || evapSection.vacuum_pressure > 600)? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2">{evapSection.vacuum_pressure || ''} mmHg</font>
                            </td>
                        </tr>
                        <tr>
                            <td  align="center"><font face="Arial" size="2" ><b>Evap feed (3-5):</b></font></td>
                            <td 
                            align="center" 
                            colSpan={2}
                            bgcolor={evapSection.evap_feed_flowrate? ((evapSection.evap_feed_flowrate < 3|| evapSection.evap_feed_flowrate > 5)? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2">{evapSection.evap_feed_flowrate || ''} m³/hr</font>
                            </td>
                            <td align="center"><font face="Arial" size="2" ><b>TK9 Level (688)</b></font></td>
                            <td 
                            align="center" 
                            colSpan={3}
                            bgcolor={evapSection.t9_level? (evapSection.t9_level < 300? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2" >{evapSection.t9_level || ''} %/m³</font>
                            </td>
                            <td align="center"><font face="Arial" size="2" ><b>TK8 Level (688)</b></font></td>
                            <td 
                            align="center" 
                            colSpan={3}
                            bgcolor={evapSection.t8_level? (evapSection.t8_level < 300? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2" >{evapSection.t8_level || ''} %/m³</font>
                            </td>
                        </tr>

                        {/* Primary Brine Section */}
                        <tr>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2" ><b>Primary Brine</b></font></td>
                            <td bgcolor="#BFBFBF" align="center" colSpan={2}><font face="Arial" size="2" >&nbsp;</font></td>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2" ><b>Prev Optr</b></font></td>
                            <td 
                            bgcolor={prBrineSection.previous_operator === ''? "#f6685e":"#BFBFBF"} 
                            colSpan={3} 
                            align="center">
                                <font face="Arial" size="2" >{prBrineSection.previous_operator}</font>
                            </td>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2" ><b>Pres Optr</b></font></td>
                            <td 
                            bgcolor={prBrineSection.present_operator === ''? "#f6685e":"#BFBFBF"}  
                            colSpan={3} align="center"><font face="Arial" size="2" >{prBrineSection.present_operator}</font></td>
                            <td 
                            rowSpan={4} 
                            colSpan={2} 
                            align="center"
                            style={tdStyle}
                            >
                                <font face="Arial" size="2">{prBrineSection.remarks}</font>
                            </td>
                        </tr>
                        <tr>
                            <td  align="center"><font face="Arial" size="2">Salt load (6-10):</font></td>
                            <td 
                            align="center" 
                            colSpan={2}
                            bgcolor={prBrineSection.salt_loaded? ((prBrineSection.salt_loaded < 6 ||prBrineSection.salt_loaded > 10)? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2">{prBrineSection.salt_loaded}</font>
                            </td>
                            <td align="center"><font face="Arial" size="2">Ca+Mg (5 max)</font></td>
                            <td 
                            align="center" 
                            colSpan={3}
                            bgcolor={prBrineSection.camg_conc? (prBrineSection.camg_conc > 5? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2">{prBrineSection.camg_conc}</font>
                            </td>
                            <td align="center"><font face="Arial" size="2">Brine overflow</font></td>
                            <td 
                            bgcolor={prBrineSection.brine_overflow? (prBrineSection.brine_overflow !== "NONE"? "#f6685e": "white"):"white"}
                            align="center" 
                            colSpan={3}
                            >
                                <font face="Arial" size="2">{prBrineSection.brine_overflow}</font>
                            </td>
                        </tr>
                        <tr>
                            <td  align="center"><font face="Arial" size="2" >Pol Brine (280-320)</font></td>
                            <td 
                            align="center" 
                            colSpan={2}
                            bgcolor={prBrineSection.pbrine_conc? ((prBrineSection.pbrine_conc < 280|| prBrineSection.pbrine_conc > 320)? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2" >{prBrineSection.pbrine_conc} gpl</font>
                            </td>
                            <td align="center">
                                <font face="Arial" size="2" >Xcess NaOH (0.1-1.5)</font>
                            </td>
                            <td 
                            align="center" 
                            colSpan={3}
                            bgcolor={prBrineSection.xcess_naoh_conc? ((prBrineSection.xcess_naoh_conc < 0.1|| prBrineSection.xcess_naoh_conc > 1.5)? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2" >{prBrineSection.xcess_naoh_conc} gpl</font>
                                </td>
                            <td align="center"><font face="Arial" size="2" >Xcess Na₂CO₃(0.1-1.5)</font></td>
                            <td  
                            align="center" 
                            colSpan={3}
                            bgcolor={prBrineSection.xcess_na2co3_conc? ((prBrineSection.xcess_na2co3_conc < 0.1 || prBrineSection.xcess_na2co3_conc > 1.5)? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2" >{prBrineSection.xcess_na2co3_conc} gpl</font>
                            </td>
                        </tr>
                        <tr>
                            <td align="center"><font face="Arial" size="2">Precoat (75hrs):</font></td>
                            <td 
                            align="center"
                            >
                                <font face="Arial" size="2">{prBrineSection.precoat}</font>
                            </td>
                            <td 
                            align="center"
                            bgcolor={prBrineSection.precoat_op_hours? (prBrineSection.precoat_op_hours < 24? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2">{prBrineSection.precoat_op_hours}</font>
                            </td>
                            <td align="center"><font face="Arial" size="2">∆P(0.2):</font></td>
                            <td 
                            align="center" 
                            colSpan={3}
                            bgcolor={prBrineSection.diff_pressure_precoat? (prBrineSection.diff_pressure_precoat > 0.2? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2">{prBrineSection.diff_pressure_precoat}</font>
                            </td>
                            <td align="center"><font face="Arial" size="2">Flow (20 min)</font></td>
                            <td 
                            align="center" 
                            colSpan={3}
                            bgcolor={prBrineSection.precoat_flowrate? (prBrineSection.precoat_flowrate < 20? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2">{prBrineSection.precoat_flowrate}</font>
                            </td>
                        </tr>

                        {/* Electorylysis Section */}
                        <tr>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2" ><b>Electrolysis</b></font></td>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2" ><b> Eff% </b></font></td>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2" >{electroSection.electro_eff}</font></td>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2" ><b>Prev Optr</b></font></td>
                            <td 
                            colSpan={3} 
                            align="center"
                            bgcolor={electroSection.previous_operator.trim() === ''? 'f6685e':"#BFBFBF"}
                            >
                                <font face="Arial" size="2" >{electroSection.previous_operator}</font>
                            </td>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2" ><b> Pres Optr </b></font></td>
                            <td 
                            bgcolor="#BFBFBF" 
                            colSpan={3} align="center"
                            bgcolor={electroSection.present_operator.trim() === ''? 'f6685e':"#BFBFBF"}>
                                <font face="Arial" size="2" >{electroSection.present_operator}</font>
                            </td>
                            <td 
                            rowSpan={4} 
                            colSpan={2} 
                            align="center"
                            style={tdStyle}
                            >
                                <font face="Arial" size="2">{electroSection.remarks}</font>
                            </td>
                        </tr>
                        <tr>
                            <td align="center"><font face="Arial" size="2" >Cell Liquor (11.90):</font></td>
                            <td 
                            align="center" 
                            colSpan={2}
                            bgcolor={electroSection.cell_liq_prod? (electroSection.cell_liq_prod < 11.90? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2" >{electroSection.cell_liq_prod} dmt</font>
                            </td>
                            <td align="center" colSpan={1}><font face="Arial" size="2">Conc(31±1%)</font></td>
                            <td 
                            align="center" 
                            colSpan={3}
                            bgcolor={electroSection.naoh_conc? ((electroSection.naoh_conc < 31 ||electroSection.naoh_conc > 33)? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2" >{electroSection.naoh_conc}</font>
                            </td>
                            <td align="center"><font face="Arial" size="2" >Full N2 on site (4 min)</font></td>
                            <td 
                            align="center" 
                            colSpan={3}
                            bgcolor={electroSection.full_n2? (electroSection.full_n2 < 4? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2" >{electroSection.full_n2} cylinders</font>
                            </td>
                        </tr>
                        <tr>
                            <td  align="center"><font face="Arial" size="2" >SPB/NaOH(60-90)</font></td>
                            <td 
                            align="center"
                            bgcolor={electroSection.spb_inlet_temp? ((electroSection.spb_inlet_temp < 60 || electroSection.spb_inlet_temp > 70)? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2" >{electroSection.spb_inlet_temp}</font>
                            </td>
                            <td 
                            align="center"
                            bgcolor={electroSection.naoh_inlet_temp? ((electroSection.naoh_inlet_temp < 88 || electroSection.naoh_inlet_temp > 92)? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2" >{electroSection.naoh_inlet_temp}</font></td>
                            <td  align="center" colSpan={1}><font face="Arial" size="2"  >NaOH Flowrate (21) :</font></td>
                            <td 
                            align="center" 
                            colSpan={3}
                            bgcolor={electroSection.naoh_flowrate? ((electroSection.naoh_flowrate < 20 || electroSection.naoh_flowrate > 22)? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2" >{electroSection.naoh_flowrate} m³/hr</font></td>
                            <td align="center"><font face="Arial" size="2" >Decomposer</font></td>
                            <td align="center"><font face="Arial" size="2" >{electroSection.decomposer_op_temp> 65? "ONLINE":"OFFLINE"}</font></td>
                            <td align="center" colSpan={2}><font face="Arial" size="2" >{electroSection.decomposer_op_temp} &deg;C</font></td>
                        </tr>
                        <tr>
                            <td align="center"><font face="Arial" size="2">Chelate (42hrs /tk):</font> </td>
                            <td 
                            align="center"
                            bgcolor={electroSection.chelate_op_hours_ta? (electroSection.chelate_op_hours_ta < 18? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2">A - {electroSection.chelate_op_hours_ta}</font>
                            </td>
                            <td 
                            align="center"
                            bgcolor={electroSection.chelate_op_hours_tb? (electroSection.chelate_op_hours_tb < 18? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2">B - {electroSection.chelate_op_hours_tb}</font>
                            </td>
                            <td align="center"><font face="Arial" size="2">DB Free Cl2</font></td>
                            <td 
                            align="center"
                            bgcolor={electroSection.db_free_cl_qual? (electroSection.db_free_cl_qual === "POSITIVE"? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2">{electroSection.db_free_cl_qual}</font>
                            </td>
                            <td align="center"><font face="Arial" size="2">SG</font></td>
                            <td align="center"><font face="Arial" size="2">{electroSection.naoh_sg}</font></td>
                            
                            <td align="center"><font face="Arial" size="2">DB NaCl (180-220) / SPB (280-320)</font></td>
                            <td 
                            align="center"
                            bgcolor={electroSection.db_conc? ((electroSection.db_conc < 180|| prBrineSection.db_conc > 220)? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2">{electroSection.db_conc}</font>
                            </td>
                            <td 
                            align="center" 
                            colSpan={2}
                            bgcolor={electroSection.spb_conc? ((electroSection.spb_conc < 280|| electroSection.spb_conc > 320)? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2">{electroSection.spb_conc}</font></td>
                        </tr>

                        {/* NaClO Section */}
                        <tr>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2"><b>HYPO: (20.11)</b></font></td>
                            <td bgcolor="#BFBFBF" colSpan={2} align="center"><font face="Arial" size="2"><b>WCl2 ( )</b></font></td>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2"><b>Prev Op</b></font></td>
                            <td 
                            bgcolor={nacloSection.previous_operator === ''? "#f6685e":"#BFBFBF"} 
                            align="center" 
                            colSpan={3}
                            >
                                <font face="Arial" size="2">{nacloSection.previous_operator}</font>
                            </td>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2"><b>Pres Optr</b></font></td>
                            <td 
                            bgcolor={nacloSection.present_operator === ''? "#f6685e":"#BFBFBF"} 
                            align="center" 
                            colSpan={3}>
                                <font face="Arial" size="2">{nacloSection.present_operator}</font>
                            </td>
                            <td 
                            rowSpan={4} 
                            colSpan={2} 
                            align="center"
                            style={tdStyle}
                            >
                                <font face="Arial" size="2">{nacloSection.remarks}</font>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" colSpan={3}><font face="Arial" size="2">Hypo : (7.8±3% NaOCl) / # of batches (60)</font></td>
                            <td 
                            align="center" 
                            bgcolor={nacloSection.naclo_ct1? ((nacloSection.naclo_ct1 < 7.5|| nacloSection.naclo_ct1 > 8.1)? "#f6685e": "white"):"white"}> 
                                <font face="Arial" size="2">{nacloSection.naclo_ct1}</font></td>
                            <td align="center"
                            bgcolor={nacloSection.fline1? (nacloSection.fline1 > 110? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2">{nacloSection.fline1}</font>
                            </td>
                            <td 
                            align="center" 
                            bgcolor={nacloSection.naclo_ct2? ((nacloSection.naclo_ct2 < 7.5|| nacloSection.naclo_ct2> 8.1)? "#f6685e": "white"):"white"}> 
                                <font face="Arial" size="2">{nacloSection.naclo_ct2}</font>
                            </td>
                            <td align="center"
                            bgcolor={nacloSection.fline2? (nacloSection.fline2 > 110? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2">{nacloSection.fline2}</font>
                            </td>
                            <td 
                            align="center" 
                            bgcolor={nacloSection.naclo_ct3? ((nacloSection.naclo_ct3 < 7.5|| nacloSection.naclo_ct3 > 8.1)? "#f6685e": "white"):"white"}> 
                                <font face="Arial" size="2">{nacloSection.naclo_ct3}</font></td>
                            <td align="center"
                            bgcolor={nacloSection.fline3? (nacloSection.fline3 > 110? "#f6685e": "white"):"white"}
                            width={65}>
                                <font face="Arial" size="2">{nacloSection.fline3}</font>
                            </td>
                            <td 
                            align="center"
                            width={80} 
                            bgcolor={nacloSection.naclo_ct4? ((nacloSection.naclo_ct4 < 7.5|| nacloSection.naclo_ct4 > 8.1)? "#f6685e": "white"):"white"}> 
                                <font face="Arial" size="2">{nacloSection.naclo_ct4}</font></td>
                            <td 
                            align="center"
                            bgcolor={nacloSection.fline4? (nacloSection.fline4 > 110? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2">{nacloSection.fline4}</font>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} align="center"><font face="Arial" size="2">Excess NaOH (0.4-1.0%)/ Storage #</font></td>
                            <td 
                            align="center"
                            bgcolor={nacloSection.naoh_ct1? ((nacloSection.naoh_ct1 < 0.4|| nacloSection.naoh_ct1 > 1)? "#f6685e": "white"):"white"}
                            ><font face="Arial" size="2">{nacloSection.naoh_ct1}</font>
                            </td>
                            <td align="center"><font face="Arial" size="2">{nacloSection.storage1}</font></td>
                            <td
                            bgcolor={nacloSection.naoh_ct2? ((nacloSection.naoh_ct2 < 0.4|| nacloSection.naoh_ct2 > 1)? "#f6685e": "white"):"white"} 
                            align="center"><font face="Arial" size="2">{nacloSection.naoh_ct2}</font></td>
                            <td align="center"><font face="Arial" size="2">{nacloSection.storage2}</font></td>
                            <td 
                            bgcolor={nacloSection.naoh_ct3? ((nacloSection.naoh_ct3 < 0.4|| nacloSection.naoh_ct3 > 1)? "#f6685e": "white"):"white"}
                            align="center"><font face="Arial" size="2">{nacloSection.naoh_ct3}</font></td>
                            <td align="center"><font face="Arial" size="2">{nacloSection.storage3}</font></td>
                            <td 
                            bgcolor={nacloSection.naoh_ct4? ((nacloSection.naoh_ct4 < 0.4|| nacloSection.naoh_ct4 > 1)? "#f6685e": "white"):"white"}
                            align="center"><font face="Arial" size="2">{nacloSection.naoh_ct4}</font></td>
                            <td align="center"><font face="Arial" size="2">{nacloSection.storage4}</font></td>
                        </tr>
                        <tr>
                            <td align="center" colSpan={3}><font face="Arial" size="2">Production</font></td>
                            <td 
                            align="center"
                            bgcolor={nacloSection.production? (nacloSection.production < 20? "#f6685e": "white"):"white"}
                            ><font face="Arial" size="2">{nacloSection.production}</font></td>
                            <td align="center" colSpan={4}>
                                <font face="Arial" size="2">Space ({'>='})</font>
                            </td>
                            <td 
                                align="center" 
                                colSpan={3}
                                bgcolor={nacloSection.space? (nacloSection.space < 140? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2">{nacloSection.space}</font>
                            </td>
                        </tr>

                        {/* QC Brine */}
                        {shift === 2 && 
                        <>
                            <tr>
                                <td bgcolor="#BFBFBF" colSpan={3} align="center"><font face="Arial" size="2"><b>QC Brine</b></font></td>
                                <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2"><b>Actual</b></font></td>
                                <td bgcolor="#BFBFBF" colSpan={4} align="center"><font face="Arial" size="2"><b>QC Brine and Product</b></font></td>
                                <td bgcolor="#BFBFBF" colSpan={3} align="center"><font face="Arial" size="2"><b>Actual</b></font></td>
                                <td rowSpan={6} colSpan={2} align="center"><font face="Arial" size="2">&nbsp;</font></td>
                            </tr>
                            <tr>
                                <td align="center" colSpan={3}><font face="Arial" size="2">SPB Ca+Mg (15+5 ppb mx)</font></td>
                                <td
                                bgcolor={qcBrineSection.spb_camg? (qcBrineSection.spb_camg > 20? "#f6685e": "white"):"white"}
                                align="center"
                                ><font face="Arial" size="2">{qcBrineSection.spb_camg}</font></td>
                                <td align="center" colSpan={4}><font face="Arial" size="2">DB Free Cl2 (negative)</font></td>
                                <td 
                                bgcolor={qcBrineSection.db_free_cl? (qcBrineSection.db_free_cl === "POSITIVE"? "#f6685e": "white"):"white"}
                                align="center" 
                                colSpan={3}>
                                    <font face="Arial" size="2">{qcBrineSection.db_free_cl}</font></td>
                            </tr>
                            <tr>
                                <td colSpan={3} align="center"><font face="Arial" size="2">SPB NaClO3 (20 gpl max)</font></td>
                                <td 
                                bgcolor={qcBrineSection.spb_naclo3? (qcBrineSection.spb_naclo3 > 20? "#f6685e": "white"):"white"}
                                align="center"
                                ><font face="Arial" size="2">{qcBrineSection.spb_naclo3}</font></td>
                                <td colSpan={4} align="center"><font face="Arial" size="2">NaOH 50% on-line (49±1%)</font></td>
                                <td 
                                bgcolor={qcBrineSection.naoh_conc_50? ((qcBrineSection.naoh_conc_50 < 48 || qcBrineSection.naoh_conc_50 > 50)? "#f6685e": "white"):"white"}
                                colSpan={3} 
                                align="center"
                                ><font face="Arial" size="2">{qcBrineSection.naoh_conc_50}</font></td>
                            </tr>
                            <tr>
                                <td align="center" colSpan={3} ><font face="Arial" size="2">SPB Na2SO4 (7 gpl max)</font></td>
                                <td
                                bgcolor={qcBrineSection.spb_na2so4? (qcBrineSection.spb_na2so4 > 7? "#f6685e": "white"):"white"}
                                align="center"
                                >
                                    <font face="Arial" size="2">{qcBrineSection.spb_na2so4}</font>
                                </td>
                                <td align="center" colSpan={4}><font face="Arial" size="2">NaOH 32% on-line (31±1%)</font></td>

                                <td 
                                bgcolor={qcBrineSection.naoh_conc_32? ((qcBrineSection.naoh_conc_32 < 31 || qcBrineSection.naoh_conc_32 > 33)? "#f6685e": "white"):"white"}
                                align="center" 
                                colSpan={3}><font face="Arial" size="2">{qcBrineSection.naoh_conc_32} %</font></td>
                            </tr>
                            <tr>
                                <td align="center" colSpan={3}><font face="Arial" size="2">DB NaClO3 (20 gpl max)</font></td>
                                <td 
                                bgcolor={qcBrineSection.db_naclo3? (qcBrineSection.db_naclo3 > 20? "#f6685e": "white"):"white"}
                                align="center"><font face="Arial" size="2">{qcBrineSection.db_naclo3} gpl</font></td>
                                <td align="center" colSpan={4}><font face="Arial" size="2">NaOH Fe (5ppm max)</font></td>
                                <td 
                                bgcolor={qcBrineSection.naohfe_conc? (qcBrineSection.naohfe_conc > 5? "#f6685e": "white"):"white"}
                                align="center" 
                                colSpan={3}>
                                    <font face="Arial" size="2">{qcBrineSection.naohfe_conc} ppm</font>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" colSpan={3}><font face="Arial" size="2">DB NaCl (180-220 gpl)</font></td>
                                <td
                                bgcolor={qcBrineSection.db_nacl? ((qcBrineSection.db_nacl < 180 || qcBrineSection.db_nacl > 220)? "#f6685e": "white"):"white"}
                                align="center"
                                ><font face="Arial" size="2">{qcBrineSection.db_nacl} gpl</font></td>
                                <td align="center" colSpan={4}><font face="Arial" size="2">HCL on-line (32+1.5)</font></td>
                                <td 
                                bgcolor={qcBrineSection.hcl_online? ((qcBrineSection.hcl_online < 32 || qcBrineSection.hcl_online > 33.5)? "#f6685e": "white"):"white"}
                                align="center" 
                                colSpan={3}><font face="Arial" size="2">{qcBrineSection.hcl_online}</font></td>
                            </tr>
                        </>
                        }
                        <tr>
                            <td bgcolor="#BFBFBF" colSpan={3} align="center"><font face="Arial" size="2" ><b>Specific Usages /</b></font></td>
                            <td bgcolor="#BFBFBF" align="center"><font face="Arial" size="2" ><b>Std</b></font></td>
                            <td bgcolor="#BFBFBF" colSpan={4} align="center"><font face="Arial" size="2" ><b>Actual Consumption</b></font></td>
                            <td width={130} bgcolor="#BFBFBF" colSpan={2} align="center"><font face="Arial" size="2" ><b>per DMT NaOH <br/> (shift)</b></font></td>
                            <td width={130} bgcolor="#BFBFBF" colSpan={1} align="center"><font face="Arial" size="2" ><b>per DMT NaOH <br/> (Mtd)</b></font></td>
                            <td align="center" colSpan={2} rowSpan={11}><font face="Arial" size="2"><b>&nbsp;</b></font></td>
                        </tr>
                        <tr>
                            <td align="center" colSpan={3}><font face="Arial" size="2">Salt</font></td>
                            <td align="center"><font face="Arial" size="2">1.74</font></td>
                            <td
                            colSpan={4} 
                            align="center">
                                <font face="Arial" size="2">{usagesSection.ac_salt} mt</font>
                            </td>
                            <td 
                            colSpan={2} 
                            align="center"
                            bgcolor = {usagesSection.pdn_salt? (usagesSection.pdn_salt > 1.74? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2">{usagesSection.pdn_salt}</font>
                            </td>
                            <td align="center"><font face="Arial" size="2">{parseFloat(usagesSection.mtd_salt).toFixed(2)}</font></td>
                        </tr>
                        <tr>
                            <td align="center" colSpan={3}><font face="Arial" size="2">Soda Ash</font></td>
                            <td align="center"><font face="Arial" size="2">5.6</font></td>
                            <td 
                            colSpan={4} 
                            align="center">
                                <font face="Arial" size="2">{usagesSection.ac_soda_ash} kg</font>
                            </td>
                            <td 
                            colSpan={2} 
                            align="center"
                            bgcolor = {usagesSection.pdn_soda_ash? (usagesSection.pdn_soda_ash > 5.6? "#f6685e": "white"):"white"}>
                            <font face="Arial" size="2">{usagesSection.pdn_soda_ash}</font></td>
                            <td align="center"><font face="Arial" size="2">{usagesSection.mtd_soda_ash}</font></td>
                        </tr>
                        <tr>
                            <td align="center" colSpan={3}><font face="Arial" size="2">NaOH</font></td>
                            <td align="center"><font face="Arial" size="2">0.014</font></td>
                            <td 
                            colSpan={4} align="center"><font face="Arial" size="2"> {usagesSection.ac_naoh} dmt</font></td>
                            <td 
                            colSpan={2} 
                            align="center"
                            bgcolor = {usagesSection.pdn_naoh? (usagesSection.pdn_naoh > 0.014? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2">{usagesSection.pdn_naoh}</font>
                            </td>
                            <td align="center"><font face="Arial" size="2">{usagesSection.mtd_naoh}</font></td>
                        </tr>   
                        <tr>
                            <td align="center" colSpan={3}><font face="Arial" size="2">HCl</font></td>
                            <td align="center"><font face="Arial" size="2">0.0244</font></td>
                            <td
                            colSpan={4} 
                            align="center">
                                <font face="Arial" size="2"> {usagesSection.ac_hcl} dmt</font>
                            </td>
                            <td 
                            colSpan={2} 
                            align="center"
                            bgcolor = {usagesSection.pdn_hcl? (usagesSection.pdn_hcl > 0.0244? "#f6685e": "white"):"white"}
                            ><font face="Arial" size="2">{usagesSection.pdn_hcl}</font></td>
                            <td align="center"><font face="Arial" size="2">{usagesSection.mtd_hcl}</font></td>
                        </tr>
                        <tr>
                            <td align="center" colSpan={3}><font face="Arial" size="2">BaCl2</font></td>
                            <td align="center"><font face="Arial" size="2">1.6</font></td>
                            <td 
                            colSpan={4} 
                            align="center">
                                <font face="Arial" size="2">{usagesSection.ac_bacl2} kg</font>
                            </td>
                            <td 
                            colSpan={2} 
                            align="center"
                            bgcolor = {usagesSection.pdn_bacl2? (usagesSection.pdn_bacl2 > 1.6? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2">{usagesSection.pdn_bacl2}</font>
                            </td>
                            <td align="center"><font face="Arial" size="2">{usagesSection.mtd_bacl2}</font></td>
                        </tr>
                        <tr>
                            <td align="center" colSpan={3}><font face="Arial" size="2">Flocullant</font></td>
                            <td align="center"><font face="Arial" size="2">13.9</font></td>
                            <td 
                            colSpan={4} 
                            align="center"
                            >
                                <font face="Arial" size="2">{usagesSection.ac_flocullant} grm</font>
                            </td>
                            <td 
                            bgcolor = {usagesSection.ac_flocullant? (usagesSection.ac_flocullant > 13.9? "#f6685e": "white"):"white"}
                            colSpan={2} 
                            align="center"
                            >
                                <font face="Arial" size="2">{usagesSection.pdn_flocullant}</font>
                            </td>
                            <td align="center"><font face="Arial" size="2">{usagesSection.mtd_flocullant}</font></td>
                        </tr>
                        <tr>
                            <td align="center" colSpan={3}><font face="Arial" size="2">Sodium Sulfite</font></td>
                            <td align="center"><font face="Arial" size="2">2.2</font></td>
                            <td
                            colSpan={4} 
                            align="center">
                                <font face="Arial" size="2"> {usagesSection.ac_na2so3} kg</font>
                            </td>
                            <td 
                            colSpan={2} 
                            align="center"
                            bgcolor = {usagesSection.pdn_na2so3? (usagesSection.pdn_na2so3 > 2.2? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2">{usagesSection.pdn_na2so3}</font></td>
                            <td align="center"><font face="Arial" size="2">{usagesSection.mtd_na2so3}</font></td>
                        </tr>
                        <tr>
                            <td align="center" colSpan={3}><font face="Arial" size="2" >Alpha Cellulose</font></td>
                            <td align="center"><font face="Arial" size="2" >30kg/75hrs</font></td>
                            <td
                            align="center" 
                            colSpan={4}>
                                <font face="Arial" size="2" >{usagesSection.ac_alpha_cellulose} kg</font>
                            </td>
                            <td 
                            colSpan={2} 
                            align="center"
                            // bgcolor = {usagesSection.pdn_alpha_cellulose? (usagesSection.pdn_alpha_cellulose > 2.2? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2" >{usagesSection.pdn_alpha_cellulose}</font>
                            </td>
                            <td  align="center"><font face="Arial" size="2" >{usagesSection.mtd_alpha_cellulose}</font></td>
                        </tr>
                        <tr>
                            <td  align="center" colSpan={3}><font face="Arial" size="2" >Power</font></td>
                            <td  align="center"><font face="Arial" size="2" >2350</font></td>
                            <td
                            align="center" 
                            colSpan={4}
                            >
                                <font face="Arial" size="2" >{usagesSection.ac_power} kwhr</font>
                            </td>
                            <td 
                            colSpan={2} 
                            align="center"
                            bgcolor = {usagesSection.pdn_power? (usagesSection.pdn_power > 2350? "#f6685e": "white"):"white"}>
                                <font face="Arial" size="2" >{usagesSection.pdn_power}</font></td>
                            <td  align="center"><font face="Arial" size="2" >{usagesSection.mtd_power}</font></td>
                        </tr>
                        <tr>
                            <td  align="center" colSpan={3}><font face="Arial" size="2" >Steam(Evap / Brine)</font></td>
                            <td align="center"><font face="Arial" size="2" >1.31 / 0.30</font></td>
                            <td
                            align="center" 
                            colSpan={4}>
                                <font face="Arial" size="2" >{usagesSection.ac_steam_evap} / {usagesSection.ac_steam_brine}</font>
                            </td>
                            <td 
                            align="center" 
                            colSpan={2}
                            bgcolor={(usagesSection.pdn_steam_evap || usagesSection.pdn_steam_brine)? (usagesSection.pdn_steam_evap > 1.31 || usagesSection.pdn_steam_brine > 0.30? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2" > {usagesSection.pdn_steam_evap} / {usagesSection.pdn_steam_brine}</font></td>
                            <td align="center"><font face="Arial" size="2" >{usagesSection.mtd_steam_evap} / {usagesSection.mtd_steam_brine}</font></td>
                        </tr>
                        <tr>
                            <td bgcolor="#BFBFBF" align="left" colSpan={11}><font face="Arial" size="2" ><b>Environment Monitoring</b></font></td>
                            <td align="center" colSpan={2} rowSpan={2}><font face="Arial" size="2" >&nbsp;</font></td>
                        </tr>
                        <tr>
                            <td align="center" ><font face="Arial" size="2" ><b> CLT: </b></font></td>
                            <td 
                            align="center" 
                            colSpan={2}
                            bgcolor = {usagesSection.clt_ph? (usagesSection.clt_ph < 6.5 || usagesSection.clt_ph > 9? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2" >{usagesSection.clt_ph}</font></td>
                            <td align="center"><font face="Arial" size="2" ><b> Cold Well: </b></font></td>
                            <td 
                            align="center" 
                            colSpan={2}
                            bgcolor = {usagesSection.cold_well_ph? (usagesSection.cold_well_ph < 6.5 || usagesSection.cold_well_ph > 9? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2" >{usagesSection.cold_well_ph}</font></td>
                            <td align="center"><font face="Arial" size="2" ><b>Total: </b></font></td>
                            <td 
                            align="center"
                            bgcolor = {usagesSection.total_ph? (usagesSection.total_ph < 6.5 || usagesSection.total_ph > 9? "#f6685e": "white"):"white"}
                            >
                                <font face="Arial" size="2" >{usagesSection.total_ph}</font></td>
                            <td align="center" colSpan={2}><font face="Arial" size="2" ><b> After Digester </b></font></td>
                            <td 
                            align="center"
                            bgcolor = {usagesSection.after_digester_ph? (usagesSection.after_digester_ph < 6.5 || usagesSection.after_digester_ph > 9? "#f6685e": "white"):"white"}
                            ><font face="Arial" size="2" >{usagesSection.after_digester_ph}</font></td>
                        </tr>
                        <tr>
                            <td bgcolor="#BFBFBF" align="left" colSpan={11}><font face="Arial" size="2" ><b>Product Transfers</b></font></td>
                        </tr>
                        <tr>
                            <td align="center" ><font face="Arial" size="2" > <b>50% NaOH </b></font></td>
                            <td align="center" ><font face="Arial" size="2" >{usagesSection.naoh_50}</font></td>
                            <td align="center" ><font face="Arial" size="2" ><b>32% NaOH </b> </font></td>
                            <td align="center" ><font face="Arial" size="2" >{usagesSection.naoh_32}</font></td>
                            <td align="center" ><font face="Arial" size="2" ><b>HCl </b></font></td>
                            <td align="center" ><font face="Arial" size="2" >{usagesSection.hcl}</font></td>
                            <td align="center" ><font face="Arial" size="2" ><b>NaOCl </b></font></td>
                            <td align="center" ><font face="Arial" size="2" >{usagesSection.naocl}</font></td>
                            <td align="center" colSpan={2}><font face="Arial" size="2" ><b>WTF</b></font></td>
                            <td align="center" ><font face="Arial" size="2" >{usagesSection.naocl_waste}</font></td>
                        </tr>
                        {/* Render every first monday */}
                        {monday === 1 &&
                        <>
                            <tr>
                                <td bgcolor="#BFBFBF" align="left" colSpan={11}><font face="Arial" size="2" ><b>Quality Monitoring (every 1st Monday)</b></font></td>
                                <td align="center" colSpan={2} rowSpan={2}><font face="Arial" size="2" >&nbsp;</font></td>
                            </tr>
                            <tr>
                                <td align="left" colSpan={4}><font face="Arial" size="2" >Inst calbn: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; labels &nbsp;/&nbsp; expiry</font></td>
                                <td align="left" colSpan={4}><font face="Arial" size="2" >Lab Chem: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; labels &nbsp;/&nbsp; expiry</font></td>
                                <td align="left" colSpan={3}><font face="Arial" size="2" >GW Calbn: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; labels &nbsp;/&nbsp; expiry &nbsp;/&nbsp; broken</font></td>
                            </tr>
                            <tr>
                                <td align="left" colSpan={4}><font face="Arial" size="2" >Cont Improvement: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; F &nbsp;/&nbsp; My &nbsp;/&nbsp; Au &nbsp;/&nbsp; N</font></td>
                                <td align="left" colSpan={4}><font face="Arial" size="2" >GH Audit: &nbsp; ( ) done</font></td>
                                <td align="left" colSpan={3}><font face="Arial" size="2" >Variance Report: &nbsp;&nbsp;&nbsp;&nbsp; Ja &nbsp;&nbsp; A &nbsp;&nbsp; JI &nbsp;&nbsp; O</font></td>
                            </tr>
                        </>
                        }
                    
                        {monday === 2 && 
                        <>
                            <tr>
                                <td bgcolor="#BFBFBF" align="left" colSpan="11"><font face="Arial" size="2" ><b>Emergency Preparedness (every 2nd Monday)</b></font></td>
                                <td align="center" colSpan={2} rowSpan={2}><font face="Arial" size="2" >&nbsp;</font></td>
                            </tr>
                            <tr>
                                <td align="left" colSpan={8}><font face="Arial" size="2" >Drills (F My Au N): &nbsp;&nbsp; ( ) Fire &nbsp;&nbsp; ( ) Spills &nbsp;&nbsp; ( ) Cl2 &nbsp;&nbsp; ( ) First Aid &nbsp;&nbsp; ( ) Earthquake</font></td>
                                <td align="left" colSpan={3}><font face="Arial" size="2" >Emer Light: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ( ) Functioning</font></td>
                            </tr>
                            <tr>
                                <td align="left" colSpan={4}><font face="Arial" size="2" >Alarms: &nbsp;&nbsp; ( ) Functioning</font></td>
                                <td align="left" colSpan={4}><font face="Arial" size="2" >Eyewash &nbsp; ( ) Compliant</font></td>
                                <td align="left" colSpan={3}><font face="Arial" size="2" >Fire Extinguisher &nbsp; ( ) Inspected</font></td>
                            </tr>
                        </>
                        }

                        {monday === 3 &&
                        <>
                            <tr>
                                <td bgcolor="#BFBFBF" align="left" colSpan={11}><font face="Arial" size="2" ><b>Performance Mgt {"&"} Resource Conservation(every 3nd Monday)</b></font></td>
                                <td align="center" colSpan={2} rowSpan={2}><font face="Arial" size="2" >&nbsp;</font></td>
                                </tr>
                            <tr>
                                <td align="left" colSpan={4}><font face="Arial" size="2" >Emer Resp Eqpt: &nbsp;&nbsp; ( ) Complete</font></td>
                                <td align="left" colSpan={4}><font face="Arial" size="2" >Pollution Accident: &nbsp;&nbsp; ( ) None</font></td>
                                <td align="left" colSpan={3}><font face="Arial" size="2" >QObj/OTP's Report: &nbsp;&nbsp; Ja &nbsp;&nbsp; A &nbsp;&nbsp; JI &nbsp;&nbsp; O</font></td>
                            </tr>
                            <tr>
                                <td align="left" colSpan={4}><font face="Arial" size="2" > Brine Line:  ( ) Declog  &nbsp;( ) Still ok</font></td>
                                <td align="left" colSpan={4}><font face="Arial" size="2" >Budget Review &nbsp; ( ) Done</font></td>
                                <td align="left" colSpan={3}><font face="Arial" size="2" >Risk Ass Report: &nbsp;&nbsp; Ja &nbsp;&nbsp; A &nbsp;&nbsp; JI &nbsp;&nbsp; O</font></td>
                            </tr>
                        </>
                        }

                        {monday === 4 && 
                        <>
                            <tr>
                                <td bgcolor="#BFBFBF" align="left" colSpan={11}><font face="Arial" size="2" ><b>Safety Monitoring(every 4th Monday)</b></font></td>
                                <td align="center" colSpan={2} rowSpan={2}><font face="Arial" size="2" >&nbsp;</font></td>
                            </tr>
                            <tr>
                                <td align="left" colSpan={4}><font face="Arial" size="2" >O2 Tk press: </font></td>
                                <td align="left" colSpan={4}><font face="Arial" size="2" >PPE Check ( )</font></td>
                                <td align="left" colSpan={3}><font face="Arial" size="2" >Lightings &nbsp;&nbsp; ( &nbsp;) Functioning</font></td>
                            </tr> 
                            <tr>
                                <td align="left" colSpan={4}><font face="Arial" size="2" > SCBA press: </font></td>
                                <td align="left" colSpan={4}><font face="Arial" size="2" > Chlor-alert ( &nbsp;)</font></td>
                                <td align="left" colSpan={3}><font face="Arial" size="2" >&nbsp;</font></td>
                            </tr>
                        </>
                        }
                        <tr>
                            <td bgcolor="#BFBFBF" align="left" colSpan={11}><font face="Arial" size="2" ><b>SP Evaluation</b></font></td>                      
                        </tr>
                        <tr>
                            <td align="center" colSpan={3}> <font face="Arial" size="2" ><b>Plan vol. attained</b></font></td>
                            <td align="center"> <font face="Arial" size="2" >YES</font></td>
                            <td align="center" colSpan={3}> <font face="Arial" size="2" ><b>Prodn No. Offspecs</b></font></td>
                            <td align="center"> <font face="Arial" size="2" >YES </font></td>
                            <td align="center" colSpan={2}> <font face="Arial" size="2" ><b>SP usage {'<='} std</b></font></td>
                            <td align="center"> <font face="Arial" size="2" >NO </font></td>
                        
                        </tr>
                        <tr>
                            <td align="center" colSpan={3}> <font face="Arial" size="2"> <b>Proc Control w/n range </b></font></td>
                            <td align="center"> <font face="Arial" size="2" >NO</font> </td>
                            <td align="center" colSpan={3}> <font face="Arial" size="2" > <b> Manpower no 24 hrs duty </b></font></td>
                            <td align="center"> <font face="Arial" size="2" >YES</font></td>
                            <td align="center" colSpan={2}> <font face="Arial" size="2" ><b>SReport Completeness</b></font></td>
                            <td align="center"> <font face="Arial" size="2" >YES </font></td>
                        </tr>
                        <tr>
                            <td colSpan={11} align="center" bgcolor="yellow"><font face="Arial" size="2" > <b> Shift Performance Rating: SATISFACTORY </b></font></td>
                        </tr>

                        <tr>
                            <td align="center" colSpan={4}><font face="Arial" size="2" > {currentSupervisor}</font></td>
                            <td align="center" colSpan={4}><font face="Arial" size="2" > {incomingSupervisor}</font></td>
                            <td align="center" colSpan={3}><font face="Arial" size="2" > {manager}</font></td>
                        </tr>
                        <tr>
                            <td align="center" colSpan={4}><font face="Arial" size="2"><b> Prepared By: Section/Shift Supervisor </b></font></td>
                            <td align="center" colSpan={4}><font face="Arial" size="2"><b> Turnover: Incoming Section/Shift Supervisor</b></font></td>
                            <td align="left" colSpan={3}><font face="Arial" size="2" > <b>Noted By: Dept/Shift Manager</b></font></td>
                        </tr>
                    </tbody>
                </table>
            </TableContainer>
           {download && <ReactHTMLTableToExcel
                style={{marginTop: '20px'}}
                id="test-table-xls-button"
                className={classes.saveButtonStyle}
                table="shiftReportTable"
                filename="shift report"
                sheet="Shift Report"
                buttonText="SAVE SHIFT REPORT"
            />}
        </MainContainer>
    )
}

export default ShiftReportDoc
