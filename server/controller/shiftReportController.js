const {
    controlRoomSchema, 
    hclSchema, 
    evapSchema, 
    prBrineSchema, 
    electroSchema,
    nacloSchema,
    qcBrineschema,
    usagesSchema,
    spEvalSchema,
    shiftReportSchema
} = require('../utils/schema_validation')
const validate = require('../utils/validator')
const {updateInventory} = require('../utils/inventoryHelpers')

// Mongoose Imports
const ObjectId = require('mongoose').Types.ObjectId


// Import models
const ShiftReport = require('../model/ShiftReport')
const ControlRoom = require('../model/ControlRoom')
const HCl = require('../model/HCl')
const Evaporator = require('../model/Evaporator')
const PrimaryBrine = require('../model/PrimaryBrine')
const Electrolysis = require('../model/Electrolysis')
const NaClO = require('../model/NaClO')
const SpecificUsages = require('../model/SpecificUsages')
const QCBrine = require('../model/QCBrine')
const SPEvaluation = require('../model/SPEvaluation')

// @method:     POST
// @access:     Private
// @desc:       This will validate values from the Shift Report
// @route:      /api/v1/shift_report/validate
const validateData = async (req,res) => {
    const editMode = parseInt(req.query.editMode)
    let errors = {
        numErrors: 0,
        shiftReportErrors: [],
        controlRoomErrors: [],
        hclErrors: [],
        evapErrors: [],
        prBrineErrors: [],
        electroErrors: [],
        nacloErrors: [],
        qcBrineErrors: [],
        usagesErrors: [],
        evalErrors: [],
    }

    let {currentSupervisor, manager, incomingSupervisor, date, shift, signCount, isComplete} = req.body
    const shiftReportResponse = await validate({date, shift}, shiftReportSchema)
    if(!shiftReportResponse.success) errors.shiftReportErrors.push(...shiftReportResponse.error); errors.numErrors += errors.shiftReportErrors.length

    if(date) {
        var dateSplit = date.split('-')
        var month = parseInt(dateSplit[0])
        var day = parseInt(dateSplit[1])
        var year = parseInt(dateSplit[2])
        console.log(new Date(year, month-1, day+1))
    
        if(editMode !== 1) {
            const reportExist = await ShiftReport.findOne({date: new Date(year, month-1, day+1), shift: shift}, {_id: 1})
            if(reportExist) {
                console.log('Report already exists')
                errors.shiftReportErrors.push('Shift Report for this day and shift already exists')
                errors.numErrors += errors.shiftReportErrors.length
            }
        } 
    }

    const controlRoomResponse = await validate(req.body.controlRoomSection, controlRoomSchema)
    if(!controlRoomResponse.success) errors.controlRoomErrors.push(...controlRoomResponse.error); errors.numErrors += errors.controlRoomErrors.length

    const hclResponse = await validate(req.body.hclSection, hclSchema)
    if(!hclResponse.success) errors.hclErrors.push(...hclResponse.error); errors.numErrors += errors.hclErrors.length 

    const evapResponse = await validate(req.body.evapSection, evapSchema)
    if(!evapResponse.success) errors.evapErrors.push(...evapResponse.error); errors.numErrors += errors.evapErrors.length

    const prBrineResponse = await validate(req.body.prBrineSection, prBrineSchema)
    if(!prBrineResponse.success) errors.prBrineErrors.push(...prBrineResponse.error); errors.numErrors += errors.prBrineErrors.length

    const electrolysisResponse = await validate(req.body.electroSection, electroSchema)
    if(!electrolysisResponse.success) errors.electroErrors.push(...electrolysisResponse.error); errors.numErrors += errors.electroErrors.length

    const naClOResponse = await validate(req.body.nacloSection, nacloSchema)
    if(!naClOResponse.success) errors.nacloErrors.push(...naClOResponse.error); errors.numErrors += errors.nacloErrors.length
    
    if(shift == 2) {
        const qcBrineResponse = await validate(req.body.qcBrineSection, qcBrineschema)
        if(!qcBrineResponse.success) errors.qcBrineErrors.push(...qcBrineResponse.error); errors.numErrors += errors.qcBrineErrors.length
    }

    const specificUsagesResponse = await validate(req.body.usagesSection, usagesSchema)
    if(!specificUsagesResponse.success) errors.usagesErrors.push(...specificUsagesResponse.error); errors.numErrors += errors.usagesErrors.length

    // const spEvalResponse = await validate(req.body.evalSection, spEvalSchema)
    // if(!spEvalResponse.success) errors.evalErrors.push(...spEvalResponse.error)
    let response = {
        success: errors.numErrors == 0? true:false,
        numErrors: errors.length,
        errors
    }

    if(response.success) {
        return res.status(200).json(response)
    } else {
        return res.json(response)
    }
}

