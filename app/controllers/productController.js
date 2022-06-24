const {Product} = require ( '../models/index');

module.exports = {
/* Function for find all companies */   
    findAll: async (_, response) => {
        try {
            const products = await Product.findAll();
            response.json(products);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
/* Function for find one company */
    findOne: async (request, response) => {
        try {
            console.log("test find one product controller");
            const id = parseInt(request.params.id, 10);
            const product = await Product.findOne(id);
            if (!product)
            return response.status(404).json(`No product found with id ${id}`);
            response.json(product);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
/* Function for saving company by user */   
    save: async (request, response) => {
        try {
            const instance = new Product(request.body);
            const product = await instance.save();
            if (product) {
            return response.status(201).json(product);
            }
            response.status(204).json('Enregistrement mis à jour');
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
/* Function for delete company */
    delete: async (request, response) => {
        try {
            const id = parseInt(request.params.id, 10);
            await new Product({id}).delete();
            response.status(204).json('Enregistrement supprimé');
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    }

}