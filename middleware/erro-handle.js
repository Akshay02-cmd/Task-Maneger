const {CustomAPIError} = require("../errors/custome-errors")

const erroHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof CustomAPIError){
        res.status(err.statuscode).json(err.message)
    }
    res.status(500).json({ error: err.message });
};
module.exports = erroHandlerMiddleware;
