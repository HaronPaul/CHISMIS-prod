const mongoose = require('mongoose')

const OperatorSchema = new mongoose.Schema(
    {
    name: {type: String},
    section: {type: String},
    },
    {
        collection: 'operator'
    })

module.exports = Operators = mongoose.model('operator', OperatorSchema)