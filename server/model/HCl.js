const mongoose = require('mongoose')

const HClSchema = new mongoose.Schema({
    previous_operator: { type: String },
    present_operator: { type: String },
    incoming_operator: { type: String },
    hcl_hours: {type: Number},
    lcp_hours: {type: Number},
    hcl: {type: Number},
    hcl_synth_eff: {type: Number},
    hcl_prod_temp: { type: Number },
    scrubbed_cl_temp: { type: Number },
    hcl_conc: { type: Number },
    hcl_sg: { type: Number },
    sigri_cooling_water: { type: Number },
    hcl_space: { type: Number },
    clh20_flowrate: { type: Number },
    sigri_inlet_pressure_c: { type: Number },
    sigri_inlet_pressure_h: { type: Number },
    full_n2: {type: Number},
    date: {type: Date},
    shift: {type: Number},
    remarks: {type: String}
})

module.exports = HCl = mongoose.model('hcl', HClSchema)
