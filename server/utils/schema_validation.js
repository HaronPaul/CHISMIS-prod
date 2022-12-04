const Joi = require('joi')

// Validation for data control room data
let controlRoomSchema = Joi.object({
    previous_operator: Joi.string().trim().required().messages({
        'string.empty': 'Previous Operator Field Required'
    }),
    present_operator:  Joi.string().trim().required().messages({
        'string.empty': 'Present Operator Field Required'
    }),
    incoming_operator:  Joi.string().trim().required().messages({
        'string.empty': 'Incoming Operator Field Required'
    }),
    interlock_engaged:  Joi.string().trim().required().valid("YES", "NO", "PARTIAL").messages({
        'string.empty': 'Interlock Engaged field required',
        'any.only': 'Interlock Engaged Value must be either YES, NO, or PARTIAL'
    }),
    daq_operational:  Joi.string().trim().required().valid("YES", "NO", "PARTIAL").messages({
        'string.empty': 'DAQ Operational Field Required',
        'any.only': 'Value must be either YES, NO, or PARTIAL'
    }),
    rr_water: Joi.number().required().messages({
        'string.empty': 'Rectifier Raw Water field required',
        'number.base': 'Rectifier Raw Water value must be a number'
    }),
    hours: Joi.number().required().messages({
        'string.empty': 'Hours field required',
        'number.base': 'Number of hours must be a number'
    }),
    cells: Joi.number().required().messages({
        'string.empty': 'Cells field required',
        'number.base': 'Number of cells must be a number'
    }),
    avg_load: Joi.number().required().messages({
        'string.empty': 'Average Load field required',
        'number.base': 'Average Load must be a number'
    }),
    eos_load: Joi.number().required().messages({
        'string.empty': 'End of Shift Load field required',
        'number.base': 'End of Shift Load must be a number'
    }),
    rd_water: Joi.number().required().messages({
        'string.empty': 'Rectifier Demi Water required',
        'number.base': 'Rectifier Demi Water must be a number'
    }),
    cells_voltage: Joi.string().optional().allow(''),
    cells_total_voltage: Joi.number().required().messages({
        'string.empty': 'Cells Total Voltage required',
        'number.base': 'Cells Total Voltage must be a number'
    }),
    xformer_oil_temp: Joi.number().required().messages({
        'string.empty': 'Transformer Oil Temperaturerequired',
        'number.base': 'Transformer Oil Temperature value must be a number'
    }),
    remarks: Joi.string().optional().allow('')
})


let hclSchema = Joi.object({
    previous_operator: Joi.string().required().messages({
        'string.empty': 'Previous Operator Field Required'
    }),
    present_operator: Joi.string().required().messages({
        'string.empty': 'Present Operator Field Required'
    }),
    incoming_operator:  Joi.string().trim().required().messages({
        'string.empty': 'Incoming Operator Field Required'
    }),
    hcl_hours: Joi.number().required().messages({
        'string.empty': 'HCl Hours field required',
        'number.base': 'Number of HCl hours must be a number'
    }),
    lcp_hours: Joi.number().required().messages({
        'string.empty': 'LCP Hours field required',
        'number.base': 'Number of LCP hours must be a number'
    }),
    hcl: Joi.number().required().messages({
        'string.empty': 'HCL Field Required',
        'number.base': 'HCL must be a number'
    }),
    hcl_synth_eff: Joi.number().required().messages({
        'string.empty': 'HCL Synthesis Efficiency Field Required',
        'number.base': 'HCL Synthesis Efficiency must be a number'
    }),
    hcl_prod_temp : Joi.number().required().messages({
        'string.empty': 'HCL Product Temperature Required',
        'number.base': 'HCL Product Temperature must be a number'
    }),
    scrubbed_cl_temp: Joi.number().required().messages({
        'string.empty': 'Scrubbed Cl Temperature Field Required',
        'number.base': 'Scrubbed Cl Temperature must be a number'
    }),
    hcl_conc: Joi.number().required().messages({
        'string.empty': 'HCL Concentration Field Required',
        'number.base': 'HCL Concentration Field must be a number'
    }),
    hcl_sg: Joi.number().required().messages({
        'string.empty': 'HCL Specific Gravity Field Required',
        'number.base': 'HCL Specific Gravity must be a number'
    }),
    sigri_cooling_water: Joi.number().required().messages({
        'string.empty': 'Sigri Cooling Water Field Required',
        'number.base': 'Sigri Cooling Water must be a number'
    }),
    hcl_space: Joi.number().required().messages({
        'string.empty': 'HCL Space Field Required',
        'number.base': 'HCL Space must be a number'
    }),
    clh20_flowrate: Joi.number().required().messages({
        'string.empty': 'ClH20 Flow Rate Field Required',
        'number.base': 'ClH20 Flow Rate must be a number'
    }),
    sigri_inlet_pressure_c: Joi.number().required().messages({
        'string.empty': 'Sigri Inlet Pressure Chlorine Required',
        'number.base': 'Sigri Inlet Pressure Chlorine must be a number'
    }),
    sigri_inlet_pressure_h: Joi.number().required().messages({
        'string.empty': 'Sigri Inlet Pressure Hydrogen Required',
        'number.base': 'Sigri Inlet Pressure Hydrogen must be a number'
    }),
    full_n2: Joi.number().required().messages({
        'string.empty': 'Full N2 On-site Required',
        'number.base': 'Full N2 On-site must be a number'
    }),
    remarks: Joi.string().optional().allow('')
})

