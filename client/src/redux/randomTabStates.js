let ctrlNames = ['Haron Paul Lorente', 'Hannah Patriz Lorente', 'Jazon Troy Jaralve', 'Angielle Schnaider']
let hclNames = ['Shiraishi Mai', 'Saito Asuka', 'Ikuta Erika', 'Angielle Schnaider']
let evapNames = ['Akimoto Manatsu', 'Matsumura Sayuri', 'Eto Misa', 'Sakurai Reika']
let prBrineNames = ['Hoshino Minami', 'Hashimoto Nanami', 'Nishino Nanase', 'Sakurai Reika']
let electroNames = ['Hori Miona', 'Shinuchi Mai', 'Terada Ranze', 'Kitano Hinako']
let nacloNames = ['Endo Sakura', 'Kakki Haruka', 'Tsutsui Ayame', 'Kitano Hinako']

let inters = ['YES', 'NO', 'PARTIAL']
let cellsvolt = ['B143', 'B231', 'B43', 'B34', 'B10', 'B124', 'None']
let brineoverflow = ['RESATURATOR', 'MIXING TANKS', 'T132', 'T136', 'NONE']

export const controlRoom_values = {
    // Random Values
    previous_operator: ctrlNames[Math.floor(Math.random() * ctrlNames.length)],
    present_operator: ctrlNames[Math.floor(Math.random() * ctrlNames.length)],
    incoming_operator: ctrlNames[Math.floor(Math.random() * ctrlNames.length)],
    hours: Math.floor((Math.random() * 10) + 1),
    interlock_engaged: inters[Math.floor(Math.random() * inters.length)],
    daq_operational: inters[Math.floor(Math.random() * inters.length)],
    rr_water: parseFloat((Math.random() * 20) + 250).toFixed(2),   
    cells: Math.floor((Math.random() * 70) + 30),
    avg_load: parseFloat((Math.random() * 12.25) + 1).toFixed(2),
    eos_load: parseFloat((Math.random() * 12.25) + 1).toFixed(2),
    rd_water: parseFloat((Math.random() * 20) + 180).toFixed(2),
    cells_voltage:  cellsvolt[Math.floor(Math.random() * cellsvolt.length)],
    cells_total_voltage: parseFloat((Math.random() * 19.2) + 280).toFixed(2),
    xformer_oil_temp: parseFloat((Math.random() * 10) + 80).toFixed(1),
    remarks: 'Lorem ipsum dolor' 
} 

export const hcl_values = {
    // Random values
    hcl: parseFloat((Math.random() * 3) + 10.83).toFixed(2),
    previous_operator: hclNames[Math.floor(Math.random() * hclNames.length)],
    present_operator: hclNames[Math.floor(Math.random() * hclNames.length)],
    incoming_operator: hclNames[Math.floor(Math.random() * hclNames.length)],
    hcl_hours: Math.floor((Math.random() * 10) + 1),
    lcp_hours: Math.floor((Math.random() * 10) + 1),
    hcl_synth_eff: '',
    hcl_prod_temp: parseFloat((Math.random() * 5) + 45).toFixed(1),
    scrubbed_cl_temp: parseFloat((Math.random() * 5) + 35).toFixed(1),
    hcl_conc: parseFloat((Math.random() * 1.51) + 32).toFixed(2),
    hcl_sg: parseFloat((Math.random() * 5) + 32).toFixed(2),
    sigri_cooling_water: 3,
    hcl_space: parseFloat((Math.random() * 10) + 200).toFixed(2),
    clh20_flowrate: parseFloat((Math.random() * 10) + 20).toFixed(2),
    sigri_inlet_pressure_c: parseFloat((Math.random() * 4) + 246).toFixed(2),
    sigri_inlet_pressure_h: parseFloat((Math.random() * 4) + 246).toFixed(2),
    full_n2: parseFloat((Math.random() * 5) + 10).toFixed(2),
    remarks: 'This is another remark'
}


export const evap_values = {
    // Random Values
    previous_operator: evapNames[Math.floor(Math.random() * evapNames.length)],
    present_operator: evapNames[Math.floor(Math.random() * evapNames.length)],
    incoming_operator: evapNames[Math.floor(Math.random() * evapNames.length)],
    hours: Math.floor((Math.random() * 10) + 1),
    evap_eff: '',
    naoh_prod: parseFloat((Math.random() * 3) + 10.83).toFixed(2),
    evap_feed_flowrate: parseFloat((Math.random() * 2) + 3).toFixed(2),
    naoh_total_volume: 3,
    naoh_conc: parseFloat((Math.random() * 2) + 48).toFixed(2),
    naoh_sg: 21,
    t8_level: parseFloat((Math.random() * 5) + 300).toFixed(2),
    t9_level: parseFloat((Math.random() * 5) + 300).toFixed(2),
    vacuum_pressure: parseFloat((Math.random() * 200) + 400).toFixed(2),
    theoretical: '',
    remarks: 'This is a remark from Evaporator'
}

