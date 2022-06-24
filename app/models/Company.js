const CoreModel = require('./CoreModel');
//----------
/**
 * An entity representing a company Maraicher
 * @typedef {Object} Company
 * @property {number} id
 * @property {string} name
 * @property {string} siret
 * @property {string} address
 * @property {string} city
 * @property {string} zip
 * @property {string} phone
 * @property {string} mail
 * @property {number} x
 * @property {number} y
 * @property {string} image
 * @property {string} detail
 * @property {string} communication
 * @property {number} created_at
 * @property {number} updated_at 
 * @property {number} user_id
 */

/**
 * A model representing a company Maraicher
 * @class Company
 */
class Company extends CoreModel {
/**
* The company constructor
* @param {Object} obj a litteral object with properties copied into the instance
*/
    // constructor(obj={}) {
    //     for (const propName in obj) {
    //         this[propName] = obj[propName];
    //     }
    // }


    static async getCount() {
        try {
            return new Company(await CoreModel.getRow(`SELECT COUNT(*) FROM company`))
            // .map(row => new Company(row)); 
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

/**
* Fetches all companys from the database
* @returns {Array<company>}
* @static
* @async
*/

    static async findAll() {
        try {
            return (await CoreModel.getArray('SELECT * FROM company_all'))
            .map(row => new Company(row));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

/**
 *  Fetches a single company from the database
* @param {number} id 
* @returns {Post|null} null if no post matches the id in database
* @static
* @async
*/
    static async findOne(id) {
        try {            
            return new Company(await CoreModel.getRow(`SELECT * FROM company_with_product WHERE id=$1 limit 1`,[id]));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
/**
* Fetches company with products by user id from the database
* @param {number} userId 
* @returns {Post|null} null if no post matches the id in database
* @static
* @async
*/
/*We used this view to avoid two requests from the front one for the companies another for their products */
    static async findCompanyByUser(id) {
        try {            
            return new Company(await CoreModel.getRow('SELECT * FROM "company_with_product" WHERE user_id=$1 limit 1', [id]));

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

/**
* Add or update a company to the database with userId with an array of products empty or not
* @param {number} userId 
* @returns {Post} the newly created post
* @throws {Error} a potential SQL error
*/
/*We changed the function because front need to receve en array for the display */
     async save() {
        try {
            if (this.id) {
                //update
                new Company(await CoreModel.getRow('SELECT * FROM update_company($1)', [this]));
                return new Company(await CoreModel.getRow('SELECT * FROM company_with_product WHERE id=$1 limit 1', [this.id]));

               
            } else {
                 new Company(await CoreModel.getRow('SELECT * FROM add_company($1)', [this]));
                return new Company(await CoreModel.getRow('SELECT * FROM company_with_product WHERE user_id=$1 limit 1', [this.user_id]));
            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
     }
/**
* Add a company to the database with userId and turn the city into GPS data
* @param {number} userId 
* @returns {Post} the newly created post
* @throws {Error} a potential SQL error
*/
     async saveXY() {
        try {            
            return new Company(await CoreModel.getRow('SELECT * FROM update_XYcompany($1)', [this]));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
     }
/**
* Delete a company to the database with userId
* @param {number} userId 
* @throws {Error} a potential SQL error
*/
    async delete() {
        try {
            return new Company(await CoreModel.getRow('DELETE FROM company WHERE user_id=$1', [this.id]));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}

module.exports = Company;