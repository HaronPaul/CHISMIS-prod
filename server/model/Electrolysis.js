const mongoose = require('mongoose')

const ElectroSchema = new mongoose.Schema({
    previous_operator: {type: String},
    present_operator: {type: String},
    incoming_operator: {type: String},
    electro_eff: {type: Number},
    cell_liq_prod: {type: Number},
    spb_inlet_temp: {type: Number},
    naoh_inlet_temp: {type: Number},
    chelate_op_hours_ta: {type: Number},
    chelate_op_hours_tb: {type: Number},
    naoh_conc: {type: Number},
    naoh_sg: {type: Number},
    naoh_flowrate: {type: Number},
    db_free_cl_qual: {type: String},
    decomposer_op_temp: {type: Number},
    db_conc: {type: Number},
    spb_conc: {type: Number},
    full_n2: {type: Number},
    date: {type: Date},
    shift: {type: Number},
    remarks: ''
})

module.exports = Electrolysis = mongoose.model('electrolysis', ElectroSchema)