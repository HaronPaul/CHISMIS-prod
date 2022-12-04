import React, { useEffect } from "react";
import {Select, MenuItem, FormControl, InputLabel, Typography, Grid, TextField} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import { addHcl } from "../../redux/sectionSlice";
import { addErrors } from "../../redux/errorSlice";
import ErrorSection from "./ErrorSection";

const HCLTab = () => {
    const dispatch = useDispatch()
    const {hclSection, controlRoomSection} = useSelector((state) => state.section)
    const {hclErrors} = useSelector((state) => state.error)
    
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(addHcl({name, value}))
    }   

    return( 
        <>
            <div style={{ marginBottom: '2%'}}>
                {hclErrors.length === 0? <></>:<ErrorSection errors={hclErrors} type="hcl" />}
                <Typography variant="h4" style={{marginBottom: '1%'}}>Operators</Typography>
                <Grid container spacing={1}>
                    <Grid item lg={6} sm={6} xs={6}>
                        <FormControl style={{minWidth: '100%'}}>
                            <InputLabel id="prev_op_hcl">Previous Operator</InputLabel>
                            <Select
                            labelid="prev_op_hcl"
                            label="Previous Operator"
                            defaultValue = ""
                            name='previous_operator'
                            value={hclSection.previous_operator || ''}
                            onChange={handleChange}>
                                <MenuItem value={'Shiraishi Mai'}> Shiraishi Mai</MenuItem>
                                <MenuItem value={'Saito Asuka'}>Saito Asuka</MenuItem>
                                <MenuItem value={'Ikuta Erika'}>Ikuta Erika</MenuItem>
                                <MenuItem value={'Angielle Schnaider'}>Angielle Schnaider</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={6} sm={6} xs={6}>
                        <FormControl style={{minWidth: '100%'}}>
                            <InputLabel id="pres_op_hcl">Present Operator</InputLabel>
                            <Select
                            labelid="pres_op_hcl"
                            label="Present Operator"
                            defaultValue = ""
                            name='present_operator'
                            value={hclSection.present_operator || ''}
                            onChange={handleChange}>
                                <MenuItem value={'Shiraishi Mai'}> Shiraishi Mai</MenuItem>
                                <MenuItem value={'Saito Asuka'}>Saito Asuka</MenuItem>
                                <MenuItem value={'Ikuta Erika'}>Ikuta Erika</MenuItem>
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
                            value={hclSection.incoming_operator || ''}
                            onChange={handleChange}
                            >
                                <MenuItem value={'Shiraishi Mai'}> Shiraishi Mai</MenuItem>
                                <MenuItem value={'Saito Asuka'}>Saito Asuka</MenuItem>
                                <MenuItem value={'Ikuta Erika'}>Ikuta Erika</MenuItem>
                                <MenuItem value={'Angielle Schnaider'}>Angielle Schnaider</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
            
            <div style={{ marginBottom: '2%'}}>
                <Typography variant="h4" style = {{marginBottom: '1%'}}>Parameters</Typography>
                <Grid container spacing={1}>
                    <Grid item lg= {2} sm={4} xs={4}>
                        <Typography>HCl Efficiency: {hclSection.hcl_synth_eff}</Typography>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        label='HCL Hours'
                        type="number"
                        style= {{minWidth: '100%'}}
                        name='hcl_hours'
                        value={hclSection.hcl_hours|| ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        label='LCP Hours'
                        type="number"
                        style= {{minWidth: '100%'}}
                        name='lcp_hours'
                        value={hclSection.lcp_hours|| ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        label='HCL Production'
                        type="number"
                        placeholder=">= 11.01"
                        style= {{minWidth: '100%'}}
                        name='hcl'
                        error={hclSection.hcl? (hclSection.hcl < 11.01? true: false):false}
                        value={hclSection.hcl|| ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        label='HCL Product Temperature'
                        type="number"
                        style= {{minWidth: '100%'}}
                        name='hcl_prod_temp'
                        placeholder="<= 50"
                        error={hclSection.hcl_prod_temp? (hclSection.hcl_prod_temp > 50? true: false):false}
                        value={hclSection.hcl_prod_temp || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField 
                        label='Scrubbed Chlorine Temperature'
                        type="number"
                        placeholder="<= 40"
                        style= {{minWidth: '100%'}}
                        name='scrubbed_cl_temp'
                        error={hclSection.scrubbed_cl_temp? (hclSection.scrubbed_cl_temp > 40? true: false):false}
                        value={hclSection.scrubbed_cl_temp || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        label='HCL concentration'
                        type="number"
                        style= {{minWidth: '100%'}}
                        placeholder="32-33.5"
                        name='hcl_conc'
                        error={hclSection.hcl_conc? ((hclSection.hcl_conc < 32 ||hclSection.hcl_conc > 33.5)? true: false):false}
                        value={hclSection.hcl_conc || ''}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        label='HCL specific gravity'
                        style= {{minWidth: '100%'}}
                        name='hcl_sg'
                        value={hclSection.hcl_sg || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField 
                        label='Sigri cooling water'
                        placeholder="= 3"
                        style= {{minWidth: '100%'}}
                        name='sigri_cooling_water'
                        error={hclSection.sigri_cooling_water? (hclSection.sigri_cooling_water != 3? true:false): false}
                        value={hclSection.sigri_cooling_water || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        label='HCL Space'
                        type="number"
                        style= {{minWidth: '100%'}}
                        name='hcl_space'
                        placeholder=">=200"
                        error={hclSection.hcl_space? (hclSection.hcl_space < 200? true:false): false}
                        value={hclSection.hcl_space || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField 
                        label='ClH2O flow rate'
                        type="number"
                        style= {{minWidth: '100%'}}
                        name='clh20_flowrate'
                        placeholder=">=20"
                        error={hclSection.clh20_flowrate? (hclSection.clh20_flowrate < 20? true:false): false}
                        value={hclSection.clh20_flowrate || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        label='Sigri inlet pressure chlorine'
                        type="number"
                        style= {{minWidth: '100%'}}
                        name='sigri_inlet_pressure_c'
                        placeholder="<= 250"
                        error={hclSection.sigri_inlet_pressure_c? (hclSection.sigri_inlet_pressure_c > 250? true:false): false}
                        value={hclSection.sigri_inlet_pressure_c || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        label='Sigri inlet pressure hydrogen'
                        type="number"
                        style= {{minWidth: '100%'}}
                        name='sigri_inlet_pressure_h'
                        placeholder="<= 250"
                        error={hclSection.sigri_inlet_pressure_h? (hclSection.sigri_inlet_pressure_h > 250? true:false): false}
                        value={hclSection.sigri_inlet_pressure_h || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        label='Full N2 On-site'
                        type="number"
                        style= {{minWidth: '100%'}}
                        name='full_n2'
                        placeholder=">= 10"
                        error={hclSection.full_n2? (hclSection.full_n2 < 10? true:false): false}
                        value={hclSection.full_n2 || ''}
                        onChange={handleChange}/>
                    </Grid>
                </Grid>
            </div>

            <div style={{ marginBottom: '2%'}}>
                <Typography variant="h4" style = {{marginBottom: '1%'}}>Operational Remarks</Typography>
                <Grid container spacing={4}>
                    <Grid item lg={12} sm={12} xs={12}>
                        <TextField
                            variant="outlined"
                            label="Operational Remarks"
                            multiline
                            maxRows={4}
                            style= {{minWidth: '100%'}}
                            name='remarks'
                            value={hclSection.remarks || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default HCLTab
