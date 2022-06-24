const JWT = require('jsonwebtoken');
require('dotenv').config();
module.exports = {
   
    makeToken: (userId,userMail,userRole) => {
        try {
            return JWT.sign(
                {
                    id: userId,
                    mail: userMail,
                    role: userRole
                    
                },
                process.env.JWT_SECRET,
                {
                    algorithm: 'HS256',
                    expiresIn:  '1h' //'2m'
                } 
            );
        } catch(error) {
            console.log(error);
            throw error;
        }
    },

    validateToken: token => {
        try {
            return JWT.verify(
                token,
                process.env.JWT_SECRET,
                {
                    algorithms: ['HS256']
                }
            );
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
}