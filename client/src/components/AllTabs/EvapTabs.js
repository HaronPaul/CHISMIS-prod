import React, { useState, useEffect} from "react";
import { Grid, Typography, Select, MenuItem, FormControl, InputLabel, TextField} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { addElectro, addEvap } from "../../redux/sectionSlice";
import ErrorSection from "./ErrorSection";

const EvapTabs = () => {
    const dispatch = useDispatch()
    const {evapSection, electroSection} = useSelector((state) => state.section)
    const {evapErrors} = useSelector((state) => state.error)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(addEvap({name, value}))
    }   

    return(
        <>
            <div style={{ marginBottom: '3%'}}>
                {evapErrors.length === 0? <></>:<ErrorSection errors={evapErrors} type="evap"/>}
                <Typography variant="h4" style={{ marginBottom: '1%'}}>Operators</Typography>
                <Grid container spacing={1}>
                    <Grid item lg={6} sm={6} xs={6}>
                        <FormControl style = {{minWidth: '100%'}}>
                            <InputLabel id="prev_op_evap">Previous Operator</InputLabel>
                            <Select
                            labelid="prev_op_evap"
                            label="Previous Operator"
                            defaultValue = ""
                            name='previous_operator'
                            value={evapSection.previous_operator || ''}
                            onChange={handleChange}
                            >
                                <MenuItem value={'Akimoto Manatsu'}> Akimoto Manatsu</MenuItem>
                                <MenuItem value={'Matsumura Sayuri'}>Matsumura Sayuri</MenuItem>
                                <MenuItem value={'Eto Misa'}>Eto Misa</MenuItem>
                                <MenuItem value={'Sakurai Reika'}>Sakurai Reika</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={6} sm={6} xs={6}>
                        <FormControl style = {{minWidth: '100%'}}>
                            <InputLabel id="pres_op_evap">Present Operator</InputLabel>
                            <Select 
                            labelid="pres_op_evap"
                            label="Present Operator"
                            defaultValue = ""
                            name='present_operator'
                            value={evapSection.present_operator || ''}
                            onChange={handleChange}>
                                 <MenuItem value={'Akimoto Manatsu'}> Akimoto Manatsu</MenuItem>
                                <MenuItem value={'Matsumura Sayuri'}>Matsumura Sayuri</MenuItem>
                                <MenuItem value={'Eto Misa'}>Eto Misa</MenuItem>
                                <MenuItem value={'Sakurai Reika'}>Sakurai Reika</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={6} sm={6} xs={6}>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel id="incoming_op">Incoming Operator</InputLabel>
                            <Select
                            labelId="incoming_op"
                            label="Incoming Operator"
                            defaultValue = ""
                            name='incoming_operator'
                            value={evapSection.incoming_operator || ''}
                            onChange={handleChange}
                            >
                                <MenuItem value={'Akimoto Manatsu'}> Akimoto Manatsu</MenuItem>
                                <MenuItem value={'Matsumura Sayuri'}>Matsumura Sayuri</MenuItem>
                                <MenuItem value={'Eto Misa'}>Eto Misa</MenuItem>
                                <MenuItem value={'Sakurai Reika'}>Sakurai Reika</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
            <div style={{ marginBottom: '3%'}}>
                <Typography variant="h4" style={{ marginBottom: '1%'}}>Parameters</Typography>
                <Grid container spacing={1}>
                    <Grid item lg= {2} sm={4} xs={4}>
                        <Typography>Evap Synthesis Efficiency: {evapSection.evap_eff}</Typography>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        label='Hours'
                        type="number"
                        style = {{minWidth: '100%'}}
                        name='hours'
                        value={evapSection.hours || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        label='NaOH Production'
                        placeholder=">= 10.83"
                        type="number"
                        style = {{minWidth: '100%'}}
                        name='naoh_prod'
                        error={evapSection.naoh_prod? (evapSection.naoh_prod < 10.83? true:false): false}
                        value={evapSection.naoh_prod || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        label='Evap Feed Flow Rate'
                        placeholder="3-5"
                        type="number"
                        style = {{minWidth: '100%'}}
                        name='evap_feed_flowrate'
                        error={evapSection.evap_feed_flowrate? ((evapSection.evap_feed_flowrate < 3|| evapSection.evap_feed_flowrate > 5)? true:false): false}
                        value={evapSection.evap_feed_flowrate || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField 
                        label='NaOH Concentration' 
                        placeholder="48-50"
                        type="number" 
                        style = {{minWidth: '100%'}}
                        name='naoh_conc'
                        error={evapSection.naoh_conc? ((evapSection.naoh_conc < 48|| evapSection.naoh_conc > 50)? true:false): false}
                        value={evapSection.naoh_conc || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='NaOH Total Volume'
                        placeholder="" 
                        style = {{minWidth: '100%'}}
                        name='naoh_total_volume'
                        value={evapSection.naoh_total_volume || ''}
                        onChange={handleChange}></TextField>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField 
                        label='NaOH Specific Gravity' 
                        placeholder=""
                        type="number" 
                        style = {{minWidth: '100%'}}
                        name='naoh_sg'
                        value={evapSection.naoh_sg || ''}
                        onChange={handleChange}></TextField>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField 
                        label='Tank 8 Level'
                        placeholder=">= 300"
                        type="number" 
                        style = {{minWidth: '100%'}}
                        name='t8_level'
                        error={evapSection.t8_level? (evapSection.t8_level < 300? true:false): false}
                        value={evapSection.t8_level || ''}
                        onChange={handleChange}></TextField>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField 
                        label='Tank 9 Level' 
                        placeholder=">= 300"
                        type="number" 
                        style = {{minWidth: '100%'}}
                        name='t9_level'
                        error={evapSection.t9_level? (evapSection.t9_level < 300? true:false): false}
                        value={evapSection.t9_level || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField 
                        label='Vacuum Pressure' 
                        placeholder="400-600"
                        type="number" 
                        style = {{minWidth: '100%'}}
                        name='vacuum_pressure'
                        error={evapSection.vacuum_pressure? ((evapSection.vacuum_pressure < 400|| evapSection.vacuum_pressure > 600)? true:false): false}
                        value={evapSection.vacuum_pressure || ''}
                        onChange={handleChange}/>
                    </Grid>
                </Grid>
            </div>

            <div style={{ marginBottom: '3%'}}>
                <Typography variant="h4" style={{ marginBottom: '1%'}}>Operational Remarks</Typography>
                <Grid container spacing={4}>
                    <Grid item lg={12} sm={12} xs={12}>
                        <TextField
                            variant="outlined"
                            label="Operational Remarks"
                            multiline
                            maxRows={4}
                            style = {{minWidth: '100%'}}
                            name='remarks'
                            value={evapSection.remarks || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default EvapTabs