const evapSchema = Joi.object({
    previous_operator: Joi.string().trim().required().messages({
        'string.empty': 'Previous Operator Field Required'
    }),
    present_operator:  Joi.string().trim().required().messages({
        'string.empty': 'Present Operator Field Required'
    }),
    incoming_operator:  Joi.string().trim().required().messages({
        'string.empty': 'Incoming Operator Field Required'
    }),
    hours: Joi.number().required().messages({
        'string.empty': 'Hours field required',
        'number.base': 'Number of hours must be a number'
    }),
    evap_eff: Joi.number().required().messages({
        'string.empty': 'Evaporator Efficiency field required',
        'number.base': 'Evaporator Efficiency must be a number'
    }),
    naoh_prod: Joi.number().required().messages({
        'string.empty': 'NaOH Production field required',
        'number.base': 'NaOH Production must be a number'
    }),
    evap_feed_flowrate: Joi.number().required().messages({
        'string.empty': 'Evap Feed Flow Rate field required',
        'number.base': 'Evap Feed Flow Rate must be a number'
    }),
    naoh_conc: Joi.number().required().messages({
        'string.empty': 'NaOH Concentration field required',
        'number.base': 'NaOH Concentration must be a number'
    }),
    naoh_total_volume: Joi.number().required().messages({
        'string.empty': 'NaOH Total Volume required',
        'number.base': 'NaOH Total Volume must be a number'
    }),
    naoh_sg: Joi.number().required().messages({
        'string.empty': 'NaOH Specific Gravity field required',
        'number.base': 'NaOH Specific Gravity must be a number'
    }),
    t8_level: Joi.number().required().messages({
        'string.empty': 'Tank 8 Level field required',
        'number.base': 'Tank 8 Level must be a number'
    }),
    t9_level: Joi.number().required().messages({
        'string.empty': 'Tank 9 Level field required',
        'number.base': 'Tank 9 Level must be a number'
    }),
    vacuum_pressure: Joi.number().required().messages({
        'string.empty': 'Vacuum Pressure field required',
        'number.base': 'Vacuum Pressure must be a number'
    }),
    theoretical: Joi.number().optional(),
    remarks: Joi.string().optional().allow('')
})

