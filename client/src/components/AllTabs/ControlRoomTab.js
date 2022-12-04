import React from "react";
import {Select, MenuItem, FormControl, InputLabel, Typography} from '@mui/material'
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { addControlRoom } from "../../redux/sectionSlice";
import ErrorSection from "./ErrorSection";

const ControlRoomTab = () => {
    const dispatch = useDispatch()
    const {controlRoomSection} = useSelector((state) => state.section)
    const {controlRoomErrors} = useSelector((state) => state.error)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(addControlRoom({name, value}))
    }   

    return(
        <>
            <div style={{marginBottom: '2%'}}>
                {controlRoomErrors.length === 0? <></>:<ErrorSection errors={controlRoomErrors} type="ctrlrm"/>}
                <Typography variant="h4" style={{marginBottom: '1%'}}>Operators</Typography>
                <Grid container spacing={1}>
                    <Grid item lg={6} sm={6} xs={6}>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel id="prev_op">Previous Operator</InputLabel>
                            <Select 
                            labelId="prev_op"
                            label="Previous Operator"
                            defaultValue = ''
                            name='previous_operator'
                            value={controlRoomSection.previous_operator || ''}
                            onChange={handleChange}>
                                <MenuItem value={'Haron Paul Lorente'}> Haron Paul Lorente</MenuItem>
                                <MenuItem value={'Hannah Patriz Lorente'}>Hannah Patriz Lorente</MenuItem>
                                <MenuItem value={'Jazon Troy Jaralve'}>Jazon Troy Jaralve</MenuItem>
                                <MenuItem value={'Angielle Schnaider'}>Angielle Schnaider</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={6} sm={6} xs={6}>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel id="pres_op">Present Operator</InputLabel>
                            <Select
                            labelId="pres_op"
                            label="Present Operator"
                            defaultValue = ""
                            name='present_operator'
                            value={controlRoomSection.present_operator || ''}
                            onChange={handleChange}
                            >
                                <MenuItem value={'Haron Paul Lorente'}> Haron Paul Lorente</MenuItem>
                                <MenuItem value={'Hannah Patriz Lorente'}>Hannah Patriz Lorente</MenuItem>
                                <MenuItem value={'Jazon Troy Jaralve'}>Jazon Troy Jaralve</MenuItem>
                                <MenuItem value={'Angielle Schnaider'}>Angielle Schnaider</MenuItem>
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
                            value={controlRoomSection.incoming_operator || ''}
                            onChange={handleChange}
                            >
                                <MenuItem value={'Haron Paul Lorente'}> Haron Paul Lorente</MenuItem>
                                <MenuItem value={'Hannah Patriz Lorente'}>Hannah Patriz Lorente</MenuItem>
                                <MenuItem value={'Jazon Troy Jaralve'}>Jazon Troy Jaralve</MenuItem>
                                <MenuItem value={'Angielle Schnaider'}>Angielle Schnaider</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>

            <div style={{marginBottom: '2%',}}>
                <Typography variant="h4" style={{marginBottom: '1%'}}>Parameters</Typography>
                <Grid container spacing={1}>
                    <Grid item lg={2} sm={4} xs={4}>
                        <FormControl style={{minWidth: '100%'}}>
                            <InputLabel id="interlock">Interlock Engaged</InputLabel>
                            <Select
                            defaultValue = ""
                            labelid="interlock"
                            label="Interlock Engaged"
                            name='interlock_engaged'
                            value={controlRoomSection.interlock_engaged || ''}
                            onChange={handleChange}>
                                <MenuItem value={'YES'}>Yes</MenuItem>
                                <MenuItem value={'NO'}>No</MenuItem>
                                <MenuItem value={'PARTIAL'}>Partial</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <FormControl style={{minWidth: '100%'}}>
                            <InputLabel id="daq">DAQ Operational</InputLabel>
                            <Select
                            labelid="daq"
                            label="DAQ Operation"
                            defaultValue = ""
                            name='daq_operational'
                            value={controlRoomSection.daq_operational || ''}
                            onChange={handleChange}>
                                <MenuItem value={'YES'}>Yes</MenuItem>
                                <MenuItem value={'NO'}>No</MenuItem>
                                <MenuItem value={'PARTIAL'}>Partial</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        style={{minWidth: '100%'}}
                        label='Hours'
                        placeholder=""
                        type="number"
                        name='hours'
                        value={controlRoomSection.hours || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        style={{minWidth: '100%'}} 
                        label='Rectifier Raw Water'
                        placeholder=">= 250"
                        type="number"
                        name='rr_water'
                        error={controlRoomSection.rr_water? (controlRoomSection.rr_water < 250? true:false):false}
                        value={controlRoomSection.rr_water || ''}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        style={{minWidth: '100%'}}
                        label='Cells'
                        placeholder=""
                        name='cells'
                        type="number"
                        value={controlRoomSection.cells || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        style={{minWidth: '100%'}}
                        label='Average Load'
                        placeholder="<= 13.25"
                        type="number"
                        name='avg_load'
                        error={controlRoomSection.avg_load? (controlRoomSection.avg_load > 13.25? true:false):false}
                        value={controlRoomSection.avg_load || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        style={{minWidth: '100%'}}
                        label='End of Shift Load'
                        placeholder="<= 13.25"
                        type="number"
                        name='eos_load'
                        error={controlRoomSection.eos_load? (controlRoomSection.eos_load > 13.25? true:false):false}
                        value={controlRoomSection.eos_load || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        style={{minWidth: '100%'}}
                        label='Rectifier Demi water'
                        placeholder=">= 180"
                        type="number"
                        name='rd_water'
                        error={controlRoomSection.rd_water? (controlRoomSection.rd_water < 180? true:false):false}
                        value={controlRoomSection.rd_water || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        style={{minWidth: '100%'}}
                        label='Cells with voltage'
                        name='cells_voltage'
                        error={controlRoomSection.cells_voltage? true:false}
                        value={controlRoomSection.cells_voltage || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        style={{minWidth: '100%'}}
                        label='Cells total voltage'
                        placeholder="< 299.2"
                        type="number"
                        name='cells_total_voltage'
                        error={controlRoomSection.cells_total_voltage? (controlRoomSection.cells_total_voltage >= 299.2? true:false):false}
                        value={controlRoomSection.cells_total_voltage || ''}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        style={{minWidth: '100%'}}
                        label='Transformer oil temperature'
                        placeholder="< 90 °C"
                        type="number"
                        error={controlRoomSection.xformer_oil_temp? (controlRoomSection.xformer_oil_temp >= 90? true:false):false}
                        name='xformer_oil_temp'
                        value={controlRoomSection.xformer_oil_temp || ''}
                        onChange={handleChange}></TextField>
                    </Grid>
                </Grid>
            </div>

            <div style={{marginBottom: '2%',}}>
                <Typography variant="h4" style={{marginBottom: '1%'}}>Operational Remarks</Typography>
                <Grid container spacing={4}>
                    <Grid item lg={12} sm={12} xs={12}>
                        <TextField
                            style={{minWidth: '100%'}}
                            variant="outlined"
                            label="Operational Remarks"
                            multiline
                            maxRows={4}
                            name='remarks'
                            value={controlRoomSection.remarks || ''}
                            onChange={handleChange}/>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default ControlRoomTab
