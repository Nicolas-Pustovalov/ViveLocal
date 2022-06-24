const jwt = require('../services/jwt');
const { User } = require('../models/index');

module.exports = {
    test: (request, response) => {
        response.json('It\'s alive !!!');
    },
/* Function for saving user */
    save: async (request, response) => {
        try {
            const user = await new User(request.body).save();
            const token = jwt.makeToken(user.id);
            response.setHeader('Authorization', token);
            response.setHeader('Access-Control-Expose-Headers', 'Authorization');
            response.status(201).json(user);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
/* Function used during the login */
    login: async (request, response) => {
        const test = await request;
        console.log("test request",test.headers);
        try {
            const user = await new User(request.body).doLogin();
            const token = jwt.makeToken(user.id, user.mail, user.role);
            response.setHeader('Authorization', token);
            response.setHeader('Access-Control-Expose-Headers', 'Authorization');
            response.status(200).json(user);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
/* Function for update user */    
    writeProfile: async (request, response) => {
        try {
        const id = parseInt(request.params.userId, 10);
        const user = await new User(request.body).writeProfile(id);
        response.status(201).json(user);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
/* Function for find all users */
    findAll: async (_, response) => {
        try {
            const users = await User.findAll();
            response.json(users);
       } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
/* Function for find one user */        
    findOne: async (request, response) => {
        try {
            const id = parseInt(request.params.userId, 10);
            const user = await User.findOne(id);
            if (!user)
            return response.status(404).json(`No user found with id ${id}`);
            response.json(user);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
 /* Function for delete user acount */   
    delete: async (request, response) => {
        try {
            const id = parseInt(request.params.userId, 10);
            await new User({id}).delete();
            response.status(204).json('Enregistrement supprimé');
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    }

}