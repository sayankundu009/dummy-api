exports.responsehelpers = function (req, res, next){
    function sendResponse(data, message, status = 200) {
        res.status(status).json({
            data,
            message,
            status,
        });
    }

    res.success = (data, message, status) => sendResponse(data, message, status);
    res.error = (data, message, status = 500) => sendResponse(data, message, status);

    next(); 
}