/*middleware for calling the external API and retrieving geographical coordinates for the user*/
/*https://adresse.data.gouv.fr/api-doc/adresse*/
module.exports = (request, response, next) => {
    const axios = require('axios')
    const Company = require('../models/Company')
    const {flush } = require('../services/cache');
    
    const dataCoordinates = async (server) => {
        /* coordinates request */
        try {
            
            console.log('server : ', server);
            const res = await axios.get(server);
            
            const x = res.data.features[0].geometry.coordinates[0];
            const y = res.data.features[0].geometry.coordinates[1];

            const instance = new Company(
                {
                    "name": request.body.name,
                    "siret": request.body.siret,
                    "address":address,
                    "city": city,
                    "zip": zip,
                    "phone":request.body.phone,
                    "mail":request.body.mail,
                    "x": x,
                    "y": y,
                    "image": request.body.image,
                    "detail": request.body.detail,
                    "communication": request.body.communication,
                    "user_id":request.body.user_id
                }
            );
             await instance.saveXY();
             
            //  console.log(`In MW city x= ${x} y= ${y}`)
            
        }
        catch (err) {
            console.error(err.message);
        }
    };
    const city = (request.body.city)
    const address = (request.body.address)
    const zip = (request.body.zip)
    dataCoordinates(`https://api-adresse.data.gouv.fr/search/?q=${address} ${zip} ${city}&limit=1`);
    
    next();
} 

