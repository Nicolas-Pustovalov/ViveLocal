-- Deploy maraicher:views2 to pg

BEGIN;


CREATE VIEW company_with_product AS
			SELECT 
			company.id,
			company.name,
			company.siret,
			company.address,
			company.city,
			company.zip,
			company.phone,
			company.mail,
			json_build_object(
				'lng', company.x,
				'lat', company.y)
				 AS coordinates,
			-- company.x,
			-- company.y,
			company.image,
			company.detail,
			company.communication,
			company.user_id,
			company.created_at,
			company.updated_at,

				(SELECT CASE WHEN max(product.id) IS NOT NULL THEN json_agg(json_build_object(
					'id', product.id,
					'type',product.type,

					'id',product.id,
					'name',product.name,

					'id',product.id,
					'detail',product.detail,

					'id',product.id,
					'price_kg',product.price_kg,

					'id',product.id,
					'price',product.price,

					'id',product.id,
					'image',product.image
					) 
					ORDER BY product.type asc)
				ELSE '[]'::json END FROM product WHERE product.company_id= company.id)
				AS product
				
			FROM company
			full outer JOIN product ON company.id=product.company_id;

 			-- where company.id=$1 limit 1;

CREATE VIEW company_all AS
			SELECT 
			company.name,
			company.address,
			company.city,
			json_build_object(
				'lng', company.x,
				'lat', company.y)
				 AS coordinates,
			company.image,
			company.detail,
			company.communication,
			company.user_id,
			company.id,
			company.mail,
			company.phone,
			company.zip
			FROM company;


CREATE VIEW user_with_favorite AS
SELECT 
			"user".id,
			"user".last_name,
			"user".first_name,
			"user".pseudo,
			"user".address,
			"user".zip,
			"user".city,
			"user".mail,
			json_build_object(
				'lng', "user".x,
				'lat', "user".y)
				 AS coordinates,
			"user".phone,
			"user".role,
		(SELECT CASE WHEN max(favorite.id) IS NOT NULL THEN json_agg(json_build_object(
			
					'id',favorite.id,
					'company_id',favorite.company_id,

					'company_id',favorite.company_id,
					'address',company.address,

					'company_id',favorite.company_id,
					'city',company.city,

					'company_id',favorite.company_id,
					'detail',company.detail,
			
					'company_id',favorite.company_id,
					'image',company.image,
			
					'company_id',favorite.company_id,
					'mail',company.mail,

					'company_id',favorite.company_id,
					'name',company.name,
			
					'company_id',favorite.company_id,
					'phone',company.phone,
			
					'company_id',favorite.company_id,
					'zip',company.zip
					) 
					ORDER BY company.name asc)
			ELSE '[]'::json END  FROM favorite 
		  JOIN company ON favorite.company_id=company.id
		 WHERE favorite.user_id= "user".id)
				AS favorite
				
			FROM "user"
			full outer JOIN favorite ON "user".id=favorite.user_id;

--  where "user".id=1
--  limit 1;

CREATE VIEW favorite_info_company AS

		SELECT 
					favorite.id as favorite_id,
					favorite.user_id,
					favorite.company_id,
					company.address,
					company.city,
					company.detail,
					company.image,
					company.mail,
					company.name,
					company.phone,
					company.zip
 		  FROM favorite 
		  JOIN company ON favorite.company_id=company.id;
-- where favorite.user_id=7


COMMIT;