const prBrineSchema = Joi.object({
    previous_operator:  Joi.string().trim().required().messages({
        'string.empty': 'Previous Operator Field Required'
    }),
    present_operator:  Joi.string().trim().required().messages({
        'string.empty': 'Present Operator Field Required'
    }),
    incoming_operator:  Joi.string().trim().required().messages({
        'string.empty': 'Incoming Operator Field Required'
    }),
    salt_loaded: Joi.number().required().messages({
        'string.empty': 'Salt Loaded field required',
        'number.base': 'Salt Loaded must be a number'
    }),
    pbrine_conc: Joi.number().required().messages({
        'string.empty': 'Polished Brine Concentration required',
        'number.base': 'Polished Brine  Concentration must be a number'
    }),
    precoat:  Joi.string().trim().required().valid("A", "B").messages({
        'string.empty': 'Precoat Field Required',
        'any.only': 'Precoat Value must be either A or B'
    }),
    precoat_op_hours: Joi.number().required().messages({
        'string.empty': 'Precoat Operating Hours required',
        'number.base': 'Precoat Operating Hours must be a number'
    }),
    camg_conc: Joi.number().required().messages({
        'string.empty': 'Ca+Mg Concentration field required',
        'number.base': 'Ca+Mg Concentration value must be a number'
    }),
    xcess_naoh_conc: Joi.number().required().messages({
        'string.empty': 'Excess NaOH Concentration required',
        'number.base': 'Excess NaOH Concentration must be a number'
    }),
    diff_pressure_precoat: Joi.number().required().messages({
        'string.empty': 'Differential Pressure in Precoat required',
        'number.base': 'Differential Pressure in Precoat must be a number'
    }),
    brine_overflow: Joi.string().trim().required().valid("RESATURATOR", "MIXING TANKS", "T132", "T136", "NONE").messages({
        'any.only': 'Precoat Value must be either RESATURATOR, MIXING TANKS, T132, T136, or NONE'
    }),
    xcess_na2co3_conc: Joi.number().required().messages({
        'string.empty': 'Excess Na2CO3 required',
        'number.base': 'Excess Na2CO3 must be a number'
    }),
    precoat_flowrate: Joi.number().required().messages({
        'string.empty': 'Precoat Flow Rate required',
        'number.base': 'Precoat Flow Rate must be a number'
    }),
    remarks: Joi.string().optional().allow('')
})

const electroSchema = Joi.object({
    previous_operator: Joi.string().trim().required().messages({
        'string.empty': 'Previous Operator Field Required'
    }),
    present_operator: Joi.string().trim().required().messages({
        'string.empty': 'Present Operator Field Required'
    }),
    incoming_operator:  Joi.string().trim().required().messages({
        'string.empty': 'Incoming Operator Field Required'
    }),
    electro_eff:  Joi.number().required().messages({
        'string.empty': 'Electrolyzer Efficiency required',
        'number.base': 'Electrolyzer Efficiency must be a number'
    }),
    cell_liq_prod:  Joi.number().required().messages({
        'string.empty': 'Cell Liquor Field Required',
        'number.base': 'Cell Liquor must be a number'
    }),
    spb_inlet_temp:  Joi.number().required().messages({
        'string.empty': 'SPB Inlet Temperature Field Required',
        'number.base': 'SPB Inlet Temperature must be a number'
    }),
    naoh_inlet_temp:  Joi.number().required().messages({
        'string.empty': 'NaOH Inlet Temperature Field Required',
        'number.base': 'NaOH Inlet Temperature must be a number'
    }),
    chelate_op_hours_ta:  Joi.number().required().messages({
        'string.empty': 'Chelate Operating Hours Tower A Field Required',
        'number.base': 'Chelate Operating Hours Tower A must be a number'
    }),
    chelate_op_hours_tb:  Joi.number().required().messages({
        'string.empty': 'Chelate Operating Hours Tower B Field Required',
        'number.base': 'Chelate Operating Hours Tower B must be a number'
    }),
    naoh_conc:  Joi.number().required().messages({
        'string.empty': 'NaOH Concentration Field Required',
        'number.base': 'NaOH Concentration must be a number'
    }),
    naoh_sg:  Joi.number().required().messages({
        'string.empty': 'NaOH Specific Gravity Field Required',
        'number.base': 'NaOH Specific Gravity must be a number'
    }),
    naoh_flowrate:  Joi.number().required().messages({
        'string.empty': 'NaOH Flow Rate Field Required',
        'number.base': 'NaOH Flow Rate must be a number'
    }),
    db_free_cl_qual: Joi.string().trim().required().valid("POSITIVE", "NEGATIVE").messages({
        'string.empty': 'DB Free Cl2 Field Required',
        'any.only': 'Value must be either POSTIVE or NEGATIVE'
    }),
    decomposer_op_temp:  Joi.number().required().messages({
        'string.empty': 'Decomposer Operating Temperature Field Required',
        'number.base': 'Decomposer Operating Temperature must be a number'
    }),
    db_conc:  Joi.number().required().messages({
        'string.empty': 'DB Concentration Field Required',
        'number.base': 'DB Concentration must be a number'
    }),
    spb_conc:  Joi.number().required().messages({
        'string.empty': 'SPB Concentration Field Required',
        'number.base': 'SPB Concentration must be a number'
    }),
    full_n2: Joi.number().required().messages({
        'string.empty': 'Full N2 On-site Field Required',
        'number.base': 'Full N2 On-site must be a number'
    }),
    remarks: Joi.string().optional().allow('')
})

