const jwt = require('jsonwebtoken')
const GenericResponseModel = require('../../GenericResponseModel');
module.exports = (req, res, next) => {
    const loResponseModel = GenericResponseModel;
    try {
        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, "secret");
        req.userData=decoded;
        next();
    } catch (error) {
        loResponseModel.status="Fail"
        loResponseModel.message=error.message
        loResponseModel.code=401;
        return res.status(401).json(loResponseModel); 
    }
}