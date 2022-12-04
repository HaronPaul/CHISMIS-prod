const Joi = require('joi')
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

// Validation for user data
let schema = Joi.object({
    firstName: Joi.string().required().messages({
        'string.empty': "First Name is required field"
    }),

    lastName: Joi.string().required().messages({
        'string.empty': "Last Name is required field"
    }),
    username: Joi
        .string()
        .min(7)
        .max(20)
        .required()
        .messages({
            'string.empty': "Username is required field",
            'string.min': "Username length must be at least 7 characters long"
        }),
    password: Joi
        .string()
        .alphanum()
        .pattern(new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'))
        .min(8)
        .max(20)
        .required()
        .messages(
            {'string.empty': "Password is a required field",
            'string.pattern.base': "Password must have at least one character and at least one number", 
            'string.min': "Password length must be at least 8 characters long" }),
    roleNumber: Joi.number().valid(1999,2121,2699)
        .messages({'any.only': 'Role must be either Manager, Supervisor, or Administrator'})
})


// @method:     POST
// @access:     Public
// @desc:       This will register a user to the DB
// @route:      /api/v1/user
const createUser =  async (req, res) => {
    // Destructure the contents of the body
    const {firstName, lastName, username, password, matchedPwd ,role} = req.body 
    if(password !== matchedPwd) {
        res.json({'message': 'Passwords do not match'})   
    }

    let roleNumber
    switch (role) {
        case 'ADMINISTRATOR':
            roleNumber = 1999
            break;
        case 'SUPERVISOR':
            roleNumber = 2121
            break;
        case 'MANAGER':
            roleNumber = 2699
            break;
        default:
            roleNumber = 2699
            break;
    }

    console.log(roleNumber)

    try {
        await schema.validateAsync({firstName, lastName, username, password, roleNumber})

        // Check if user already exists
        let user = await User.findOne({username})
        if(user) {
            return res.sendStatus(409); // Conflict
        }

        // Create a new user
        const newUser = new User({firstName, lastName, username, password, role: roleNumber})

        // Encrypt user's password using bcrypt
        const salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(password, salt)

        //Insert the user in the database 
        await newUser.save()

        res.status(201).json({
            success: true,
            message: "Successfully created user. Contact your admin to verify your account",
        })
    } catch(err) {
        console.log(err.details)
        if(err.details) {
            return res.json({
                message: err.details[0].message
            })
        } 

        res.status(500).json({
            'message': err.message
        })
    }
}

// @method:     GET
// @access:     Private
// @desc:       This will get all users
// @route:      /api/v1/user
const getUsers = async (req,res) => {
    try {
        const users = await User.find().select('firstName lastName username verified role')
        res.status(200).json(users)
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
}


// @method:     PUT
// @access:     Private
// @desc:       This will update a user
// @route:      /api/v1/user/:id
const editUser = async (req,res) => {
    
    try {
        const update = req.body
        const user = await User.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)}, update, {new: true})
        res.status(200).json({
            message: "Successfully updated user",
            data: user
        })
        
    } catch(error) {
        console.log(error.message)
        res.status(400).json(error.message)
    }
}

// @method:     DELETE
// @access:     Private
// @desc:       This will get all users
// @route:      /api/v1/user/:id
const deleteUser = async (req,res) => {
    const userID = req.params.id
    try {
        await User.deleteOne({_id: mongoose.Types.ObjectId(userID)})
        res.sendStatus(200)
    } catch(err) {
        res.sendStatus(500)
    }
}

module.exports = {createUser, getUsers, editUser, deleteUser} 