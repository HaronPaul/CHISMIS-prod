const express = require('express')
const router = express.Router()
const {getCurrentInventory, updateCurrentInventory, resetInventory} = require('../controller/inventoryController')
const ROLES_LIST = require('../config/roles_list')
const verifyJWT = require('../middleware/verifyJWT')
const verifyRole = require('../middleware/verifyRole')

router.get('/getInventory', getCurrentInventory)
router.put('/updateInventory', [verifyJWT, verifyRole(ROLES_LIST.Administrator, ROLES_LIST.Supervisor)], updateCurrentInventory)
router.put('/resetInventory', [verifyJWT, verifyRole(ROLES_LIST.Administrator, ROLES_LIST.Supervisor)],resetInventory)

module.exports = router