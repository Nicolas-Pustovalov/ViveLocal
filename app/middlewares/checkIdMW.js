    const { Company } = require('../models');
    console.log(request.body);

module.exports = async (request, response, next) => {
    try {if (req.method === "POST"){
        const company = await Company.findCompanyByUser(request.params.userId);
        if (company.user_id !== request.params.userId) {
            return response.status(403)
                .json({
                    error: new UnauthorizedRole(user.role).message
                });
        }
           
            next();
        }
    }
    
    catch (err) {
        response.status(500).json(error.message);
    } 
}