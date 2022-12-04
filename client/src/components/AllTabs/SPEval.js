import React from "react";
import {Typography, Grid, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addEval } from "../../redux/sectionSlice";
import ErrorSection from "./ErrorSection"

const SPEval = () => {
    const dispatch = useDispatch()
    const {evalSection} = useSelector((state) => state.section)
    const {evalErrors} = useSelector((state) => state.error)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(addEval({name, value}))
    }   

    return(
        <>
            {evalErrors.length === 0? <></>:<ErrorSection errors={evalErrors} type="eval"/>}
            <div style={{marginBottom: '3%'}}>
                <Typography variant="h4">SP Evaluation</Typography>
                <Grid container spacing={1}>
                    <Grid item lg={3} sm={6} xs={6}>
                        <FormControl style={{minWidth: '100%'}}>
                            <InputLabel id="planned vol">Planned Volume Attained</InputLabel>
                            <Select 
                            labelid="planned vol"
                            label= "Planned Volume Attained"
                            defaultValue = ''
                            name='plan_vol_att'
                            value={evalSection.plan_vol_att || ''}
                            onChange={handleChange}>
                                <MenuItem value={'YES'}>YES</MenuItem>
                                <MenuItem value={'NO'}>NO</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item lg={3} sm={6} xs={6}>
                        <FormControl style={{minWidth: '100%'}}>
                            <InputLabel id="prod no">Production No. Off Specs</InputLabel>
                            <Select
                            labelid="prod no"
                            label= "Production No. Off Specs"
                            defaultValue = ''
                            name='prod_num_offspecs'
                            value={evalSection.prod_num_offspecs || ''}
                            onChange={handleChange}>
                                <MenuItem value={'YES'}>YES</MenuItem>
                                <MenuItem value={'NO'}>NO</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item lg={3} sm={6} xs={6}>
                        <FormControl style={{minWidth: '100%'}}>
                            <InputLabel id="spec usage">Specific Usage lte Standard</InputLabel>
                            <Select 
                            labelid="spec usage"
                            label= "Specific Usage lte Standard"
                            defaultValue = ''
                            name='spec_usage'
                            value={evalSection.spec_usage || ''}
                            onChange={handleChange}>
                                <MenuItem value={'YES'}>YES</MenuItem>
                                <MenuItem value={'NO'}>NO</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item lg={3} sm={6} xs={6}>
                        <FormControl style={{minWidth: '100%'}}>
                            <InputLabel id="proc control">Process Control within Range</InputLabel>
                            <Select 
                            labelid="proc control"
                            label= "Process Control within Range"
                            defaultValue = ''
                            name='proc_ctrl_range'
                            value={evalSection.proc_ctrl_range || ''}
                            onChange={handleChange}>
                                <MenuItem value={'YES'}>YES</MenuItem>
                                <MenuItem value={'NO'}>NO</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item lg={3} sm={6} xs={6}>
                        <FormControl style={{minWidth: '100%'}}>
                            <InputLabel id="manpower">Manpower no 24hrs duty</InputLabel>
                            <Select 
                            labelid="manpower"
                            label= "Manpower no 24hrs duty"
                            defaultValue = ''
                            name='manpower_no_24duty'
                            value={evalSection.manpower_no_24duty || ''}
                            onChange={handleChange}>
                                <MenuItem value={'YES'}>YES</MenuItem>
                                <MenuItem value={'NO'}>NO</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item lg={3} sm={6} xs={6}>
                        <FormControl style={{minWidth: '100%'}}>
                            <InputLabel id="completeness">Shift Report Completeness</InputLabel>
                            <Select
                            labelid="completeness"
                            label= "Shift Report Completeness"
                            defaultValue = ''
                            name='shift_report_completeness'
                            value={evalSection.shift_report_completeness || ''}
                            onChange={handleChange}>
                                <MenuItem value={'YES'}>YES</MenuItem>
                                <MenuItem value={'NO'}>NO</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item lg={3} sm={6} xs={6}>
                        <FormControl style={{minWidth: '100%'}}>
                            <InputLabel id="rating">Shift Rating</InputLabel>
                            <Select
                            labelid="rating"
                            label= "Shift Rating"
                            defaultValue = ''
                            name='shift_rating'
                            value={evalSection.shift_rating || ''}
                            onChange={handleChange}>
                                <MenuItem value={'FAIL'}>FAILURE</MenuItem>
                                <MenuItem value={'POOR'}>POOR</MenuItem>
                                <MenuItem value={'LOW SATISFACTORY'}>LOW SATISFACTORY</MenuItem>
                                <MenuItem value={'SATISFACTORY'}>SATISFACTORY</MenuItem>
                                <MenuItem value={'HIGH SATISFACTORY'}>HIGH SATISFACTORY</MenuItem>
                                <MenuItem value={'PERFECT'}>PERFECT</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default SPEval