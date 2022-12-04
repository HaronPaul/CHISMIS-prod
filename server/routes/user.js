const express = require('express')
const router = express.Router();
const {createUser, getUsers, editUser, deleteUser} = require('../controller/userController')
const ROLES_LIST = require('../config/roles_list')
const verifyJWT = require('../middleware/verifyJWT')
const verifyRole = require('../middleware/verifyRole')

// Route localhost:8000/api/v1/user
router.get('/', [verifyJWT, verifyRole(ROLES_LIST.Administrator)], getUsers)      // Get all the users
router.post('/', createUser)    // Create a user
router.put('/:id', editUser)
router.delete('/:id', deleteUser)

module.exports = router
