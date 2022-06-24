/* Middleware for check the user role, if he's "pro" he can use the company route*/
const { User } = require('../models');
const {UnauthorizedRole} =require ('../services/errors')

const checkRole = async (request, response, next) => {
    try {
        
        const user = await User.findOne(request.params.userId);

        
        if (user.role !== "pro") {
            return response.status(403)
                .json({
                    error: new UnauthorizedRole(user.role).message
                });
        }
        next();
    } catch (error) {
        // console.log(error);
        response.status(500).json(error.message);
    }
}

module.exports = checkRole;