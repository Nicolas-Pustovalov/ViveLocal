/* Middleware for check the user id in the crypted token, if it's different, the user can't use the page*/
const jwt = require('../services/jwt');
require('dotenv').config();
const { User } = require('../models');
const {UnauthorizedAccess} =require ('../services/errors')

const checkUser = async (request, response, next) => {
    try {
        let token = request.headers['authorization']; // 'authorization' or 'Authorization'
        if (!token) {
            return response.status(401).json('Missing token');
        }
        const payload = jwt.validateToken(token);
        
        const user = await User.findOne(request.params.userId);
        // console.log(payload);
        // console.log(user.id);
        if (!payload.id) {
            return response.status(401).json('Invalid token');
        }
        if (user.id && user.id !== payload.id) {
            return response.status(403)
                .json({
                error: new UnauthorizedAccess(request.params.userId).message
            });
        }
        next();
    } catch (error) {
        console.log(error);
        response.status(500).json(error.message);
    }
}



module.exports = checkUser;