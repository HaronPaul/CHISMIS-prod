const mongoose = require('mongoose')

const EvapSchema = new mongoose.Schema({
    previous_operator: {type: String},
    present_operator: {type: String},
    incoming_operator: {type: String},
    hours: {type: Number},
    evap_eff: {type: Number},
    naoh_prod: {type: Number},
    naoh_total_volume: {type: Number},
    evap_feed_flowrate: {type: Number},
    naoh_conc: {type: Number},
    naoh_sg: {type: Number},
    t8_level: {type: Number},
    t9_level: {type: Number},
    vacuum_pressure: {type: Number},
    theoretical: {type: Number},
    date: {type: Date},
    shift: {type: Number},
    remarks: ''
})

module.exports = Evaporator = mongoose.model('evaporator', EvapSchema)