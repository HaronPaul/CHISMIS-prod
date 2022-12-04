const mongoose = require('mongoose')

const NaClOSchema = new mongoose.Schema({
    previous_operator: {type: String, required: true},
    present_operator: {type: String, required: true},
    incoming_operator: {type: String, required: true},
    hours: {type: Number},
    naclo_ct1: {type: Number, required: true},
    naclo_ct2: {type: Number, required: true},
    naclo_ct3: {type: Number, required: true},
    naclo_ct4: {type: Number, required: true},
    fline1: {type: Number, required: true}, 
    fline2: {type: Number, required: true}, 
    fline3: {type: Number, required: true}, 
    fline4: {type: Number, required: true}, 
    naoh_ct1: {type: Number, required: true},
    naoh_ct2: {type: Number, required: true},
    naoh_ct3: {type: Number, required: true},
    naoh_ct4: {type: Number, required: true},
    storage1: {type: Number, required: true},
    storage2: {type: Number, required: true},
    storage3: {type: Number, required: true},
    storage4: {type: Number, required: true},
    space: {type: Number, required: true},
    production: {type: Number, required: true},
    date: {type: Date, required: true},
    shift: {type: Number, required: true},
    remarks: ''
})

module.exports = NaClO = mongoose.model('naclo', NaClOSchema)