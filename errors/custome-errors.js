class CustomAPIError extends Error{
    constructor(message, statuscode){
        super(message)
        this.statuscode = statuscode;
    }
}

const createCustomeError = (message, statuscode)=>{
    return new CustomAPIError(message, statuscode);
}

module.exports = {createCustomeError, CustomAPIError}