/*All the JOI schemas */
const Joi = require('joi');

const registrationJoi = Joi.object({

    last_name: Joi.string().required(),
    first_name: Joi.string().required(),
    pseudo: Joi.string().required(), 
    address: Joi.string().required(), 
    zip: Joi.string().min(5).max(5).required(),
    city: Joi.string().required(),
    x: Joi.number(),
    y: Joi.number(),
    mail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','fr','io','org'] } }),
    phone: Joi.string().required().regex(/^(?:(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/),
    
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
    // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
    role: Joi.string(),
    
});

const updateJoi = Joi.object({

    last_name: Joi.string().required(),
    first_name: Joi.string().required(),
    pseudo: Joi.string().required(), 
    address: Joi.string().required(), 
    zip: Joi.string().min(5).max(5).required(),
    city: Joi.string().required(),
    x: Joi.number(),
    y: Joi.number(),
    mail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','fr','io','org'] } }),
    phone: Joi.string().required().regex(/^(?:(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
    // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
    role: Joi.string(),
    id: Joi.number(),
    

});

const loginJoi = Joi.object({
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    mail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','fr','io','org'] } }).required(),
});

const companysJoi = Joi.object({
    name: Joi.string().required(),
    siret: Joi.string().required().alphanum().min(9).max(9),
    address: Joi.string().required(),
    city: Joi.string().required(),
    zip: Joi.string().min(5).max(5).required(),
    phone: Joi.string().required().regex(/^(?:(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/),
    mail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','fr','io','org'] } }).required(),
    x: Joi.number(),
    y: Joi.number(),
    image: Joi.string(),
    detail:Joi.string().allow('').optional(),
    communication: Joi.string().allow('').optional(),
    user_id: Joi.number(),
    id: Joi.number(),
});

const itemsJoi = Joi.object({
    type: Joi.string().required(),
    name: Joi.string().required(),
    detail: Joi.string(),
    price_kg: Joi.boolean(),
    price: Joi.string().required().pattern(new RegExp(/^\d+([.,]\d{1,2})?$/)),
    image: Joi.string(),
    company_id:Joi.number(),
    user_id: Joi.number(),
    id: Joi.number(),
});

const favoriteJoi = Joi.object({
    company_id:Joi.number(),
    user_id: Joi.number(),
    
});

module.exports = {
    registrationJoi,
    loginJoi,
    companysJoi,
    itemsJoi,
    favoriteJoi,
    updateJoi
};