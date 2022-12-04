const router = require('express').Router()
const { validateData, createReport, getMTD, getShiftReports, getSingleReport, updateReport, updateSections, deleteReport } = require('../controller/shiftReportController')
const checkConnection = require('../middleware/connectionCheck')

const ROLES_LIST = require('../config/roles_list')
const verifyJWT = require('../middleware/verifyJWT')
const verifyRole = require('../middleware/verifyRole')


router.post('/validate', [verifyJWT, verifyRole(ROLES_LIST.Administrator, ROLES_LIST.Supervisor)], validateData)
router.post('/create', [checkConnection, verifyJWT, verifyRole(ROLES_LIST.Administrator, ROLES_LIST.Supervisor)], createReport)
router.get('/getMTD/:date/:shift', [checkConnection, verifyJWT, verifyRole(ROLES_LIST.Administrator, ROLES_LIST.Supervisor)], getMTD)

// Get the report
router.get('/get_reports/:date', checkConnection, getShiftReports)
router.get('/get_report/:id', checkConnection, getSingleReport)

// Sign the report by supervisor/manager
router.put('/update/:id', [checkConnection, verifyJWT, verifyRole(ROLES_LIST.Supervisor, ROLES_LIST.Manager)], updateReport)

// Edit Report by Admin
router.put('/edit/:id', [checkConnection, verifyJWT, verifyRole(ROLES_LIST.Administrator)], updateSections)
router.delete('/delete/:id', [checkConnection, verifyJWT, verifyRole(ROLES_LIST.Administrator)], deleteReport)


module.exports = router