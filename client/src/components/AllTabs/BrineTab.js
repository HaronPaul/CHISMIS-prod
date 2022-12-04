import React from "react";
import { Grid, Typography, Select, MenuItem, FormControl, InputLabel, TextField} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { addPrBrine } from "../../redux/sectionSlice";
import ErrorSection from './ErrorSection'


const BrineTab = () => {
    const dispatch = useDispatch()
    const {prBrineSection} = useSelector((state) => state.section)
    const {prBrineErrors} = useSelector((state) => state.error)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(addPrBrine({name, value}))
    }

    return(
        <>
            <div style ={{marginBottom: '3%'}}>
                {prBrineErrors.length === 0? <></>:<ErrorSection errors={prBrineErrors} type="prbrine"/>}
                <Typography variant="h6" style ={{marginBottom: '1%'}}> MTD Salt Loaded: </Typography>
                <Typography variant="h4" style ={{marginBottom: '1%'}}>Operators</Typography>
                <Grid container spacing={1}>
                    <Grid item lg={6} sm={6} xs={6}>
                        <FormControl style ={{minWidth: '100%'}}>
                            <InputLabel id="prev_op_brine">Previous Operator</InputLabel>
                            <Select 
                            labelid="prev_op_brine"
                            label="Previous Operator"
                            defaultValue = ""
                            name='previous_operator'
                            value={prBrineSection.previous_operator || ''}
                            onChange={handleChange}>
                                <MenuItem value={'Hoshino Minami'}> Hoshino Minami</MenuItem>
                                <MenuItem value={'Hashimoto Nanami'}>Hashimoto Nanami</MenuItem>
                                <MenuItem value={'Nishino Nanase'}>Nishino Nanase</MenuItem>
                                <MenuItem value={'Sakurai Reika'}>Sakurai Reika</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={6} sm={6} xs={6}>
                        <FormControl style ={{minWidth: '100%'}}>
                            <InputLabel id="pres_op_brine">Present Operator</InputLabel>
                            <Select
                            labelid="pres_op_brine"
                            label="Present Operator"
                            defaultValue = ""
                            name='present_operator'
                            value={prBrineSection.present_operator || ''}
                            onChange={handleChange}>
                                <MenuItem value={'Hoshino Minami'}> Hoshino Minami</MenuItem>
                                <MenuItem value={'Hashimoto Nanami'}>Hashimoto Nanami</MenuItem>
                                <MenuItem value={'Nishino Nanase'}>Nishino Nanase</MenuItem>
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
                            value={prBrineSection.incoming_operator || ''}
                            onChange={handleChange}
                            >
                                <MenuItem value={'Hoshino Minami'}> Hoshino Minami</MenuItem>
                                <MenuItem value={'Hashimoto Nanami'}>Hashimoto Nanami</MenuItem>
                                <MenuItem value={'Nishino Nanase'}>Nishino Nanase</MenuItem>
                                <MenuItem value={'Sakurai Reika'}>Sakurai Reika</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
            
            <div style ={{marginBottom: '3%'}}>
                <Typography variant="h4" style ={{marginBottom: '1%'}}>Parameters</Typography>
                <Grid container spacing={1}>
                    <Grid item lg= {2} sm={4} xs={4}>
                        <TextField
                        label='Salt loaded'
                        placeholder="6-10"
                        type="number"
                        style ={{minWidth: '100%'}}
                        name='salt_loaded'
                        error={prBrineSection.salt_loaded? ((prBrineSection.salt_loaded < 6 || prBrineSection.salt_loaded > 10)? true: false):false}
                        value={prBrineSection.salt_loaded || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        label='Polished Brine Concentration'
                        placeholder="280-320 gpl"
                        type="number"
                        style ={{minWidth: '100%'}}
                        name='pbrine_conc'
                        error={prBrineSection.pbrine_conc? ((prBrineSection.pbrine_conc < 280 || prBrineSection.pbrine_conc > 320)? true: false):false}
                        value={prBrineSection.pbrine_conc || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <FormControl style ={{minWidth: '100%'}}>
                            <InputLabel id="precoat">Precoat</InputLabel>
                            <Select 
                            labelid="precoat"
                            label="Precoat"
                            defaultValue = ""
                            name='precoat'
                            value={prBrineSection.precoat || ''}
                            onChange={handleChange}>
                                <MenuItem value={'A'}> A</MenuItem>
                                <MenuItem value={'B'}>B</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        label='Precoat Operating Hours' 
                        placeholder=">= 24 hours" 
                        type="number"
                        style ={{minWidth: '100%'}}
                        name='precoat_op_hours'
                        error={prBrineSection.precoat_op_hours? (prBrineSection.precoat_op_hours < 24? true: false):false}
                        value={prBrineSection.precoat_op_hours || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        label='Ca+Mg Concentration' 
                        placeholder="5 max" 
                        type="number"
                        style ={{minWidth: '100%'}}
                        name='camg_conc'
                        error={prBrineSection.camg_conc? (prBrineSection.camg_conc > 5? true: false):false}
                        value={prBrineSection.camg_conc || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField 
                        label='Excess NaOH Concentration' 
                        placeholder="0.1 - 1.5" 
                        type="number"
                        style ={{minWidth: '100%'}}
                        name='xcess_naoh_conc'
                        error={prBrineSection.xcess_naoh_conc? ((prBrineSection.xcess_naoh_conc < 0.1 || prBrineSection.xcess_naoh_conc > 1.5)? true: false):false}
                        value={prBrineSection.xcess_naoh_conc || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        label='Differential Pressure in Precoat' 
                        placeholder="<= 0.2" 
                        type="number"
                        style ={{minWidth: '100%'}}
                        name='diff_pressure_precoat'
                        error={prBrineSection.diff_pressure_precoat? (prBrineSection.diff_pressure_precoat > 0.2? true: false):false}
                        value={prBrineSection.diff_pressure_precoat || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <FormControl style ={{minWidth: '100%'}}>
                            <InputLabel id="brine_overflow">Brine Overflow</InputLabel>
                            <Select
                            labelid="brine_overflow"
                            label="Brine Overflow"
                            defaultValue = ""
                            name='brine_overflow'
                            error={prBrineSection.brine_overflow? (prBrineSection.brine_overflow !== "NONE"? true: false):false}
                            value={prBrineSection.brine_overflow || ''}
                            onChange={handleChange}>
                                <MenuItem value={'RESATURATOR'}>RESATURATOR</MenuItem>
                                <MenuItem value={'MIXING TANKS'}>MIXING TANKS</MenuItem>
                                <MenuItem value={'T132'}>T132</MenuItem>
                                <MenuItem value={'T136'}>T136</MenuItem>
                                <MenuItem value={'NONE'}>NONE</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField
                        label='Excess Na2CO3 Concentration'
                        placeholder="0.1 - 1.5"
                        type="number"
                        style ={{minWidth: '100%'}}
                        name='xcess_na2co3_conc'
                        error={prBrineSection.xcess_na2co3_conc? ((prBrineSection.xcess_na2co3_conc < 0.1 || prBrineSection.xcess_na2co3_conc > 1.5)? true: false):false}
                        value={prBrineSection.xcess_na2co3_conc || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={2} sm={4} xs={4}>
                        <TextField 
                        label='Precoat Flow Rate' 
                        placeholder=">= 20 m3/hr"
                        type="number"
                        style ={{minWidth: '100%'}}
                        name='precoat_flowrate'
                        error={prBrineSection.precoat_flowrate? (prBrineSection.precoat_flowrate < 20? true: false):false}
                        value={prBrineSection.precoat_flowrate || ''}
                        onChange={handleChange}/>
                    </Grid>
                </Grid>
            </div>

            <div style ={{marginBottom: '3%'}}>
                <Typography variant="h4" style ={{marginBottom: '1%'}}>Operational Remarks</Typography>
                <Grid container spacing={1}>
                    <Grid item lg={12} sm={12} xs={12}>
                        <TextField
                            variant="outlined"
                            label="Operational Remarks"
                            multiline
                            maxRows={4}
                            style ={{minWidth: '100%'}}
                            name='remarks'
                            value={prBrineSection.remarks || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default BrineTab