// @method:     POST
// @access:     Private
// @desc:       This will validate values from the Shift Report
// @route:      /api/v1/shift_report/create
const createReport = async (req, res) => {
    // Get all the sections
    let {
        currentSupervisor, 
        manager, 
        incomingSupervisor, 
        date, 
        shift, 
        signCount, 
        isComplete,
        controlRoomSection, 
        hclSection, 
        evapSection, 
        prBrineSection, 
        electroSection, 
        nacloSection, 
        qcBrineSection, 
        usagesSection,
        evalSection 
    } = req.body

    var dateSplit = date.split('-')
    var month = parseInt(dateSplit[0])
    var day = parseInt(dateSplit[1])
    var year = parseInt(dateSplit[2])

    const jsDate = new Date(year, month-1, day+1)

    try {
        var ctrlRoom = new ControlRoom({...controlRoomSection, date: jsDate, shift}); 
        if(ctrlRoom) await ctrlRoom.save()
        var hcl = new HCl({...hclSection, date: jsDate, shift});
        if(hcl) await hcl.save()
        var evap = new Evaporator({...evapSection, date: jsDate, shift});
        if(evap) await evap.save()
        var prBrine = new PrimaryBrine({...prBrineSection, date: jsDate, shift}); 
        if(prBrine) await prBrine.save()
        var electro = new Electrolysis({...electroSection, date: jsDate, shift}); 
        if(electro) electro.save()
        var naclo = new NaClO({...nacloSection, date: jsDate, shift})
        if(naclo) naclo.save()
        var usages = new SpecificUsages({...usagesSection, date: jsDate, shift})
        if(usages) usages.save()
        var speval = new SPEvaluation({...evalSection, date: jsDate, shift})
        if(speval) speval.save()

        if(shift == 2) {
            var qcbrine = new QCBrine({...qcBrineSection, date: jsDate, shift})
            await qcbrine.save()
        }

        signCount += 1 // Increment the signCount
        isComplete = signCount === 3? true: false

        // Update the inventory
        var newShiftReport = new ShiftReport({
            currentSupervisor, 
            manager, 
            incomingSupervisor, 
            date: jsDate, 
            shift, 
            signCount, 
            isComplete,
            controlRoomSection: ctrlRoom.id,
            hclSection: hcl.id,
            evapSection: evap.id,
            prBrineSection: prBrine.id,
            electroSection: electro.id, 
            nacloSection: naclo.id,
            qcBrineSection: shift == 2? qcbrine.id:null,
            usagesSection: usages.id,
            evalSection: speval.id,
        })
        await newShiftReport.save()
        updateInventory(usages, 'SUBTRACT')
        res.json({
            success: true,
            message: 'Successfully added report'
        })
    } catch(err) {
        console.error(err)
        res.json({
            success: false,
            message: 'An error occured in storing the report'
        })
    }
}