export const prBrine_values = {
    // Random Values
    previous_operator: prBrineNames[Math.floor(Math.random() * prBrineNames.length)],
    present_operator: prBrineNames[Math.floor(Math.random() * prBrineNames.length)],
    incoming_operator: prBrineNames[Math.floor(Math.random() * prBrineNames.length)],
    salt_loaded: parseFloat((Math.random() * 4) + 6).toFixed(2),
    pbrine_conc: parseFloat((Math.random() * 40) + 280).toFixed(2),
    precoat: 'B',
    precoat_op_hours: parseFloat((Math.random() * 4) + 24).toFixed(2),
    camg_conc: parseFloat((Math.random() * 4) + 1).toFixed(2),
    xcess_naoh_conc: parseFloat((Math.random() * 0.1) + 1.4).toFixed(2),
    diff_pressure_precoat: parseFloat(Math.random() * (0.2 - 0 + 1) + 0).toFixed(2),
    brine_overflow: brineoverflow[Math.floor(Math.random() * brineoverflow.length)],
    xcess_na2co3_conc: parseFloat(Math.random() * (1.5 - 0.1 + 1) + 0.1).toFixed(2),
    precoat_flowrate: parseFloat(Math.random() * (25 - 20 + 1) + 20).toFixed(2),
    remarks: 'This is a remark from pr brine'
}

export const electro_values = {
    // Random values
    previous_operator: electroNames[Math.floor(Math.random() * electroNames.length)],
    present_operator: electroNames[Math.floor(Math.random() * electroNames.length)],
    incoming_operator: electroNames[Math.floor(Math.random() * electroNames.length)],
    electro_eff: '',
    cell_liq_prod: parseFloat(Math.random() * (15 - 11.9 + 1) + 11.9).toFixed(2),
    spb_inlet_temp: parseFloat(Math.random() * (70 - 60 + 1) + 60).toFixed(2),
    naoh_inlet_temp: parseFloat(Math.random() * (92 - 88 + 1) + 88).toFixed(2),
    chelate_op_hours_ta: parseFloat(Math.random() * (45 - 42 + 1) + 42).toFixed(2),
    chelate_op_hours_tb: parseFloat(Math.random() * (45 - 42 + 1) + 42).toFixed(2),
    naoh_conc: parseFloat(Math.random() * (33 - 31 + 1) + 31).toFixed(2),
    naoh_sg: parseFloat(Math.random() * (15 - 10 + 1) + 10).toFixed(2),
    naoh_flowrate: parseFloat(Math.random() * (22 - 20 + 1) + 20).toFixed(2),
    db_free_cl_qual: 'NEGATIVE',
    decomposer_op_temp: parseFloat(Math.random() * (70 - 65 + 1) + 65).toFixed(2),
    db_conc: parseFloat(Math.random() * (220 - 180 + 1) + 180).toFixed(2),
    spb_conc: parseFloat(Math.random() * (320 - 280 + 1) + 280).toFixed(2),
    full_n2: parseFloat(Math.random() * (4 - 1 + 1) + 1).toFixed(2),
    remarks: 'This is a remark from electrolysis'
}

