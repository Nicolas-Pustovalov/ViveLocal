/*Middleware for include the secure url send by coudinary in database */
module.exports = async (request, response, next) => {
    const { Company, Product } = require('../models');
    console.log('test imageMW');
    console.log(request.body);


    
    try {
        const id = parseInt(request.body.company_id, 10);
        if (!request.body.product_id) {
            console.log(id);
            const company = await Company.findOne(id);
        const image = request.body.secure_url;
        console.log('Image URL ', image);
            const instance = new Company(
                {   "id": company.id,
                    "name": company.name,
                    "siret": company.siret,
                    "address": company.address,
                    "city": company.city,
                    "zip": company.zip,
                    "phone": company.phone,
                    "mail": company.mail,
                    "x": company.x,
                    "y": company.y,
                    "image": image,
                    "detail": company.detail,
                    "communication": company.communication,
                    "user_id": company.user_id
                }
            );
            await instance.save();

        }
        
        else {
            // const image = result.secure_url;
            // console.log('Image URL ', image);
            const image = request.body.secure_url;
            const id = parseInt(request.body.product_id, 10);
            const product = await Product.findOne(id);
            const instance = new Product(
                {   "id": product.id,
                    "type": product.type,
                    "name": product.name,
                    "detail": product.detail,
                    "price_kg": product.price_kg,
                    "price": product.price,
                    "image": image,
                    "company_id": product.company_id,
                    "communication": product.communication,
                    "user_id": product.user_id
                }
            );
            await instance.save();

        }
 
        next();
    }
    
    catch (err) {
        console.error(err.message);
    } 
}
