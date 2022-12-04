let names = ['Haron Paul Lorente', 'Hannah Patriz Lorente', 'Jazon Troy Jaralve']
let inters = ['YES', 'NO', 'PARTIAL']
let cellsvolt = ['B143', 'B231', 'B43', 'B34', 'B10', 'B124', 'None']
let brineoverflow = ['RESATURATOR', 'MIXING TANKS', 'T132', 'T136', 'NONE']

export const controlRoom_values = {
    previous_operator: '',
    present_operator: '',
    incoming_operator: '',
    hours: '',
    interlock_engaged: '',
    daq_operational: '',
    rr_water: '',   
    cells: '',
    avg_load: '',
    eos_load: '',
    rd_water: '',
    cells_voltage: '',
    cells_total_voltage: '',
    xformer_oil_temp: '',
    remarks: ''
} 

export const hcl_values = {
    hcl: '',
    previous_operator: '',
    present_operator: '',
    incoming_operator: '',
    hcl_hours: '',
    lcp_hours: '',
    hcl_synth_eff: '',
    hcl_prod_temp: '',
    scrubbed_cl_temp: '',
    hcl_conc: '',
    hcl_sg: '',
    sigri_cooling_water: '',
    hcl_space: '',
    clh20_flowrate: '',
    sigri_inlet_pressure_c: '',
    sigri_inlet_pressure_h: '',
    full_n2: '',
    remarks: ''
}


export const evap_values = {
    previous_operator: '',
    present_operator: '',
    incoming_operator: '',
    hours: '',
    evap_eff: '',
    naoh_prod: '',
    evap_feed_flowrate: '',
    naoh_total_volume: '',
    naoh_conc: '',
    naoh_sg: '',
    t8_level: '',
    t9_level: '',
    vacuum_pressure: '',
    theoretical: '',
    remarks: ''
}

export const prBrine_values = {
    previous_operator: '',
    present_operator: '',
    incoming_operator: '',
    salt_loaded: '',
    pbrine_conc: '',
    precoat: '',
    precoat_op_hours: '',
    camg_conc: '',
    xcess_naoh_conc: '',
    diff_pressure_precoat: '',
    brine_overflow: '',
    xcess_na2co3_conc: '',
    precoat_flowrate: '',
    remarks: ''
}

export const electro_values = {
    previous_operator: '',
    present_operator: '',
    incoming_operator: '',
    electro_eff: '',
    cell_liq_prod: '',
    spb_inlet_temp: '',
    naoh_inlet_temp: '',
    chelate_op_hours_ta: '',
    chelate_op_hours_tb: '',
    naoh_conc: '',
    naoh_sg: '',
    naoh_flowrate: '',
    db_free_cl_qual: '',
    decomposer_op_temp: '',
    db_conc: '',
    spb_conc: '',
    full_n2: '',
    remarks: ''
}

export const naclo_values = {
    previous_operator: '',
    present_operator: '',
    incoming_operator: '',
    hours: '',
    naclo_ct1: '',
    naclo_ct2: '',
    naclo_ct3: '',
    naclo_ct4: '',
    fline1: '', 
    fline2: '', 
    fline3: '', 
    fline4: '', 
    naoh_ct1: '',
    naoh_ct2: '',
    naoh_ct3: '',
    naoh_ct4: '',
    storage1: '',
    storage2: '',
    storage3: '',
    storage4: '',
    space: '',
    production: '',
    remarks: ''
}

export const qcbrine_values = {
    spb_camg: '',
    spb_naclo3: '',
    spb_na2so4: '',
    db_naclo3: '',
    db_nacl: '',
    db_free_cl: '',
    naoh_conc_50: '',
    naoh_conc_32: '',
    naohfe_conc: '',
    hcl_online: '',
    remarks: ''
}

export const usages_values = {
    ac_salt: '',
    ac_soda_ash: '',
    ac_naoh: '',
    ac_hcl: '',
    ac_bacl2: '',
    ac_flocullant: '',
    ac_na2so3: '',
    ac_alpha_cellulose: '',
    ac_power: '',
    ac_steam_evap: '',
    ac_steam_brine: '',
    pdn_salt: '',
    pdn_soda_ash: '',
    pdn_naoh: '',
    pdn_hcl: '',
    pdn_bacl2: '',
    pdn_flocullant: '',
    pdn_na2so3: '',
    pdn_alpha_cellulose: '',
    pdn_power: '',
    pdn_steam_evap: '',
    pdn_steam_brine: '',
    mtd_salt: '0',
    mtd_soda_ash: '0',
    mtd_naoh: '0',
    mtd_hcl: '0',
    mtd_bacl2: '0',
    mtd_flocullant: '0',
    mtd_na2so3: '0',
    mtd_alpha_cellulose: '0',
    mtd_power: '0',
    mtd_steam_evap: '0',
    mtd_steam_brine: '0',
    clt_ph: '',
    cold_well_ph: '',
    total_ph: '',
    after_digester_ph: '',
    naoh_50: '',
    naoh_32: '',
    hcl: '',
    naocl: '',
    naocl_waste: ''
}

export const eval_values = {
    plan_vol_att: 'YES',
    prod_num_offspecs: 'YES',
    spec_usage: 'YES',
    proc_ctrl_range: 'YES',
    manpower_no_24duty: 'YES',
    shift_report_completeness: 'YES',
    shift_rating: 'PERFECT'
}