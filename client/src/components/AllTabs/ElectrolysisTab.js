import React, { useEffect } from "react";
import { Grid, Typography, Select, MenuItem, FormControl, InputLabel, TextField} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addElectro, addUsages } from "../../redux/sectionSlice";
import ErrorSection from './ErrorSection'

const ElectrolysisTab = () => {
    const dispatch = useDispatch()
    const {electroSection, controlRoomSection, usagesSection} = useSelector((state) => state.section)
    const {electroErrors} = useSelector((state) => state.error)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(addElectro({name, value}))   
    }

    return(
        <>
            <div style = {{  marginBottom: '3%'}}>
                {electroErrors.length === 0? <></>:<ErrorSection errors={electroErrors} type="electro"/>}
                <Typography variant="h4" style = {{  marginBottom: '1%'}}>Operators</Typography>
                <Grid container spacing={1}>
                    <Grid item lg={6} sm={6} xs={6}>
                        <FormControl style = {{minWidth: '100%'}}>
                            <InputLabel id="prev_op_electro">Previous Operator</InputLabel>
                            <Select
                            labelid="prev_op_electro"
                            label="Previous Operator"
                            defaultValue = ""
                            name='previous_operator'
                            value={electroSection.previous_operator || ''}
                            onChange={handleChange}>
                                <MenuItem value={'Hori Miona'}> Hori Miona</MenuItem>
                                <MenuItem value={'Shinuchi Mai'}>Shinuchi Mai</MenuItem>
                                <MenuItem value={'Terada Ranze'}>Terada Ranze</MenuItem>
                                <MenuItem value={'Kitano Hinako'}>Kitano Hinako</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={6} sm={6} xs={6}>
                        <FormControl style = {{minWidth: '100%'}}>
                            <InputLabel id="pres_op_electro">Present Operator</InputLabel>
                            <Select 
                            labelid="pres_op_electro"
                            label="Present Operator"
                            defaultValue = ""
                            name='present_operator'
                            value={electroSection.present_operator || ''}
                            onChange={handleChange}>
                                <MenuItem value={'Hori Miona'}> Hori Miona</MenuItem>
                                <MenuItem value={'Shinuchi Mai'}>Shinuchi Mai</MenuItem>
                                <MenuItem value={'Terada Ranze'}>Terada Ranze</MenuItem>
                                <MenuItem value={'Kitano Hinako'}>Kitano Hinako</MenuItem>
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
                            value={electroSection.incoming_operator || ''}
                            onChange={handleChange}
                            >
                                <MenuItem value={'Hori Miona'}> Hori Miona</MenuItem>
                                <MenuItem value={'Shinuchi Mai'}>Shinuchi Mai</MenuItem>
                                <MenuItem value={'Terada Ranze'}>Terada Ranze</MenuItem>
                                <MenuItem value={'Kitano Hinako'}>Kitano Hinako</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
            
            <div style = {{  marginBottom: '3%'}}>
                <Typography variant="h4" style = {{  marginBottom: '1%'}}>Other Information</Typography>
                <Grid container spacing={1}>
                    <Grid item lg= {2} sm={4} xs={6}>
                        <Typography>Electrolyzer Efficiency: {electroSection.electro_eff}</Typography>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='Cell Liquor Production' 
                        placeholder=">= 11.90"
                        style = {{minWidth: '100%'}}
                        name='cell_liq_prod'
                        error={electroSection.cell_liq_prod? (electroSection.cell_liq_prod < 11.90? true: false):false}
                        value={electroSection.cell_liq_prod || ''}
                        onChange={handleChange}></TextField>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={6}>
                        <TextField
                        type="number"
                        label='SPB Inlet Temperature'
                        placeholder="60-70"
                        style = {{minWidth: '100%'}}
                        name='spb_inlet_temp'
                        error={electroSection.spb_inlet_temp? ((electroSection.spb_inlet_temp < 60 ||electroSection.spb_inlet_temp > 70)? true: false):false}
                        value={electroSection.spb_inlet_temp || ''}
                        onChange={handleChange}></TextField>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='NaOH Inlet Temperature'
                        placeholder="88-92"
                        style = {{minWidth: '100%'}}
                        name='naoh_inlet_temp'
                        error={electroSection.naoh_inlet_temp? ((electroSection.naoh_inlet_temp < 88 ||electroSection.naoh_inlet_temp > 92)? true: false):false}
                        value={electroSection.naoh_inlet_temp || ''}
                        onChange={handleChange}></TextField>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='Chelate Operating Hours Tower A'
                        placeholder="42hrs/tk"
                        style = {{minWidth: '100%'}}
                        name='chelate_op_hours_ta'
                        error={electroSection.chelate_op_hours_ta? (electroSection.chelate_op_hours_ta < 18? true: false):false}
                        value={electroSection.chelate_op_hours_ta || ''}
                        onChange={handleChange}></TextField>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='Chelate Operating Hours Tower B'
                        placeholder="42hrs/tk"
                        style = {{minWidth: '100%'}}
                        name='chelate_op_hours_tb'
                    error={electroSection.chelate_op_hours_tb? (electroSection.chelate_op_hours_tb < 18? true: false):false}
                        value={electroSection.chelate_op_hours_tb || ''}
                        onChange={handleChange}></TextField>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={6}>
                        <TextField
                        type="number"
                        label='NaOH Concentration'
                        placeholder="31% - 33%"
                        style = {{minWidth: '100%'}}
                        name='naoh_conc'
                        error={electroSection.naoh_conc? ((electroSection.naoh_conc < 31 ||electroSection.naoh_conc > 33)? true: false):false}
                        value={electroSection.naoh_conc || ''}
                        onChange={handleChange}></TextField>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='NaOH Specific Gravity'
                        placeholder="" 
                        style = {{minWidth: '100%'}}
                        name='naoh_sg'
                        value={electroSection.naoh_sg || ''}
                        onChange={handleChange}></TextField>
                    </Grid>        
                    <Grid item lg={2} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='Full N2 Onsite'
                        placeholder="" 
                        style = {{minWidth: '100%'}}
                        name='full_n2'
                        error={electroSection.full_n2? (electroSection.full_n2 < 4? true: false):false}
                        value={electroSection.full_n2 || ''}
                        onChange={handleChange}></TextField>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='NaOH Flow Rate'
                        placeholder="20-22 m³/hr" 
                        style = {{minWidth: '100%'}}
                        name='naoh_flowrate'
                        error={electroSection.naoh_flowrate? ((electroSection.naoh_flowrate < 20 || electroSection.naoh_flowrate > 22)? true: false):false}
                        value={electroSection.naoh_flowrate || ''}
                        onChange={handleChange}></TextField>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={6}>
                        <FormControl style = {{minWidth: '100%'}}>
                            <InputLabel id="dbfree">DB Free Cl Quality</InputLabel>
                            <Select
                            labelid="dbfree"
                            label="DB Free Cl Quality"
                            defaultValue = ""
                            name='db_free_cl_qual'
                            error = {electroSection.db_free_cl_qual === "POSITIVE"? true: false}
                            value={electroSection.db_free_cl_qual || ''}
                            onChange={handleChange}>
                                <MenuItem value={'POSITIVE'}>Positive</MenuItem>
                                <MenuItem value={'NEGATIVE'}>Negative</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='Decomposer Operating Temp' 
                        placeholder=">= 65" 
                        style = {{minWidth: '100%'}}
                        name='decomposer_op_temp'
                        error={electroSection.decomposer_op_temp? (electroSection.decomposer_op_temp < 65? true: false):false}
                        value={electroSection.decomposer_op_temp || ''} 
                        onChange={handleChange}></TextField>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='DB Concentration'
                        placeholder="180-220" 
                        style = {{minWidth: '100%'}}
                        name='db_conc'
                        error={electroSection.db_conc? ((electroSection.db_conc < 180 || electroSection.db_conc > 220)? true: false):false}
                        value={electroSection.db_conc || ''}
                        onChange={handleChange}></TextField>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='SPB concentration'
                        placeholder="280-320" 
                        style = {{minWidth: '100%'}}
                        name='spb_conc'
                        error={electroSection.spb_conc? ((electroSection.spb_conc < 280 || electroSection.spb_conc > 320)? true: false):false}
                        value={electroSection.spb_conc || ''}
                        onChange={handleChange}></TextField>
                    </Grid>
                </Grid>
            </div>

            <div style = {{  marginBottom: '3%'}}>
                <Typography variant="h4" style = {{  marginBottom: '1%'}}>Operational Remarks</Typography>
                <Grid container spacing={1}>
                    <Grid item lg={12} sm={12} xs={12}>
                        <TextField
                            variant="outlined"
                            label="Operational Remarks"
                            multiline
                            maxRows={4}
                            style = {{minWidth: '100%'}}
                            name='remarks'
                            value={electroSection.remarks || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default ElectrolysisTab