const mongoose = require('mongoose')

const SPEvalSchema = new mongoose.Schema({
    plan_vol_att: {type: String, required: true, enum: ['YES', 'NO']},
    prod_num_offspecs: {type: String, required: true, enum: ['YES', 'NO']},
    spec_usage: {type: String, required: true, enum: ['YES', 'NO']},
    proc_ctrl_range: {type: String, required: true, enum: ['YES', 'NO']},
    manpower_no_24duty: {type: String, required: true, enum: ['YES', 'NO']},
    shift_report_completeness: {type: String, required: true, enum: ['YES', 'NO']},
    date: {type: Date, required: true},
    shift: {type: Number, required: true},
    shift_rating: {type: String, required: true, enum: ['FAILURE', 'POOR', 'LOW SATISFACTORY', 'SATISFACTORY', 'HIGH SATISFACTORY', 'PERFECT']}
})

module.exports = SPEvaluation = mongoose.model('sp evaluation', SPEvalSchema)