const nacloSchema = Joi.object({
    previous_operator: Joi.string().trim().required().messages({
        'string.empty': 'Previous Operator Field Required'
    }),
    present_operator: Joi.string().trim().required().messages({
        'string.empty': 'Present Operator Field Required'
    }),
    incoming_operator:  Joi.string().trim().required().messages({
        'string.empty': 'Incoming Operator Field Required'
    }),
    naclo_ct1: Joi.number().required().messages({
        'string.empty': 'NaClO Circulation Tank 1 Field Required',
        'number.base': 'NaClO Circulation Tank 1 must be a number'
    }),
    naclo_ct2: Joi.number().required().messages({
        'string.empty': 'NaClO Circulation Tank 2 Field Required',
        'number.base': 'NaClO Circulation Tank 2 must be a number'
    }),
    naclo_ct3: Joi.number().required().messages({
        'string.empty': 'NaClO Circulation Tank 3 Field Required',
        'number.base': 'NaClO Circulation Tank 3 must be a number'
    }),
    naclo_ct4: Joi.number().required().messages({
        'string.empty': 'NaClO Circulation Tank 4 Field Required',
        'number.base': 'NaClO Circulation Tank 4 must be a number'
    }),
    fline1: Joi.number().required().messages({
        'string.empty': 'Filter Line 1 Field Required',
        'number.base': 'Filter Line 1 must be a number'
    }), 
    fline2: Joi.number().required().messages({
        'string.empty': 'Filter Line 2 Field Required',
        'number.base': 'Filter Line 2 must be a number'
    }), 
    fline3: Joi.number().required().messages({
        'string.empty': 'Filter Line 3 Field Required',
        'number.base': 'Filter Line 3 must be a number'
    }), 
    fline4: Joi.number().required().messages({
        'string.empty': 'Filter Line 4 Field Required',
        'number.base': 'Filter Line 4 must be a number'
    }), 
    naoh_ct1: Joi.number().required().messages({
        'string.empty': 'Excess NaOH CT1 Field Required',
        'number.base': 'Excess NaOH CT1 must be a number'
    }),
    naoh_ct2: Joi.number().required().messages({
        'string.empty': 'Excess NaOH CT2 Field Required',
        'number.base': 'Excess NaOH CT2 must be a number'
    }),
    naoh_ct3: Joi.number().required().messages({
        'string.empty': 'Excess NaOH CT3 Field Required',
        'number.base': 'Excess NaOH CT3 must be a number'
    }),
    naoh_ct4: Joi.number().required().messages({
        'string.empty': 'Excess NaOH CT4 Field Required',
        'number.base': 'Excess NaOH CT4 must be a number'
    }),
    storage1: Joi.number().required().messages({
        'string.empty': 'Storage 1 Field Required',
        'number.base': 'Storage 1 must be a number'
    }),
    storage2: Joi.number().required().messages({
        'string.empty': 'Storage 2 Field Required',
        'number.base': 'Storage 2 must be a number'
    }),
    storage3: Joi.number().required().messages({
        'string.empty': 'Storage 3 Field Required',
        'number.base': 'Storage 3 must be a number'
    }),
    storage4: Joi.number().required().messages({
        'string.empty': 'Storage 4 Field Required',
        'number.base': 'Storage 4 must be a number'
    }),
    space: Joi.number().required().messages({
        'string.empty': 'Space Field Required',
        'number.base': 'Space must be a number'
    }),
    production: Joi.number().required().messages({
        'string.empty': 'Production Field Required',
        'number.base': 'Production must be a number'
    }),
    hours: Joi.number().required().messages({
        'string.empty': 'Hours Field Required',
        'number.base': 'Hours must be a number'
    }),
    remarks: Joi.string().optional().allow('')
})

