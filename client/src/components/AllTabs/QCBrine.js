import React from "react";
import {Select, MenuItem, FormControl, InputLabel, Typography, Grid, TextField} from "@mui/material";
import {useSelector, useDispatch} from 'react-redux'
import { addQcbrine } from "../../redux/sectionSlice";
import ErrorSection from "./ErrorSection";

const QCBrine = () => {
    const dispatch = useDispatch()
    const {qcBrineSection} = useSelector((state) => state.section)
    const {qcBrineErrors} = useSelector((state) => state.error)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(addQcbrine({name, value}))
    }   

    return(
        <>
            <div style = {{marginBottom: '3%'}}>
                {qcBrineErrors.length === 0? <></>:<ErrorSection errors={qcBrineErrors} type="qcbrine"/>}
                <Typography variant="h4" style = {{marginBottom: '1%'}}>Quality Control Brine</Typography>
                <Grid container spacing={1}>
                    <Grid item lg= {3} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='SPB Ca+MG' 
                        placeholder="20 ppb mx" 
                        style = {{minWidth: '100%'}}
                        name='spb_camg'
                        error={qcBrineSection.spb_camg? (qcBrineSection.spb_camg > 20? true: false):false}
                        value={qcBrineSection.spb_camg || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='SPB NaClO3' 
                        placeholder="20 gpl max" 
                        style = {{minWidth: '100%'}}
                        name='spb_naclo3'
                        error={qcBrineSection.spb_naclo3? (qcBrineSection.spb_naclo3 > 20? true: false):false}
                        value={qcBrineSection.spb_naclo3 || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='SPB Na2SO4' 
                        placeholder="7 gpl max" 
                        style = {{minWidth: '100%'}}
                        name='spb_na2so4'
                        error={qcBrineSection.spb_na2so4? (qcBrineSection.spb_na2so4 > 7? true: false):false}
                        value={qcBrineSection.spb_na2so4 || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='DB NaClO3' 
                        placeholder="20 gpl mx" 
                        style = {{minWidth: '100%'}}
                        name='db_naclo3'
                        error={qcBrineSection.db_naclo3? (qcBrineSection.db_naclo3 > 20? true: false):false}
                        value={qcBrineSection.db_naclo3 || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='DB NaCl' 
                        placeholder="180 - 220 gpl" 
                        style = {{minWidth: '100%'}}
                        name='db_nacl'
                        error={qcBrineSection.db_nacl? ((qcBrineSection.db_nacl < 180 || qcBrineSection.db_nacl > 220)? true: false):false}
                        value={qcBrineSection.db_nacl || ''}
                        onChange={handleChange} />
                    </Grid>
                </Grid>
            </div>

            <div style = {{marginBottom: '3%'}}>
                <Typography variant="h4" style = {{marginBottom: '1%'}}>Quality Control Brine and Product</Typography>
                <Grid container spacing={1}>
                    <Grid item lg={3} sm={4} xs={6}>
                        <FormControl style = {{minWidth: '100%'}}>
                            <InputLabel id="dbfree">DB Free Cl Quality</InputLabel>
                            <Select
                            labelid="dbfree"
                            label="DB Free Cl Quality"
                            defaultValue = ""
                            name='db_free_cl'
                            error={qcBrineSection.db_free_cl? (qcBrineSection.db_free_cl === "POSITIVE"? true: false):false}
                            value={qcBrineSection.db_free_cl || ''}
                            onChange={handleChange}>
                                <MenuItem value={'POSITIVE'}> Positive</MenuItem>
                                <MenuItem value={'NEGATIVE'}>Negative</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField
                        type="number" 
                        label='50% NaOH Concentration' 
                        placeholder="48-50%" 
                        style = {{minWidth: '100%'}}
                        name='naoh_conc_50'
                        error={qcBrineSection.naoh_conc_50? ((qcBrineSection.naoh_conc_50 < 48 || qcBrineSection.naoh_conc_50 > 50)? true: false):false}
                        value={qcBrineSection.naoh_conc_50 || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField 
                        type="number"
                        label='32% NaOH Concentration' 
                        placeholder="31-33%" 
                        error={qcBrineSection.naoh_conc_32? ((qcBrineSection.naoh_conc_32 < 31 || qcBrineSection.naoh_conc_32 > 33)? true: false):false}
                        style = {{minWidth: '100%'}}
                        name='naoh_conc_32'
                        value={qcBrineSection.naoh_conc_32 || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField
                        type="number" 
                        label='NaOH Fe Concentration' 
                        placeholder="5 ppm max" 
                        style = {{minWidth: '100%'}}
                        name='naohfe_conc'
                        error={qcBrineSection.naohfe_conc? (qcBrineSection.naohfe_conc > 5? true: false):false}
                        value={qcBrineSection.naohfe_conc || ''}
                        onChange={handleChange} />
                    </Grid>
                    <Grid item lg={3} sm={4} xs={6}>
                        <TextField
                        type="number" 
                        label='HCl on-line' 
                        placeholder="32-33.5" 
                        style = {{minWidth: '100%'}}
                        name='hcl_online'
                        error={qcBrineSection.hcl_online? ((qcBrineSection.hcl_online < 32 || qcBrineSection.hcl_online > 33.5)? true: false):false}
                        value={qcBrineSection.hcl_online || ''}
                        onChange={handleChange} />
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
                            value={qcBrineSection.remarks || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default QCBrine