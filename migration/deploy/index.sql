-- Deploy maraicher:index to pg

BEGIN;

-- B-tree   hash

-- CREATE [ UNIQUE ] INDEX [ CONCURRENTLY ] [ [ IF NOT EXISTS ] nom ] ON nom_table [ USING méthode ] 
--     ( { nom_colonne | ( expression ) } [ COLLATE collation ] [ classeop ] [ ASC | DESC ] [ NULLS { FIRST | LAST } ] [, ...] )
--     [ WITH ( parametre_stockage [= valeur] [, ... ] ) ]
--     [ TABLESPACE nom_espacelogique ]
--     [ WHERE prédicat ]



-- user
CREATE INDEX user_id_idx_btree                     ON "user" (id);

CREATE INDEX user_last_name_idx_btree              ON "user" (last_name);

CREATE INDEX user_first_name_idx_btree             ON "user" (first_name);

CREATE INDEX user_pseudo_idx_btree                 ON "user" (pseudo);

CREATE INDEX user_address_idx_btree                ON "user" (address);

CREATE INDEX user_zip_idx_btree                    ON "user" (zip);

CREATE INDEX user_city_idx_btree                   ON "user" (city);

CREATE INDEX user_x_idx_btree                      ON "user" (x);

CREATE INDEX user_y_idx_btree                      ON "user" (y);

CREATE INDEX user_phone_idx_btree                  ON "user" (phone);


CREATE INDEX user_password_hash_idx                ON "user" USING hash (password);

CREATE INDEX user_mail_hash_idx                    ON "user" USING hash (mail);

CREATE INDEX user_role_hash_idx                    ON "user" USING hash (role);

CREATE INDEX user_created_at_hash_idx              ON "user" USING hash (created_at);

CREATE INDEX user_updated_at_idx                   ON "user" USING hash (updated_at);


-- company
CREATE INDEX company_id_idx_btree                  ON company (id);

CREATE INDEX company_zip_idx_btree                 ON company (zip);

CREATE INDEX company_address_idx_btree             ON company (address);

CREATE INDEX company_city_idx_btree                ON company (city);

CREATE INDEX company_x_idx_btree                   ON company (x);

CREATE INDEX company_y_idx_btree                   ON company (y);

CREATE INDEX company_phone_idx_btree               ON company (phone);

CREATE INDEX company_mail_idx_btree                ON company (mail);

CREATE INDEX company_name_idx_btree                ON company (name);

CREATE INDEX company_image_idx_btree               ON company (image);

CREATE INDEX company_detail_idx_btree              ON company (detail);

CREATE INDEX company_communication_idx_btree       ON company (communication);


CREATE INDEX company_user_id_hash_idx            ON company USING hash (user_id);

CREATE INDEX company_created_at_hash_idx         ON company USING hash (created_at);

CREATE INDEX company_updated_at_idx              ON company USING hash (updated_at);

CREATE INDEX company_siret_idx                   ON company USING hash (siret);


-- product
CREATE INDEX product_id_idx_btree                ON product (id);

CREATE INDEX product_name_idx_btree              ON product (name);

CREATE INDEX product_type_idx_btree              ON product (type);

CREATE INDEX product_detail_idx_btree            ON product (detail);

CREATE INDEX product_price_kg_idx_btree          ON product (price_kg);

CREATE INDEX product_price_idx_btree             ON product (price);

CREATE INDEX product_image_idx_btree             ON product (image);


CREATE INDEX product_company_id_idx              ON product USING hash (company_id);

CREATE INDEX product_updated_at_idx              ON product USING hash (updated_at);

CREATE INDEX product_created_at_hash_idx         ON product USING hash (created_at);


-- favorite
CREATE INDEX favorite_updated_at_idx              ON favorite USING hash (updated_at);

CREATE INDEX favorite_created_at_hash_idx         ON favorite USING hash (created_at);

CREATE INDEX favorite_id_hash_idx                 ON favorite USING hash (id);

CREATE INDEX favorite_company_id_hash_idx         ON favorite USING hash (company_id);

CREATE INDEX favorite_user_id_hash_idx            ON favorite USING hash (user_id);

COMMIT;
