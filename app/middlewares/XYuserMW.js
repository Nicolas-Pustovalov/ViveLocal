/* middleware for calling the external API and retrieving geographical coordinates for the user*/
/*https://adresse.data.gouv.fr/api-doc/adresse*/
module.exports = (request, response, next) => {
    const axios = require('axios')
    const User = require('../models/User')
    const {flush } = require('../services/cache');
    
    const dataCoordinates = async (server) => {
        /* coordinates request */
        try {
            console.log('server : ', server);
            const res = await axios.get(server);
            
            const x = res.data.features[0].geometry.coordinates[0];
            const y = res.data.features[0].geometry.coordinates[1];

            const instance = new User(
                {
                    "last_name": request.body.last_name,
                    "first_name": request.body.first_name,
                    "pseudo": request.body.pseudo,
                    "address": request.body.address,
                    "zip": request.body.zip,
                    "city": city,
                    "x": x,
                    "y": y,
                    "mail": request.body.mail,
                    "phone":request.body.phone,
                    "password":request.body.password,
                    "role":request.body.role
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