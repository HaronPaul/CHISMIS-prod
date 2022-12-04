const mongoose = require('mongoose')

const PrBrineSchema = new mongoose.Schema({
    previous_operator: {type: String},
    present_operator: {type: String},
    incoming_operator: {type: String},
    salt_loaded: {type: Number},
    pbrine_conc: {type: Number},
    precoat: {type: String},
    precoat_op_hours: {type: Number},
    camg_conc: {type: Number},
    xcess_naoh_conc: {type: Number},
    diff_pressure_precoat: {type: Number},
    brine_overflow: {type: String},
    xcess_na2co3_conc: {type: Number},
    precoat_flowrate: {type: Number},
    date: {type: Date},
    shift: {type: Number},
    remarks: {type: String}
})

module.exports = PrimaryBrine = mongoose.model('primary brine', PrBrineSchema)