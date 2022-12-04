const fs = require('fs')
const {promisify} = require('util')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

const updateInventory = async (ac, action) => {
    try {
        const file = await readFileAsync(`${__dirname}/inventory.json`)
        const inventory = JSON.parse(file)

        const {ac_salt, ac_soda_ash, ac_naoh, ac_hcl, ac_bacl2,ac_flocullant, ac_na2so3} = ac
        action === 'SUBTRACT'? inventory.ac_salt = parseFloat((inventory.ac_salt - ac_salt).toFixed(2)) : inventory.ac_salt = parseFloat((inventory.ac_salt + ac_salt).toFixed(2)) 
        action === 'SUBTRACT'? inventory.ac_soda_ash = parseFloat((inventory.ac_soda_ash - ac_soda_ash).toFixed(2)) : inventory.ac_soda_ash = parseFloat((inventory.ac_soda_ash + ac_soda_ash).toFixed(2))
        action === 'SUBTRACT'? inventory.ac_naoh = parseFloat((inventory.ac_naoh - ac_naoh).toFixed(2)) : inventory.ac_naoh = parseFloat((inventory.ac_naoh + ac_naoh).toFixed(2))
        action === 'SUBTRACT'? inventory.ac_hcl = parseFloat((inventory.ac_hcl - ac_hcl).toFixed(2)) :  inventory.ac_hcl = parseFloat((inventory.ac_hcl + ac_hcl).toFixed(2))
        action === 'SUBTRACT'? inventory.ac_bacl2 = parseFloat((inventory.ac_bacl2 - ac_bacl2).toFixed(2)) : inventory.ac_bacl2 = parseFloat((inventory.ac_bacl2 + ac_bacl2).toFixed(2))
        action === 'SUBTRACT'? inventory.ac_flocullant = parseFloat((inventory.ac_flocullant - ac_flocullant).toFixed(2)) : inventory.ac_flocullant = parseFloat((inventory.ac_flocullant + ac_flocullant).toFixed(2))
        action === 'SUBTRACT'? inventory.ac_na2so3 = parseFloat((inventory.ac_na2so3 - ac_na2so3).toFixed(2)) : inventory.ac_na2so3 = parseFloat((inventory.ac_na2so3 + ac_na2so3).toFixed(2))

        await writeFileAsync(`${__dirname}/inventory.json`, JSON.stringify(inventory))
        if(action !== 'SUBTRACT') {
            return inventory
        } else {
            return true
        } 
    } catch(err) {
        console.log(err)
        return false
    }
}

const getInventory = async () => {
    try {
        const file = await readFileAsync(`${__dirname}/inventory.json`)
        const inventory = JSON.parse(file)
        return inventory
    } catch(err) {
        console.log(err)
    }
}


module.exports = {updateInventory, getInventory}