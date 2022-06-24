const {Router} = require('express');
const { userController, favoriteController, productController,companyController } = require('./controllers');
const {validateBody} = require('./middlewares/validator');
const { registrationJoi, loginJoi, companysJoi, itemsJoi, favoriteJoi, updateJoi } = require('./schemas/postSchema');
const { jwtMW, roleMW, checkUser, XYcompanyMW, XYuserMW } = require('./middlewares');
const { cache, flush } = require('./services/cache');

const router = Router();

//with JWT
router.get('/test', userController.test);

/**
 * POST /home/registration
 * @summary Add a new user in database
 * @tags Posts
 * @route POST /home/registration
 * @param {object} request.body.required user infos to add in database
 * @returns {Post} 201 - The newly created post
 * @returns {string} 500 - An error message
*/
router.post('/home/registration',  validateBody (registrationJoi), XYuserMW, flush,  userController.save);
/**
 * POST /home/login
 * @summary login user
 * @tags Posts
 * @route POST /home/login
 * @param {object} request.body.required Post infos to add in database
 * @returns {Post} 201 - The newly created post
 * @returns {string} 500 - An error message
*/
router.post('/home/login',validateBody (loginJoi),flush, userController.login);
/**
 * PATCH /home/writeUserProfile/{userID}
 * @summary Update a user in database
 * @tags Patch
 * @route PATCH /home/writeUserProfile/{userID}
 * @param {object} request.params.required Post infos to add in database
 * @param {number} userId.path.required The id of the post to fetch
 * @returns {Post} 201 - The newly created post
 * @returns {string} 500 - An error message
*/
router.patch('/home/writeUserProfile/:userId(\\d+)', checkUser, validateBody (updateJoi), XYuserMW, flush, userController.writeProfile);

//  TODO: //hide for deployment
// /**
//  * GET /home/users
//  * @summary Responds with all users in database
//  * @route GET /home/users
//  * @tags users findAll
//  * @returns {array<users>} 200 - An array of users
//  */
// router.get('/home/users',jwtMW,cache,  userController.findAll);


/**
 * GET /home/users/{userID}
 * @summary Responds with only one user by id in database
 * @route GET /home/users/{userID}
 * @tags user findOne id
 * @param {number} userId.path.required The id of the post to fetch
 * @returns {Post} 200 - A single post identified by its id
 * @returns {string} 404 - An error message
*/
router.get('/home/users/:userId(\\d+)', checkUser, cache, userController.findOne);
/**
 * DELETE /home/users/{userID}
 * @summary delete a user in database
 * @tags DELETE
 * @route DELETE /home/users/{userID}
 * @param {object} request.body.required Post infos to add in database
 * @param {number} iserId.path.required The id of the post to fetch
 * @returns {string} 200 - delete user
 * @returns {string} 500 - An error message
*/
router.delete('/home/users/:userId(\\d+)', checkUser, flush, userController.delete);

