const CoreModel = require('./CoreModel');

/**
 * An entity representing a favorite company
 * @typedef {Object} Favorite
 * @property {number} id
 * @property {number} company_id
 * @property {string} company_name
 * @property {number} created_at
 * @property {number} updated_at 
 * @property {number} user_id
*/
/**
 * A model representing a company Maraicher
 * @class Favorite
 */
class Favorite extends CoreModel{
/**
* The favorite constructor
* @param {Object} obj a litteral object with properties copied into the instance
*/

/**
* Fetches all favorites by users id from the database
* @param {number} userId 
* @returns {Array<favorite>}
* @static
* @async 
*/

    static async findAllOfOneUser(id) {
        try {
            return (await CoreModel.getArray(`SELECT * FROM favorite_info_company WHERE user_id=$1`, [id])).map(row => new Favorite(row));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
/**
* Add a favorite to the database with userId
* @param {number} userId 
* @returns {Post} the newly created post
* @throws {Error} a potential SQL error
*/
    async save() {
        try {
            return new Favorite(await CoreModel.getRow('INSERT INTO "favorite"(company_id, user_id) VALUES ($1, $2) RETURNING id, company_id, user_id ',
                [
                this.company_id,
                this.user_id
                ]))
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
    
/**
* Delete a favorite to the database
* @param {number} id 
* @throws {Error} a potential SQL error
*/
    async delete() {
        try {
            return new Favorite(await CoreModel.getRow('DELETE FROM "favorite" WHERE id=$1', [this.id]));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}

module.exports = Favorite;