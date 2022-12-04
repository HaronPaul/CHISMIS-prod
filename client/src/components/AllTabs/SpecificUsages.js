import React, {useEffect} from "react";
import {Typography, Grid, TextField} from "@mui/material";
import {useSelector, useDispatch} from 'react-redux'
import { addUsages} from "../../redux/sectionSlice";
import ErrorSection from './ErrorSection'

const SpecificUsagesTab = () => {
    const dispatch = useDispatch()
    const {usagesSection} = useSelector((state) => state.section)
    const {usagesErrors} = useSelector((state)=>state.error)

    const handleChange = (name, value) => {
        //  Change the Actual Consumption value
        dispatch(addUsages({name, value}))
    }

    return(
        <>
            {usagesErrors.length === 0? <></>:<ErrorSection errors={usagesErrors} type="usages"/>}
            <div style={{marginBottom: '3%'}}>
                <Typography variant="h4" style={{marginBottom: '1%'}}>Specific Usages - Actual Consumption</Typography>
                <Grid container spacing={1}>
                    <Grid item lg= {2} sm={2} xs={6}>
                        <TextField label='Salt' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='ac_salt'
                        value={parseFloat(usagesSection.ac_salt) || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item lg={2} sm={2} xs={6}>
                        <TextField label='Soda Ash' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='ac_soda_ash'
                        value={usagesSection.ac_soda_ash || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item lg={2} sm={2} xs={6}>
                        <TextField label='NaOH' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='ac_naoh'
                        value={usagesSection.ac_naoh || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item lg={2} sm={2} xs={6}>
                        <TextField label='HCl' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='ac_hcl'
                        value={usagesSection.ac_hcl || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item lg={2} sm={2} xs={6}>
                        <TextField label='BaCl2' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='ac_bacl2'
                        value={usagesSection.ac_bacl2 || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item lg={2} sm={2} xs={6}>
                        <TextField label='Flocullant' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='ac_flocullant'
                        value={usagesSection.ac_flocullant || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item lg={2} sm={2} xs={6}>
                        <TextField label='Sodium Sulfite' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='ac_na2so3'
                        value={usagesSection.ac_na2so3 || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item lg={2} sm={2} xs={6}>
                        <TextField label='Alpha Cellulose' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='ac_alpha_cellulose'
                        value={usagesSection.ac_alpha_cellulose || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item lg={2} sm={2} xs={6}>
                        <TextField label='Power' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='ac_power'
                        value={usagesSection.ac_power || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item lg={2} sm={2} xs={6}>
                        <TextField label='Steam Evaporation' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='ac_steam_evap'
                        value={usagesSection.ac_steam_evap || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item lg={2} sm={2} xs={6}>
                        <TextField label='Steam Brine' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='ac_steam_brine'
                        value={usagesSection.ac_steam_brine || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                </Grid>
            </div>
            
            <div style={{marginBottom: '3%'}}>
                <Typography variant="h4" style={{marginBottom: '1%'}}>Environment Monitoring</Typography>
                <Grid container spacing={1}>
                    <Grid item lg= {2} sm={2} xs={6}>
                        <TextField label='CLT pH' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='clt_ph'
                        error = {usagesSection.clt_ph? (usagesSection.clt_ph < 6.5 || usagesSection.clt_ph > 9? true: false):false}
                        value={usagesSection.clt_ph || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item lg={2} sm={2} xs={6}>
                        <TextField label='Cold Well pH' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='cold_well_ph'
                        error = {usagesSection.cold_well_ph? (usagesSection.cold_well_ph < 6.5 || usagesSection.cold_well_ph > 9? true: false):false}
                        value={usagesSection.cold_well_ph || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item lg={2} sm={2} xs={6}>
                        <TextField label='Total pH' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='total_ph'
                        error = {usagesSection.total_ph? (usagesSection.total_ph < 6.5 || usagesSection.total_ph > 9? true: false):false}
                        value={usagesSection.total_ph || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item lg={2} sm={2} xs={6}>
                        <TextField label='After Digester pH' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='after_digester_ph'
                        error = {usagesSection.after_digester_ph? (usagesSection.after_digester_ph < 6.5 || usagesSection.after_digester_ph > 9? true: false):false}
                        value={usagesSection.after_digester_ph || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                </Grid>
            </div>

            <div style={{marginBottom: '3%'}}>
                <Typography variant="h4" style={{marginBottom: '1%'}}>Product Transfers</Typography>
                <Grid container spacing={1}>
                    <Grid item lg= {2} sm={2} xs={6}>
                        <TextField label='50% NaOH' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='naoh_50'
                        value={usagesSection.naoh_50 || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item lg={2} sm={2} xs={6}>
                        <TextField label='32% NaOH' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='naoh_32'
                        value={usagesSection.naoh_32 || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item lg={2} sm={2} xs={6}>
                        <TextField label='HCl' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='hcl'
                        value={usagesSection.hcl || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item lg={2} sm={2} xs={6}>
                        <TextField label='NaOCl' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='naocl'
                        value={usagesSection.naocl || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                    <Grid item lg={2} sm={2} xs={6}>
                        <TextField label='NaOCl to waste treatment' placeholder="" style={{minWidth: '100%'}}
                        type="number"
                        name='naocl_waste'
                        value={usagesSection.naocl_waste || ''}
                        onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default SpecificUsagesTab