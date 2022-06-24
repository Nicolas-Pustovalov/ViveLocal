const {Favorite} = require ( '../models/index');
const jwt = require('../services/jwt');
module.exports = {
 /* Function for find all favorite company of one user */       
    findAllOfOneUser: async (request, response) => {
        try {
            const id = parseInt(request.params.userId, 10);
            const favorite = await Favorite.findAllOfOneUser(id);
            if (!favorite)
            return response.status(404).json(`No favorite found with id ${id}`);
            response.json(favorite);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
/* Function for saving favorite company of a user */
    save: async (request, response) => {
        try {
            console.log("test save fav. controlleor", request.body);
            const instance = new Favorite(request.body);
            const favorite = await instance.save();
            if (favorite) {
            return response.status(201).json(favorite);
            }
            response.status(204).json('Enregistrement mis à jour');
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
/* Function for delete a favorite company of a user */
    delete: async (request, response) => {
        try {
            const id = parseInt(request.params.favId, 10);
            await new Favorite({ id }).delete();
            response.status(204).json('Enregistrement supprimé');
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    }

};