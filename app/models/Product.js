const CoreModel = require('./CoreModel');

/**
 * An entity representing a items Maraicher
 * @typedef {Object} product
 * @property {number} id
 * @property {string} type
 * @property {string} name
 * @property {string} detail
 * @property {boolean} price_kg
 * @property {number} price
 * @property {string} image
 * @property {number} company_id
 * @property {number} created_at
 * @property {number} updated_at 
 */
/**
 * A model representing a items Maraicher
 * @class Company
*/

class Product extends CoreModel{
/**
* The product constructor
* @param {Object} obj a litteral object with properties copied into the instance
*/

/**
* Fetches all products from the database
* @returns {Array<product>}
* @static
* @async
*/

    static async findAll() {
        try {
            return new Product(await CoreModel.getArray(`SELECT * FROM "product" `))
            .map(row => new Product(row));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
/**
*  Fetches a single product from the database
* @param {number} id 
* @returns {Post|null} null if no post matches the id in database
* @static
* @async
*/

    static async findOne(id) {
        try {
            return new Product(await CoreModel.getRow('SELECT * FROM "product" WHERE id=$1', [id]));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

/**
* Add a product to the database with user id
* @param {number} userId 
* @returns {Post} the newly created post
* @throws {Error} a potential SQL error
*/
    async save() {
        try {
            if (this.id) {
                //update
                return new Product(await CoreModel.getRow('SELECT * FROM update_product($1)', [this]));
            } else {
                return new Product(await CoreModel.getRow('SELECT * FROM add_product($1)', [this]));
            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
     
/**
* Delete a company to the database with id and user id
* @param {number} Id 
* @param {number} userId 
* @throws {Error} a potential SQL error
*/       
    async delete() {
        try {
            return new Product(await CoreModel.getRow('DELETE FROM product WHERE id=$1', [this.id]));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}

module.exports = Product;