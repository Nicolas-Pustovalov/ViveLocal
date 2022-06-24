const cleaner = require('./cleaner');
const jwtMW = require('./jwtMW');
const roleMW = require('./roleMW');
const checkUser= require('./checkUser');
const validator = require('./validator');
const XYcompanyMW = require('./XYcompanyMW');
const XYuserMW = require('./XYuserMW');
const imageMW = require('./imageMW');
// const checkCompany = require('./checkCompany');


module.exports = {
    cleaner,
    jwtMW,
    roleMW,
    checkUser,
    validator,
    XYcompanyMW,
    XYuserMW,
    imageMW
    // checkCompany
};