const getMTD = async (req,res) => {
    const selectedDate = req.params.date
    const selectedShift = parseInt(req.params.shift)
    const dateSplit = selectedDate.split('-')
    var year = parseInt(dateSplit[2])
    var month = parseInt(dateSplit[0])
    var day = parseInt(dateSplit[1])

    var startDate = new Date(year, month-1, 2)
    var jsDate = new Date(year, month-1, day+1)

    console.log(`Start date is: ${startDate}`)
    console.log(`Start date is: ${jsDate}`)

    // const usages = await SpecificUsages.find({$or: [{date: {$lt: jsDate}}, {date: jsDate, shift: {$lt: selectedShift}}]}).select('ac_salt ac_soda_ash ac_naoh ac_hcl ac_bacl2 ac_flocullant ac_na2so3 ac_alpha_cellulose ac_power ac_steam_evap ac_steam_brine')
    try {
        // Get the Month to Date of each usage
        const acSum = await SpecificUsages.aggregate([
            {$match: {$or: [ {date: {$gte: startDate, $lt: jsDate}}, {$and: [{date: jsDate}, {shift: {$lt: selectedShift}}]} ]}},
            // {$match: {$or: [ {date: {$lt: jsDate}}, {$and: [{date: jsDate}, {shift: {$lt: selectedShift}}]} ]}},
            {$group: {
                _id: null, 
                ac_salt: {$sum: '$ac_salt'},
                ac_soda_ash: {$sum: '$ac_soda_ash'},
                ac_naoh: {$sum: '$ac_naoh'},
                ac_hcl: {$sum: '$ac_hcl'},
                ac_bacl2: {$sum: '$ac_bacl2'},
                ac_flocullant: {$sum: '$ac_flocullant'},
                ac_na2so3: {$sum: '$ac_na2so3'},
                ac_alpha_cellulose: {$sum: '$ac_alpha_cellulose'},
                ac_power: {$sum: '$ac_power'},
                ac_steam_evap: {$sum: '$ac_steam_evap'},
                ac_steam_brine: {$sum: '$ac_steam_brine'},
            }}])

        const cellLiquorSum = await Electrolysis.aggregate([
            {$match: {$or: [ {date: {$gte: startDate, $lt: jsDate}}, {$and: [{date: jsDate}, {shift: {$lt: selectedShift}}]} ]}},
            {$group: {
                _id: null,
                cell_liq_prod: {$sum: '$cell_liq_prod'}
                }
            }
        ])

        let mtdAcSum = {}
        let mtdCellLiquorSum
        if(acSum.length === 0) {
            mtdAcSum =  {
                    ac_salt: 0,
                    ac_soda_ash: 0,
                    ac_naoh: 0,
                    ac_hcl: 0,
                    ac_bacl2: 0,
                    ac_flocullant: 0,
                    ac_na2so3: 0,
                    ac_alpha_cellulose: 0,
                    ac_power: 0,
                    ac_steam_evap: 0,
                    ac_steam_brine: 0
            }
        } else {
            mtdAcSum = {...(acSum[0])}
        }

        cellLiquorSum.length === 0? mtdCellLiquorSum = 0:mtdCellLiquorSum = cellLiquorSum[0].cell_liq_prod
        res.json({
            success: true,
            mtdAcSum,
            mtdCellLiquorSum
        })
    } catch(err) {
        res.json({
            success: false,
            err: err
        })
    }
}   

// @method:     GET
// @access:     PUBLIC
// @desc:       This will get the shift reports with the specified date
// @route:      /api/v1/shift_report/get/:date
const getShiftReports = async (req,res) => {
    
    // Query Parameters
    filters = req.query

    const selectedDate = req.params.date
    const dateSplit = selectedDate.split('-')
    var year = parseInt(dateSplit[2])
    var month = parseInt(dateSplit[0])
    var day = parseInt(dateSplit[1])
    const jsDate = new Date(year, month-1, day+1)
    
    try {
        const shiftReports = await ShiftReport.find({date: jsDate, ...filters}, {_id: 1, shift: 1, currentSupervisor: 1, date: 1})
        res.status(200).json({
            success: true,
            shiftReports
        })
    }catch(err) {
        res.status(400).json({
            success: false,
            err
        })
    }
}

