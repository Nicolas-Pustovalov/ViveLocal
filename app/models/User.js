const db = require('../../database/databaseSQL');
const bcrypt = require('bcrypt');
/**
 * An entity representing a user Maraicher
 * @typedef {Object} User
 * @property {number} id
 * @property {string} last_name
 * @property {string} first_name
 * @property {string} pseudo
 * @property {string} address
 * @property {string} zip
 * @property {string} city
 * @property {number} x
 * @property {number} y
 * @property {number} mail
 * @property {string} phone
 * @property {string} password
 * @property {string} role
 * @property {number} created_at
 * @property {number} updated_at 
*/
/**
 * A model representing a user Maraicher
 * @class user
 */

class User {
/**
* The user constructor
* @param {Object} obj a litteral object with properties copied into the instance
*/
    constructor(obj={}) {
        for (const prop in obj) {
            this[prop] = obj[prop];
        }
    }

// models user pour les routes
  /**
* Fetches all users from the database
* @returns {Array<user>}
* @static
* @async
*/  
    static  async findAll(){
            try {
                const {rows} = await db.query(`SELECT * FROM "user_with_favorite"`);
                return rows.map(row => new User(row));
            } catch (error) {
                if (error.detail) {
                    throw new Error(error.detail);
                }
                throw error;
            }
        
    }
/**
*  Fetches a single user from the database
* @returns {Post|null} null if no post matches the id in database
* @static
* @async
*/
    static async findOne(id) {
        try {
            const {rows} = await db.query(`SELECT * FROM "user_with_favorite" WHERE id=$1 limit 1`, [id]);
            if (rows[0]) {
                return new User(rows[0]);
            }
            return null;
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
/**
* Add a user to the database
* @returns {Post} the newly created post
* @throws {Error} a potential SQL error
*/
    async save() {
        try {
                const password = await bcrypt.hash(this.password, 10);
                const mail = this.mail.toLowerCase();
                const { rows } = await db.query('INSERT INTO "user"(last_name, first_name, pseudo, address, zip, city, x, y, mail, phone, password, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id',
                    [
                    this.last_name,
                    this.first_name,
                    this.pseudo,
                    this.address,
                    this.zip,
                    this.city,
                    this.x,
                    this.y,
                    mail,
                    this.phone,
                    password,
                    this.role
                    ])
                this.id = rows[0].id;
                
                // if (type.toLowerCase() !== scheme.toLowerCase() || !token) {
                //     throw new BadCredentialsError({
                //       message: `Header format is Authorization: ${type} token`
                //     });
                //   }
                return {
                    id: this.id,
                    last_name: this.last_name,
                    first_name:this.first_name,
                    pseudo: this.pseudo,
                    zip: this.zip,
                    city: this.city,
                    mail:this.mail,
                    phone: this.phone,
                    role:this.role
                };
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
/**
* Update a user to the database with id
* @param {number} id 
* @returns {Post} the newly created post
* @throws {Error} a potential SQL error
*/
    async writeProfile(id) {
        try {
            const password = await bcrypt.hash(this.password, 10);
            const mail = this.mail.toLowerCase();
                await db.query('UPDATE "user" SET "last_name"=$1,"first_name"=$2,"pseudo"=$3,"address"=$4,"zip"=$5,"city"=$6, "x"=$7, "y"=$8, "mail"=$9, "phone"=$10,"password"=$11, "role"=$12 WHERE "id"=$13',[
                    this.last_name,
                    this.first_name,
                    this.pseudo,
                    this.address,
                    this.zip,
                    this.city,
                    this.x,
                    this.y,
                    mail,
                    this.phone,
                    password,
                    this.role,
                    id
                ])
            return {
                id: id,
                last_name: this.last_name,
                first_name: this.first_name,
                pseudo: this.pseudo,
                zip: this.zip,
                city: this.city,
                mail: this.mail,
                phone: this.phone,
                role: this.role
            };
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    
/**
* Add a user to the database with turn the city into GPS data
* @returns {Post} the newly created post
* @throws {Error} a potential SQL error
*/
    async saveXY() {
        try {
            
            const password = await bcrypt.hash(this.password, 10);
            const mail = this.mail.toLowerCase();
                await db.query('UPDATE "user" SET "last_name"=$1,"first_name"=$2, "address"=$4,"zip"=$5,"city"=$6, "x"=$7, "y"=$8, "mail"=$9, "phone"=$10,"password"=$11, "role"=$12 WHERE "pseudo"=$3',[
                    this.last_name,
                    this.first_name,
                    this.pseudo,
                    this.address,
                    this.zip,
                    this.city,
                    this.x,
                    this.y,
                    mail,
                    this.phone,
                    password,
                    this.role
                ])
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
/**
* login user with mail and password
* @returns {Post} the newly created post
* @throws {Error} a potential SQL error
*/
        async doLogin() {
        try {
            const mail = this.mail.toLowerCase();
            const {rows} = await db.query('SELECT * FROM "user" WHERE mail=$1', [mail]);
            if (!rows[0]) {
                throw new Error('Email is not correct');
            }
            const isPwdValid = await bcrypt.compare(this.password, rows[0].password);
            if (!isPwdValid) {
                throw new Error('Password is not correct');
            }
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
            };
                try {
                    const mail = this.mail.toLowerCase();
                    const {rows} = await db.query(`SELECT * FROM "user_with_favorite" WHERE mail=$1 limit 1`, [mail]);
                    if (rows[0]) {
                        return new User(rows[0]);
                    }
                            
                } catch (error) {
                    if (error.detail) {
                        throw new Error(error.detail);
                    }
                    throw error;
                }
            
    };
/**
* Delete a user to the database
* @param {number} id 
* @throws {Error} a potential SQL error
*/
    async delete() {
        try {
            await db.query('DELETE FROM "user" WHERE id=$1', [this.id]);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}

module.exports = User;