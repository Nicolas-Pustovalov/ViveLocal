/* Middleware for using JWT */
const jwt = require('../services/jwt');

module.exports = (request, response, next) => {
    try {
        let token = request.headers['authorization']; // 'authorization' or 'Authorization'
        console.log(token);
        if (!token) {
            return response.status(401).json('Invalid token');
        }
        const payload = jwt.validateToken(token);
        
        console.log(payload);
        if (!payload.id) {
            return response.status(401).json('Invalid token');
        }
        request.userId = payload.id;
        if (request.body.userId && request.body.userId !== request.userId) {
            return response.status(401).json('Invalid token');
          }
        next();
    } catch(error) {
        console.log(error);
        response.status(401).json(error.message);
    }
}


