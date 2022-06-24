require('dotenv').config();

const company = require('./company.json');
const users = require('./user.json');
const products = require('./product.json');
const favorites = require('./favorite.json');


const client = require('../database/databaseSQL');

const importData = async () => {

    await client.query('TRUNCATE  favorite, product,  company, "user"  RESTART IDENTITY;');
    //on va stocker l'id des catégories au fur et à mesure des insertions
    //on en a besoin pour créer les posts ensuite, ce sera plus efficace que de refaire une requête pour récupérer l'id en base
    const companyIds = {};

    //on insère les catégories et on remplit l'object categoriesIds
    
    for (const user of users)
    {
        //avec RETURNING, on demande explicitement à Postgres de nous renvoyer dans le code l'id de l'enregistrement fraichement créé
        const {rows} = await client.query(`INSERT INTO "user"(last_name, first_name, pseudo, address, zip, city, x, y, mail, phone, password, role) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`, [user.last_name, user.first_name, user.pseudo, user.address, user.zip, user.city, user.x, user.y, user.mail, user.phone, user.password, user.role]);

    }
    
    for (const oneCompany of company)

     {
        //on récupère l'id de la catégorie de chaque post et on fait l'insertion
        await client.query(`INSERT INTO company (name, siret, address, city, zip, phone, mail, x, y, image, detail, communication, user_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12, $13)`, [oneCompany.name, oneCompany.siret, oneCompany.address, oneCompany.city, oneCompany.zip, oneCompany.phone, oneCompany.mail, oneCompany.x, oneCompany.y, oneCompany.image, oneCompany.detail, oneCompany.communication, oneCompany.user_id]);
    }
    
    for (const product of products)

     {
        //on récupère l'id de la catégorie de chaque post et on fait l'insertion
        await client.query(`INSERT INTO product (type, name, detail, price_kg, price, image, company_id) VALUES($1,$2,$3,$4,$5,$6,$7)`, [
            product.type,
            product.name,
            product.detail,
            product.price_kg,
            product.price,
            product.image,
            product.company_id
        ]);
    }
    for (const favorite of favorites)
     {
        //on récupère l'id de la catégorie de chaque post et on fait l'insertion
        await client.query(`INSERT INTO favorite (company_id, user_id) VALUES($1,$2)`, [
            favorite.company_id,
            favorite.user_id
        ]);
    }

    client.end();

};

importData();