// @method:     GET
// @access:     PUBLIC
// @desc:       This will get the shift reports with the specified date
// @route:      /api/v1/shift_report/get/:id
const getSingleReport = async (req,res) => {
    const reportID = req.params.id
    console.log(reportID)   
    
    try { 
        const shiftReport = await ShiftReport
            .findOne({_id: ObjectId(reportID) })
            .populate('controlRoomSection', '-_id -__v -shift -date')
            .populate('hclSection', '-_id -__v -shift -date')
            .populate('evapSection', '-_id -__v -shift -date')
            .populate('prBrineSection', '-_id -__v -shift -date')
            .populate('electroSection', '-_id -__v -shift -date')
            .populate('nacloSection', '-_id -__v -shift -date')
            .populate('qcBrineSection', '-_id -__v -shift -date')
            .populate('usagesSection', '-_id -__v -shift -date')
            .populate('evalSection', '-_id -__v -shift -date')
        res.status(200).json({
            success: true,
            shiftReport
        })
    } catch(err) {
        console.log(err)
        res.status(400).json({
            success: false,
            err
        })
    }
}

// @method:     PUT
// @access:     PRIVATE
// @desc:       This will update the incoming supervisor/manager in the shift report document
// @route:      /api/v1/shift_report/update/:id
const updateReport = async (req,res) => {

    console.log(`ID passed is ${req.params.id}`)
    update = req.body
    try {
        await ShiftReport.findOneAndUpdate({_id: ObjectId(req.params.id)}, update, {new: true})
        res.sendStatus(200)
    } catch(err) {
        console.log(err)
        res.sendStatus(400)
    }
}

// @method:     PUT
// @access:     PRIVATE
// @desc:       This will update the values of the sections in the shift report
// @route:      /api/v1/shift_report/update/:id
const updateSections = async (req,res) => {
    console.log(req.params.id)
    update = req.body
    console.log(update.controlRoomSection)

    try {
        // Get the ID of each section from the current shift report
        const {controlRoomSection, hclSection, evapSection, prBrineSection, electroSection, nacloSection, qcBrineSection, usagesSection, evalSection} = await ShiftReport.findById(req.params.id)

        // Update each section
        await ControlRoom.findByIdAndUpdate(controlRoomSection, update.controlRoomSection)
        await HCl.findByIdAndUpdate(hclSection, update.hclSection)
        await Evaporator.findByIdAndUpdate(evapSection, update.evapSection)
        await PrimaryBrine.findByIdAndUpdate(prBrineSection, update.prBrineSection)
        await Electrolysis.findByIdAndUpdate(electroSection, update.electroSection)
        await NaClO.findByIdAndUpdate(nacloSection, update.nacloSection)
        await QCBrine.findByIdAndUpdate(qcBrineSection, update.qcBrineSection)
        await SpecificUsages.findByIdAndUpdate(usagesSection, update.usagesSection)
        await SPEvaluation.findByIdAndUpdate(evalSection, update.evalSection)

        res.status(200).json({
            success: true,
            message: 'Sucessfully edited report'
        })
    } catch(err) {
        res.sendStatus(500)
    }
}

// @method:     DELETE
// @access:     PRIVATE
// @desc:       This delete a report
// @route:      /api/v1/shift_report/update/:id
const deleteReport = async (req,res) => {
    const reportID = req.params.id
    try {
        const {controlRoomSection, hclSection, evapSection, prBrineSection, electroSection, nacloSection, qcBrineSection, usagesSection, evalSection} =  await ShiftReport.findById(ObjectId(reportID))

        // Delete each data from each section 
        await ControlRoom.findByIdAndDelete(controlRoomSection)
        await HCl.findByIdAndDelete(hclSection)
        await Evaporator.findByIdAndDelete(evapSection)
        await PrimaryBrine.findByIdAndDelete(prBrineSection)
        await Electrolysis.findByIdAndDelete(electroSection)
        await NaClO.findByIdAndDelete(nacloSection)
        if(qcBrineSection) await QCBrine.findByIdAndDelete(qcBrineSection)
        await SpecificUsages.findByIdAndDelete(usagesSection)
        await SPEvaluation.findByIdAndDelete(evalSection)
        await ShiftReport.findByIdAndDelete(reportID)

        res.sendStatus(200)
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = {validateData, createReport, getMTD, getShiftReports, getSingleReport, updateReport, updateSections, deleteReport}