export const naclo_values = {
    // Random values
    previous_operator: nacloNames[Math.floor(Math.random() * nacloNames.length)],
    present_operator: nacloNames[Math.floor(Math.random() * nacloNames.length)],
    incoming_operator: nacloNames[Math.floor(Math.random() * nacloNames.length)],
    hours: Math.floor((Math.random() * 10) + 1),
    naclo_ct1: parseFloat(Math.random() * (8.1 - 7.5) + 7.5).toFixed(2),
    naclo_ct2: parseFloat(Math.random() * (8.1 - 7.5) + 7.5).toFixed(2),
    naclo_ct3: parseFloat(Math.random() * (8.1 - 7.5) + 7.5).toFixed(2),
    naclo_ct4: parseFloat(Math.random() * (8.1 - 7.5) + 7.5).toFixed(2),
    fline1: parseFloat(Math.random() * (110 - 100) + 100).toFixed(2), 
    fline2: parseFloat(Math.random() * (110 - 100) + 100).toFixed(2), 
    fline3: parseFloat(Math.random() * (110 - 100) + 100).toFixed(2), 
    fline4: parseFloat(Math.random() * (110 - 100) + 100).toFixed(2), 
    naoh_ct1: parseFloat(Math.random() * (1 - 0.4) + 0.4).toFixed(2),
    naoh_ct2: parseFloat(Math.random() * (1 - 0.4) + 0.4).toFixed(2),
    naoh_ct3: parseFloat(Math.random() * (1 - 0.4) + 0.4).toFixed(2),
    naoh_ct4: parseFloat(Math.random() * (1 - 0.4) + 0.4).toFixed(2),
    storage1: parseFloat(Math.random() * (20 - 10) + 10).toFixed(2),
    storage2: parseFloat(Math.random() * (20 - 10) + 10).toFixed(2),
    storage3: parseFloat(Math.random() * (20 - 10) + 10).toFixed(2),
    storage4: parseFloat(Math.random() * (20 - 10) + 10).toFixed(2),
    space: parseFloat(Math.random() * (150 - 140) + 140).toFixed(2),
    production: parseFloat(Math.random() * (40 - 20) + 20).toFixed(2),
    remarks: 'This is a remark from naclo'
}

export const qcbrine_values = {
    spb_camg: parseFloat(Math.random() * (20 - 10) + 10).toFixed(2),
    spb_naclo3: parseFloat(Math.random() * (20 - 10) + 10).toFixed(2),
    spb_na2so4: parseFloat(Math.random() * (7 - 1) + 1).toFixed(2),
    db_naclo3: parseFloat(Math.random() * (20 - 10) + 10).toFixed(2),
    db_nacl: parseFloat(Math.random() * (220 - 180) + 180).toFixed(2),
    db_free_cl: 'NEGATIVE',
    naoh_conc_50: parseFloat(Math.random() * (50 - 48) + 48).toFixed(2),
    naoh_conc_32: parseFloat(Math.random() * (33 - 31) + 31).toFixed(2),
    naohfe_conc: parseFloat(Math.random() * (5 - 1) + 1).toFixed(2),
    hcl_online: parseFloat(Math.random() * (33.5 - 32) + 32).toFixed(2),
    remarks: 'This is a remark from qc brine'
}

export const usages_values = {
    ac_salt: parseFloat(Math.random() * (100 - 20) + 20).toFixed(2),
    ac_soda_ash: parseFloat(Math.random() * (100 - 20) + 20).toFixed(2),
    ac_naoh: parseFloat(Math.random() * (100 - 20) + 20).toFixed(2),
    ac_hcl: parseFloat(Math.random() * (100 - 20) + 20).toFixed(2),
    ac_bacl2: parseFloat(Math.random() * (100 - 20) + 20).toFixed(2),
    ac_flocullant: parseFloat(Math.random() * (100 - 20) + 20).toFixed(2),
    ac_na2so3: parseFloat(Math.random() * (100 - 20) + 20).toFixed(2),
    ac_alpha_cellulose: parseFloat(Math.random() * (100 - 20) + 20).toFixed(2),
    ac_power: parseFloat(Math.random() * (100 - 20) + 20).toFixed(2),
    ac_steam_evap: parseFloat(Math.random() * (100 - 20) + 20).toFixed(2),
    ac_steam_brine: parseFloat(Math.random() * (100 - 20) + 20).toFixed(2),
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
    clt_ph: parseFloat(Math.random() * (9 - 6.5) + 6.5).toFixed(2),
    cold_well_ph:  parseFloat(Math.random() * (9 - 6.5) + 6.5).toFixed(2),
    total_ph:  parseFloat(Math.random() * (9 - 6.5) + 6.5).toFixed(2),
    after_digester_ph:  parseFloat(Math.random() * (9 - 6.5) + 6.5).toFixed(2),
    naoh_50: parseFloat(Math.random() * (100 - 20) + 20).toFixed(2),
    naoh_32: parseFloat(Math.random() * (100 - 20) + 20).toFixed(2),
    hcl: parseFloat(Math.random() * (100 - 20) + 20).toFixed(2),
    naocl: parseFloat(Math.random() * (100 - 20) + 20).toFixed(2),
    naocl_waste: parseFloat(Math.random() * (100 - 20) + 20).toFixed(2)
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