const qcBrineschema = Joi.object({
    spb_camg: Joi.number().required().messages({
        'string.empty': 'SPB Ca+MG Field Required',
        'number.base': 'SPB Ca+MG must be a number'
    }),
    spb_naclo3: Joi.number().required().messages({
        'string.empty': 'SPB NaClO3 Field Required',
        'number.base': 'SPB NaClO3 must be a number'
    }),
    spb_na2so4: Joi.number().required().messages({
        'string.empty': 'SPB Na2SO4 Field Required',
        'number.base': 'SPB Na2SO4 must be a number'
    }),
    db_naclo3: Joi.number().required().messages({
        'string.empty': 'DB NaCLO3 Field Required',
        'number.base': 'DB NaCLO3 must be a number'
    }),
    db_nacl: Joi.number().required().messages({
        'string.empty': 'DB NaCl Field Required',
        'number.base': 'DB NaCl must be a number'
    }),
    db_free_cl: Joi.string().trim().required().valid("POSITIVE", "NEGATIVE").messages({
        'string.empty': 'DB Free Cl Field Required',
        'any.only': 'Value must be either POSTIVE or NEGATIVE'
    }),
    naoh_conc_50: Joi.number().required().messages({
        'string.empty': '50% NaOH Concentration Field Required',
        'number.base': '50% NaOH Concentration must be a number'
    }),
    naoh_conc_32: Joi.number().required().messages({
        'string.empty': '32% NaOH Concentration Field Required',
        'number.base': '32% NaOH Concentration must be a number'
    }),
    naohfe_conc: Joi.number().required().messages({
        'string.empty': 'NaOH Fe Concentration Field Required',
        'number.base': 'NaOH Fe Concentration must be a number'
    }),
    hcl_online: Joi.number().required().messages({
        'string.empty': 'HCl Online Field Required',
        'number.base': 'HCl Online must be a number'
    }),
    remarks: Joi.string().optional().allow('')
})

