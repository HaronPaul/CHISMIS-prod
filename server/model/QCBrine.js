const mongoose = require('mongoose')

const QCBrineSchema = new mongoose.Schema({
    spb_camg: {type: Number, required: true},
    spb_naclo3: {type: Number, required: true},
    spb_na2so4: {type: Number, required: true},
    db_naclo3: {type: Number, required: true},
    db_nacl: {type: Number, required: true},
    db_free_cl: {type: String, required: true, enum: ['POSITIVE', 'NEGATIVE']},
    naoh_conc_50: {type: Number, required: true},
    naoh_conc_32: {type: Number, required: true},
    naohfe_conc: {type: Number, required: true},
    hcl_online: {type: Number, required: true},
    date: {type: Date, required: true},
    shift: {type: Number, required: true},
    remarks: ''
})

module.exports = QCBrine = mongoose.model('qc brine', QCBrineSchema)