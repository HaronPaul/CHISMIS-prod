const validate = async (data, schema) => {
    let validation

    try {
        validation = await schema.validateAsync(data, {abortEarly: false})
        return {success: true}
    } catch(error) {

        // Get the validation errors
        if(!validation) {
            const errorMessages = error.details.map((details) => {return details.message})
            return {success: false, error: errorMessages}
        }
        const err = new Error('Database Error', {cause: error})
        return {success: false, error: err}
    }
}

module.exports = validate