const usagesSchema = Joi.object({
    ac_salt: Joi.number().required().messages({
        'string.empty': 'Salt Actual Consumption Field Required',
        'number.base': 'Salt Actual Consumption must be a number'
    }),
    ac_soda_ash: Joi.number().required().messages({
        'string.empty': 'Soda Ash Actual Consumption Field Required',
        'number.base': 'Soda Ash Actual Consumption must be a number'
    }),
    ac_naoh: Joi.number().required().messages({
        'string.empty': 'NaOH Actual Consumption Field Required',
        'number.base': 'NaOH Actual Consumption must be a number'
    }),
    ac_hcl: Joi.number().required().messages({
        'string.empty': 'HCL Actual Consumption Field Required',
        'number.base': 'HCL Actual Consumption must be a number'
    }),
    ac_bacl2: Joi.number().required().messages({
        'string.empty': 'BaCl2 Actual Consumption Field Required',
        'number.base': 'BaCl2 Actual Consumption must be a number'
    }),
    ac_flocullant: Joi.number().required().messages({
        'string.empty': 'Flocullant Actual Consumption Field Required',
        'number.base': 'Flocullant Actual Consumption must be a number'
    }),
    ac_na2so3: Joi.number().required().messages({
        'string.empty': 'Na2SO3 Actual Consumption Field Required',
        'number.base': 'Na2SO3 Actual Consumption must be a number'
    }),
    ac_alpha_cellulose: Joi.number().required().messages({
        'string.empty': 'Alpha Cellulose Actual Consumption Field Required',
        'number.base': 'Alpha Cellulose Actual Consumption must be a number'
    }),
    ac_power: Joi.number().required().messages({
        'string.empty': 'Power Actual Consumption Field Required',
        'number.base': 'Power Actual Consumption must be a number'
    }),
    ac_steam_evap: Joi.number().required().messages({
        'string.empty': 'Steam Evap Actual Consumption Field Required',
        'number.base': 'Steam Evap Actual Consumption must be a number'
    }),
    ac_steam_brine: Joi.number().required().messages({
        'string.empty': 'Steam Brine Actual Consumption Field Required',
        'number.base': 'Steam Brine Actual Consumption must be a number'
    }),
    pdn_salt: Joi.number().required().messages({
        'string.empty': 'Salt per DMT NaOH Field Required',
        'number.base': 'Salt per DMT NaOH must be a number'
    }),
    pdn_soda_ash: Joi.number().required().messages({
        'string.empty': 'Soda Ash per DMT NaOH Field Required',
        'number.base': 'Soda Ash per DMT NaOH must be a number'
    }),
    pdn_naoh: Joi.number().required().messages({
        'string.empty': 'NaOH per DMT NaOH Field Required',
        'number.base': 'NaOH per DMT NaOH must be a number'
    }),
    pdn_hcl: Joi.number().required().messages({
        'string.empty': 'HCl per DMT NaOH Field Required',
        'number.base': 'HCl per DMT NaOH must be a number'
    }),
    pdn_bacl2: Joi.number().required().messages({
        'string.empty': 'BaCl2 per DMT NaOH Field Required',
        'number.base': 'BaCl2 per DMT NaOH must be a number'
    }),
    pdn_flocullant: Joi.number().required().messages({
        'string.empty': 'Flocullant per DMT NaOH Field Required',
        'number.base': 'Flocullant per DMT NaOH must be a number'
    }),
    pdn_na2so3: Joi.number().required().messages({
        'string.empty': 'Na2SO3 per DMT NaOH Field Required',
        'number.base': 'Na2SO3 per DMT NaOH must be a number'
    }),
    pdn_alpha_cellulose: Joi.number().required().messages({
        'string.empty': 'Alpha Cellulose per DMT NaOH Field Required',
        'number.base': 'Alpha Cellulose per DMT NaOH must be a number'
    }),
    pdn_power: Joi.number().required().messages({
        'string.empty': 'Power per DMT NaOH Field Required',
        'number.base': 'Power per DMT NaOH must be a number'
    }),
    pdn_steam_evap: Joi.number().required().messages({
        'string.empty': 'Steam Evap per DMT NaOH Field Required',
        'number.base': 'Steam Evap per DMT NaOH must be a number'
    }),
    pdn_steam_brine: Joi.number().required().messages({
        'string.empty': 'Steam Brine per DMT NaOH Field Required',
        'number.base': 'Steam Brine per DMT NaOH must be a number'
    }),
    mtd_salt: Joi.number().messages({
        'string.empty': 'Salt per DMT NaOH MTD Field Required',
        'number.base': 'Salt per DMT NaOH MTD must be a number'
    }),
    mtd_soda_ash: Joi.number().messages({
        'string.empty': 'Soda Ash per DMT NaOH MTD Field Required',
        'number.base': 'Soda Ash per DMT NaOH MTD must be a number'
    }),
    mtd_naoh: Joi.number().messages({
        'string.empty': 'NaOH per DMT NaOH MTD Field Required',
        'number.base': 'NaOH per DMT NaOH MTD must be a number'
    }),
    mtd_hcl: Joi.number().messages({
        'string.empty': 'HCl per DMT NaOH MTD Field Required',
        'number.base': 'HCl per DMT NaOH MTD must be a number'
    }),
    mtd_bacl2: Joi.number().messages({
        'string.empty': 'BaCl2 per DMT NaOH MTD Field Required',
        'number.base': 'BaCl2 per DMT NaOH MTD must be a number'
    }),
    mtd_flocullant: Joi.number().messages({
        'string.empty': 'Flocullant per DMT NaOH MTD Field Required',
        'number.base': 'Flocullant per DMT NaOH MTD must be a number'
    }),
    mtd_na2so3: Joi.number().messages({
        'string.empty': 'Na2SO3 per DMT NaOH MTD Field Required',
        'number.base': 'Na2SO3 per DMT NaOH MTD must be a number'
    }),
    mtd_alpha_cellulose: Joi.number().messages({
        'string.empty': 'Alpha Cellulose per DMT NaOH MTD Field Required',
        'number.base': 'Alpha Cellulose per DMT NaOH MTD must be a number'
    }),
    mtd_power: Joi.number().messages({
        'string.empty': 'Power per DMT NaOH MTD Field Required',
        'number.base': 'Power per DMT NaOH MTD must be a number'
    }),
    mtd_steam_evap: Joi.number().messages({
        'string.empty': 'Steam Evap per DMT NaOH MTD Field Required',
        'number.base': 'Steam Evap per DMT NaOH MTD must be a number'
    }),
    mtd_steam_brine: Joi.number().messages({
        'string.empty': 'Steam Brine per DMT NaOH MTD Field Required',
        'number.base': 'Steam Brine per DMT NaOH MTD must be a number'
    }),
    clt_ph: Joi.number().required().messages({
        'string.empty': 'CLT pH Field Required',
        'number.base': 'CLT pH must be a number'
    }),
    cold_well_ph: Joi.number().required().messages({
        'string.empty': 'Cold Well pH Field Required',
        'number.base': 'Cold Well pH must be a number'
    }),
    total_ph: Joi.number().required().messages({
        'string.empty': 'Total pH Field Required',
        'number.base': 'Total pH must be a number'
    }),
    after_digester_ph: Joi.number().required().messages({
        'string.empty': 'After Digester pH Field Required',
        'number.base': 'After Digester pH must be a number'
    }),
    naoh_50: Joi.number().required().messages({
        'string.empty': '50% NaOH Field Required',
        'number.base': '50% NaOH must be a number'
    }),
    naoh_32: Joi.number().required().messages({
        'string.empty': '32% NaOH Field Required',
        'number.base': '32% NaOH must be a number'
    }),
    hcl: Joi.number().required().messages({
        'string.empty': 'HCl Product Transfer Field Required',
        'number.base': 'HCl Product Transfer must be a number'
    }),
    naocl: Joi.number().required().messages({
        'string.empty': 'NaOCl Product Transfer Field Required',
        'number.base': 'NaOCl Product Transfer must be a number'
    }),
    naocl_waste: Joi.number().required().messages({
        'string.empty': 'NaOCl to waste treatment Field Required',
        'number.base': 'NaOCl to waste treatment must be a number'
    })
})


