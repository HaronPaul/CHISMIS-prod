const mongoose = require('mongoose')

const ShiftReportSchema = new mongoose.Schema({
    currentSupervisor: {type: String},
    incomingSupervisor: {type: String},
    manager: {type: String},
    date: {type: Date},
    shift: {type: Number, min: 0, max: 3},
    signCount: {type: Number, min: 0, max: 3},  
    isComplete: {type: Boolean},
    controlRoomSection: {type: mongoose.Schema.Types.ObjectId, ref: 'control room'},
    hclSection: {type: mongoose.Schema.Types.ObjectId, ref: 'hcl'},
    evapSection: {type: mongoose.Schema.Types.ObjectId, ref: 'evaporator'},
    prBrineSection: {type: mongoose.Schema.Types.ObjectId, ref: 'primary brine'},
    electroSection: {type: mongoose.Schema.Types.ObjectId, ref: 'electrolysis'},
    nacloSection: {type: mongoose.Schema.Types.ObjectId, ref: 'naclo'},
    qcBrineSection: {type: mongoose.Schema.Types.ObjectId, ref: 'qc brine'},
    usagesSection: {type: mongoose.Schema.Types.ObjectId, ref: 'specific usages'},
    evalSection: {type: mongoose.Schema.Types.ObjectId, ref: 'sp evaluation'},
})

module.exports = ShiftReport = mongoose.model('shift report', ShiftReportSchema)