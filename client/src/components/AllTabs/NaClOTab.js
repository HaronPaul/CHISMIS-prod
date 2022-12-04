import React from "react";
import {Select, MenuItem, FormControl, InputLabel, Typography, Grid, TextField} from "@mui/material";
import {useDispatch, useSelector} from 'react-redux'
import { addNaocl } from "../../redux/sectionSlice";
import ErrorSection from "./ErrorSection";

const NaCLOTab = () => {
    const dispatch = useDispatch()
    const {nacloSection} = useSelector((state) => state.section)
    const {nacloErrors} = useSelector((state)=>state.error)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(addNaocl({name, value}))
    }   

    return(
        <>
            <div style = {{marginBottom: '3%'}}>
                {nacloErrors.length === 0? <></>:<ErrorSection errors={nacloErrors} type="naclo"/>}
                <Typography variant="h4" style = {{marginBottom: '1%'}}>Operators</Typography>
                <Grid container spacing={1}>
                    <Grid item lg={6} sm={6} xs={6}>
                        <FormControl style = {{minWidth: '100%'}}>
                            <InputLabel id="prev_op_naclo">Previous Operator</InputLabel>
                            <Select 
                            labelid="prev_op_naclo"
                            label="Previous Operator"
                            defaultValue = ""
                            name='previous_operator'
                            value={nacloSection.previous_operator || ''}
                            onChange={handleChange}
                            >
                                <MenuItem value={'Endo Sakura'}> Endo Sakura</MenuItem>
                                <MenuItem value={'Kakki Haruka'}>Kakki Haruka</MenuItem>
                                <MenuItem value={'Tsutsui Ayame'}>Tsutsui Ayame</MenuItem>
                                <MenuItem value={'Kitano Hinako'}>Kitano Hinako</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={6} sm={6} xs={6}>
                        <FormControl style = {{minWidth: '100%'}}>
                            <InputLabel id="pres_op_naclo">Present Operator</InputLabel>
                            <Select
                            labelid="pres_op_naclo"
                            label="Present Operator" 
                            defaultValue = ""
                            name='present_operator'
                            value={nacloSection.present_operator || ''}
                            onChange={handleChange}>
                                <MenuItem value={'Endo Sakura'}> Endo Sakura</MenuItem>
                                <MenuItem value={'Kakki Haruka'}>Kakki Haruka</MenuItem>
                                <MenuItem value={'Tsutsui Ayame'}>Tsutsui Ayame</MenuItem>
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
                            value={nacloSection.incoming_operator || ''}
                            onChange={handleChange}
                            >
                                <MenuItem value={'Endo Sakura'}> Endo Sakura</MenuItem>
                                <MenuItem value={'Kakki Haruka'}>Kakki Haruka</MenuItem>
                                <MenuItem value={'Tsutsui Ayame'}>Tsutsui Ayame</MenuItem>
                                <MenuItem value={'Kitano Hinako'}>Kitano Hinako</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>

            <div style = {{marginBottom: '3%'}}>
                <Typography variant="h4" style = {{marginBottom: '1%'}}>NaCLO Concentration</Typography>
                <Grid container spacing={1}>
                    <Grid item lg= {3} sm={4} xs={6}>
                        <TextField
                        type="number" 
                        label='Circulation Tank I' 
                        placeholder="7.5 - 8.1"
                        style = {{minWidth: '100%'}}
                        name='naclo_ct1'
                        error={nacloSection.naclo_ct1? ((nacloSection.naclo_ct1 < 7.5 || nacloSection.naclo_ct1 > 8.1) ? true: false):false}
                        value={nacloSection.naclo_ct1 || ''}
                        onChange={handleChange}></TextField>
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField
                        type="number" 
                        label='Circulation Tank II' 
                        placeholder="7.5 - 8.1"
                        style = {{minWidth: '100%'}}
                        name='naclo_ct2'
                        error={nacloSection.naclo_ct2? ((nacloSection.naclo_ct2 < 7.5 || nacloSection.naclo_ct2 > 8.1) ? true: false):false}
                        value={nacloSection.naclo_ct2 || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField
                        type="number"
                        label='Circulation Tank III'
                        placeholder="7.5 - 8.1"
                        style = {{minWidth: '100%'}}
                        name='naclo_ct3'
                        error={nacloSection.naclo_ct3? ((nacloSection.naclo_ct3 < 7.5 || nacloSection.naclo_ct3 > 8.1) ? true: false):false}
                        value={nacloSection.naclo_ct3 || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='Circulation Tank IV' 
                        placeholder="7.5 - 8.1"
                        style = {{minWidth: '100%'}}
                        name='naclo_ct4'
                        error={nacloSection.naclo_ct4? ((nacloSection.naclo_ct4 < 7.5 || nacloSection.naclo_ct4 > 8.1) ? true: false):false}
                        value={nacloSection.naclo_ct4 || ''}
                        onChange={handleChange} />
                    </Grid>
                </Grid>
            </div>
            
            <div style = {{marginBottom: '3%'}}>
                <Typography variant="h4" style = {{marginBottom: '1%'}}>Filter Batches</Typography>
                <Grid container spacing={1}>
                    <Grid item lg= {3} sm={4} xs={6}>
                        <TextField
                        type="number" 
                        label='Filter Line I'
                        placeholder="<= 110" 
                        style = {{minWidth: '100%'}}
                        name='fline1'
                        error={nacloSection.fline1? (nacloSection.fline1 > 110? true: false):false}
                        value={nacloSection.fline1 || ''}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField
                        type="number" 
                        label='Filter Line II'
                        placeholder="<= 110" 
                        style = {{minWidth: '100%'}}
                        name='fline2'
                        error={nacloSection.fline2? (nacloSection.fline2 > 110? true: false):false}
                        value={nacloSection.fline2 || ''}
                        onChange={handleChange}/ >
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='Filter Line III'
                        placeholder="<= 110" 
                        style = {{minWidth: '100%'}}
                        name='fline3'
                        error={nacloSection.fline3? (nacloSection.fline3 > 110? true: false):false}
                        value={nacloSection.fline3 || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='Filter Line IV' 
                        placeholder="<= 110" 
                        style = {{minWidth: '100%'}}
                        name='fline4'
                        error={nacloSection.fline4? (nacloSection.fline4 > 110? true: false):false}
                        value={nacloSection.fline4 || ''}
                        onChange={handleChange} />
                    </Grid>
                </Grid>
            </div>

            <div style = {{marginBottom: '3%'}}>
                <Typography variant="h4" style = {{marginBottom: '1%'}}>Excess NaOH Concentration</Typography>
                <Grid container spacing={1}>
                    <Grid item lg= {3} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='Circulation Tank I' 
                        placeholder="0.4 - 1" 
                        style = {{minWidth: '100%'}}
                        name='naoh_ct1'
                        error={nacloSection.naoh_ct1? ((nacloSection.naoh_ct1 < 0.4 || nacloSection.naoh_ct1 > 1) ? true: false):false}
                        value={nacloSection.naoh_ct1 || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='Circulation Tank II' 
                        placeholder="0.4 - 1" 
                        style = {{minWidth: '100%'}} 
                        name='naoh_ct2'
                        value={nacloSection.naoh_ct2 || ''}
                        error={nacloSection.naoh_ct2? ((nacloSection.naoh_ct2 < 0.4 || nacloSection.naoh_ct2 > 1) ? true: false):false}
                        onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='Circulation Tank III'
                        placeholder="0.4 - 1" 
                        style = {{minWidth: '100%'}}
                        name='naoh_ct3'
                        error={nacloSection.naoh_ct3? ((nacloSection.naoh_ct3 < 0.4 || nacloSection.naoh_ct3 > 1) ? true: false):false}
                        value={nacloSection.naoh_ct3 || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='Circulation Tank IV' 
                        placeholder="0.4 - 1" 
                        style = {{minWidth: '100%'}}
                        name='naoh_ct4'
                        error={nacloSection.naoh_ct4? ((nacloSection.naoh_ct4 < 0.4 || nacloSection.naoh_ct4 > 1) ? true: false):false}
                        value={nacloSection.naoh_ct4 || ''}
                        onChange={handleChange} />
                    </Grid>
                </Grid>
            </div>
            
            <div style = {{marginBottom: '3%'}}>
                <Typography variant="h4" style = {{marginBottom: '1%'}}>Storage</Typography>
                <Grid container spacing={1}>
                    <Grid item lg= {3} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='Storage I' 
                        placeholder="" 
                        style = {{minWidth: '100%'}}
                        name='storage1'
                        value={nacloSection.storage1 || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField
                        type="number" 
                        label='Storage II' 
                        placeholder="" 
                        style = {{minWidth: '100%'}}
                        name='storage2'
                        value={nacloSection.storage2 || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField
                        type="number" 
                        label='Storage III'
                        placeholder="" 
                        style = {{minWidth: '100%'}}
                        name='storage3'
                        value={nacloSection.storage3 || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='Storage IV' 
                        placeholder="" 
                        style = {{minWidth: '100%'}} 
                        name='storage4'
                        value={nacloSection.storage4 || ''}
                        onChange={handleChange}/>
                    </Grid>
                </Grid>
            </div>

            <div style = {{marginBottom: '3%'}}>
                <Typography variant="h4" style = {{marginBottom: '1%'}}>Production, Space, and Hours</Typography>
                <Grid container spacing={1}>
                    <Grid item lg={6} sm={4} xs={6}>
                        <TextField
                            variant="outlined"
                            label="Hours"
                            type="number"
                            multiline
                            maxRows={4}
                            style = {{minWidth: '100%'}}
                            name='hours'    
                            value={nacloSection.hours || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item lg={6} sm={4} xs={6}>
                        <TextField
                            variant="outlined"
                            label="Space"
                            type="number"
                            placeholder=">= 140"
                            multiline
                            maxRows={4}
                            style = {{minWidth: '100%'}}
                            name='space'    
                            error={nacloSection.space? (nacloSection.space < 140? true: false):false}
                            value={nacloSection.space || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item lg={6} sm={4} xs={6}>
                        <TextField
                            variant="outlined"
                            label="Production"
                            type="number"
                            placeholder=">= 20"
                            multiline
                            maxRows={4}
                            style = {{minWidth: '100%'}}
                            name='production'
                            error={nacloSection.production? (nacloSection.production < 20? true: false):false}
                            value={nacloSection.production || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </div>

            <div style = {{marginBottom: '3%'}}>
                <Typography variant="h4" style = {{marginBottom: '1%'}}>Operational Remarks</Typography>
                <Grid container spacing={1}>
                    <Grid item lg={12} sm={12} xs={12}>
                        <TextField
                            variant="outlined"
                            label="Operational Remarks"
                            multiline
                            maxRows={4}
                            style = {{minWidth: '100%'}}
                            name='remarks'
                            value={nacloSection.remarks || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default NaCLOTab