const spEvalSchema = Joi.object({
    plan_vol_att: Joi.string().trim().required().valid("YES", "NO").messages({
        'string.empty': 'Planned Volume Attained Required',
        'any.only': 'Planned Volume Attained  Value must be either YES or NO'
    }),
    prod_num_offspecs: Joi.string().trim().required().valid("YES", "NO").messages({
        'string.empty': 'Production No. Off Specs Required',
        'any.only': 'Production No. Off Specs Value must be either YES or NO'
    }),
    spec_usage: Joi.string().trim().required().valid("YES", "NO").messages({
        'string.empty': 'Production No. Off Specs Required',
        'any.only': 'Specific Usages lte standard Value must be either YES or NO'
    }),
    proc_ctrl_range: Joi.string().trim().required().valid("YES", "NO").messages({
        'string.empty': 'Process Control within ranged Required',
        'any.only': 'Process Control within ranged Value must be either YES or NO'
    }),
    manpower_no_24duty: Joi.string().trim().required().valid("YES", "NO").messages({
        'string.empty': 'Manpower no 24hrs duty Required',
        'any.only': 'Manpower no 24hrs duty Value must be either YES or NO'
    }),
    shift_report_completeness: Joi.string().trim().required().valid("YES", "NO").messages({
        'string.empty': 'Shift Report completeness Required',
        'any.only': 'Shift Report completeness Required value must be either YES or NO'
    }),
    shift_rating: Joi.string().trim().required().valid("FAILURE", "POOR", "LOW SATISFACTORY", "SATISFACTORY", "HIGH STATISFACTORY", "PERFECT").messages({
        'string.empty': 'Shift Rating Required',
        'any.only': 'Value must be either FAILURE, LOW SATISFACTORY, SATISFACTORY, HIGH STATISFACTORY, or PERFECT'
    })
})

let shiftReportSchema = Joi.object({
    date: Joi.date().required().messages({
        'date.base': 'Date must be a valid date'
    }),
    shift: Joi.number().required().valid(1,2,3).messages({
        'number.base': 'Shift must be a number/not empty',
        'any.only': 'Shift must either be 1, 2, or 3'
    }),
})

module.exports = {
    controlRoomSchema, 
    hclSchema, 
    evapSchema, 
    prBrineSchema, 
    electroSchema,
    nacloSchema,
    qcBrineschema,
    usagesSchema,
    spEvalSchema,
    shiftReportSchema
}
