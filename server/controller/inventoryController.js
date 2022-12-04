const {updateInventory, getInventory} = require('../utils/inventoryHelpers')

// @method:     GET
// @access:     Public
// @desc:       This will validate values from the Shift Report
// @route:      /api/v1/inventory/getInventory
const getCurrentInventory = async (req,res) => {
    const inventory = await getInventory()
    if(inventory){
        return res.status(200).json({
            success: true,
            message: 'Successfully retrieved data',
            data: {...inventory}
        })
    } else {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}

// @method:     PUT
// @access:     Private
// @route:      /api/v1/inventory/updateInventory
const updateCurrentInventory = async (req,res) => {
    const currentInventory = req.body
    if(currentInventory) {
        const updateSuccess = updateInventory(currentInventory, 'SUBTRACT')
        if(updateSuccess) {
            res.status(200).json({
                success: true,
                message: 'Successfuslly updated inventory'
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Update unsuccessful'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

// @method:     PUT
// @access:     Private
// @route:      /api/v1/inventory/resetInventory
const resetInventory = async (req,res) => {
    const newValues = req.body
    console.log(newValues)

    try {
        const updateSuccess = await updateInventory(newValues, 'RESET')
        if(updateSuccess) {
            res.status(200).json({
                success: true,
                message: 'Successfully updated inventory',
                data: updateSuccess
            })
        } else {
            res.json({
                success: false,
                message: 'Update unsuccessful'
            })
        } 
    } catch(err) {
        console.log(err)
    }
}

module.exports = {getCurrentInventory, updateCurrentInventory, resetInventory}