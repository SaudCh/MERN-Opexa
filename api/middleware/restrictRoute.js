const HttpError = require("./httpError");

exports.restrictTo = (...roles) => {

    console.log(roles)

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            console.log(req.user.role)
            const error = new HttpError('You do not have access to this route', 401);
            return next(error)
        }

        next();
    };
};