/**
 * GET /company/count
 * @summary Count the number of company in database
 * @route GET /company/count
 * @tags count companies
 * @returns {Post} 200 - A single post identified by its id
 * @returns {string} 404 - An error message
*/
router.get('/company/count', cache, companyController.getCount);
/**
 * POST /companies/{userId}
 * @summary Add a new company in database
 * @tags Posts
 * @route POST /companies/{userId}
 * @param {object} request.body.required Post infos to add in database
 * @param {number} userId.path.required The id of the post to fetch
 * @returns {Post} 201 - The newly created post
 * @returns {string} 500 - An error message
*/
router.post('/companies/:userId(\\d+)', checkUser, validateBody (companysJoi), XYcompanyMW,flush, companyController.save);
/**
 * GET /companybyuser/{userId}
 * @summary Responds with all companys by user id in database
 * @route GET /companybyuser/{userId}
 * @tags company findCompanyByUserId
 * @param {number} userId.path.required The id of the post to fetch
 * @returns {Post} 200 - A single post identified by its id
 * @returns {string} 404 - An error message
*/
router.get('/companybyuser/:userId(\\d+)', jwtMW, companyController.findCompanyByUser);
/**
 * GET /companies/{id}
 * @summary Responds with only one company by id in database
 * @route GET /companies/{id}
 * @tags company findOne id
 * @param {number} id.path.required The id of the post to fetch
 * @returns {Post} 200 - A single post identified by its id
 * @returns {string} 404 - An error message
*/
router.get('/companies/:id(\\d+)',jwtMW, companyController.findOne); // joint all products
/**
 * GET /companies
 * @summary Responds with all companys in database
 * @route GET /companies
 * @tags companys findAll
 * @returns {array<Company>} 200 - An array of companys
*/
router.get('/companies',jwtMW,cache, companyController.findAll); 
/**
 * DELETE /companies/{userId}
 * @summary delete a company in database
 * @tags DELETE
 * @route  DELETE /companies/{userId}
 * @param {object} request.body.required Post infos to add in database
 * @param {number} UserId.path.required The id of the post to fetch 
 * @returns {string} 200 - delete company
 * @returns {string} 500 - An error message
*/
router.delete('/companies/:userId(\\d+)', checkUser,roleMW, flush, companyController.delete);
/**
 * POST /items/{userId}
 * @summary Add a new item in database
 * @tags Post
 * @route  POST /items/{userId}
 * @param {object} request.body.required Post infos to add in database
 * @param {number} userId.path.required The id of the post to fetch
 * @returns {Post} 201 - The newly created post
 * @returns {string} 500 - An error message
*/
router.post('/items/:userId(\\d+)', checkUser,roleMW, validateBody (itemsJoi), flush, productController.save);
/**
 * GET /items/{id}
 * @summary Responds with only one item by id in database
 * @route GET /items/{id}
 * @tags items findOne id
 * @param {number} id.path.required The id of the post to fetch
 * @returns {Post} 200 - A single post identified by its id
 * @returns {string} 404 - An error message
*/
router.get('/items/:id(\\d+)',jwtMW,cache, productController.findOne);
/**
 * DELETE /items/{id}/{userId}
 * @summary delete a items in database
 * @tags DELETE
 * @route DELETE /items/{id}/{userId}
 * @param {object} request.body.required Post infos to add in database
 * @param {number} id.path.required The id of the post to fetch
 * @param {number} userId.path.required The userId of the post to fetch
 * @returns {string} 200 - delete   items
 * @returns {string} 500 - An error message
*/
router.delete('/items/:id(\\d+)/:userId(\\d+)', checkUser,roleMW, flush, productController.delete);

/**
 * GET /research/companies
 * @summary Find all companies for leaflet map
 * @route GET /research/companies
 * @tags Find all companies for leaflet map
 * @returns {Post} 200 - A single post identified by its id
 * @returns {string} 404 - An error message
*/
router.get('/research/companies',jwtMW,cache, companyController.findAll); 

/**
 * POST /user/favorites/{userId}
 * @summary Add a new favorite company of a user in database
 * @tags Posts
 * @route POST /user/favorites/{userId}
 * @param {object} request.body.required Post infos to add in database
 * @param {number} userId.path.required The id of the post to fetch
 * @returns {Post} 201 - The newly created post
 * @returns {string} 500 - An error message
*/
router.post('/user/favorites/:userId(\\d+)',checkUser, validateBody (favoriteJoi),flush, favoriteController.save);
/**
 * GET /favorites/{userId}
 * @summary Responds with all favoroites by user id in database
 * @route GET /favorites/{userId}
 * @tags favorites findOne by user id
 * @param {number} userId.path.required The id of the post to fetch
 * @returns {post} 200 - A single post identified by its id
 * @returns {string} 404 - An error message
*/
router.get('/user/favorites/:userId(\\d+)',checkUser,cache, favoriteController.findAllOfOneUser);
/**
 * DELETE /user/favorites/{id}/{userId}
 * @summary delete a favorite company of a user by id in database
 * @tags DELETE
 * @route DELETE /user/favorites/{id}/{userId}
 * @param {object} request.body.required Post infos to add in database
 * @param {number} id.path.required The id of the post to fetch
 * @param {number} UserId.path.required The id of the post to fetch
 * @returns {string} 200 - delete favory
 * @returns {string} 500 - An error message
*/
router.delete('/user/favorites/:favId(\\d+)/:userId(\\d+)', checkUser, flush, favoriteController.delete);

module.exports = router;