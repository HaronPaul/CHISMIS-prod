const mongoose = require('mongoose')

const ControlRoomSchema = new mongoose.Schema({
    previous_operator: {type: String}, 
    present_operator: { type: String},
    incoming_operator: { type: String},
    interlock_engaged: { type: String, enum: ['YES', 'NO', 'PARTIAL'] }, 
    daq_operational: {type: String,enum: ['YES', 'NO', 'PARTIAL']},
    hours: {type: Number},
    rr_water: { type: Number},
    cells: { type: Number},
    avg_load: { type: Number},
    eos_load: {type: Number},
    rd_water: {type: Number},
    cells_voltage: {type: String},
    cells_total_voltage: {type: Number},
    xformer_oil_temp: {type: Number},
    date: {type: Date},
    shift: {type: Number},
    remarks: {type: String,},
})

module.exports = ControlRoom = mongoose.model('control room', ControlRoomSchema)
