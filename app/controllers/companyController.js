const { Company } = require ( '../models/index');

module.exports = {

    getCount: async (_, response) => {
        try {
            const count = await Company.getCount();
            response.json(count);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
/* Function for find all companies - used for leaflet map */    
    findAll: async (_, response) => {
        try {
            const companies = await Company.findAll();
            response.json(companies);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
/* Function for find one company and its products */
    findOne: async (request, response) => {
        try {
            // console.log("test findOne company");
            const id = parseInt(request.params.id, 10);
            const company = await Company.findOne(id);
            if (!company)
            return response.status(404).json(`No company found with id ${id}`);
            response.json(company);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
/* Function for find one company by user */
    findCompanyByUser: async (request, response) => {
        try {
            // console.log("test  company controller findCompanyByUser ");
            const id = parseInt(request.params.userId, 10);
            const company = await Company.findCompanyByUser(id);
            if (!company)
            return response.status(404).json(`No company found with id user ${id}`);
            response.json(company);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
/* Function for saving a company by user */    
    save: async (request, response) => {
        try {
            // console.log("test save company");
            const instance = new Company(request.body);
            const company = await instance.save();
            if (company) {
            return response.status(201).json(company);
            }
            response.status(204).json('Enregistrement mis à jour');
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        } 
    },
/* Function for delete a company */
    delete: async (request, response) => {
        try {
            const id = parseInt(request.params.userId, 10);
            await new Company ({id}).delete();
            response.status(204).json('Enregistrement supprimé');
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    }

}