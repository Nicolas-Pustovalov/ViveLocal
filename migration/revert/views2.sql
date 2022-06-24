-- Revert maraicher:views2 from pg

BEGIN;
DROP VIEW favorite_info_company;
DROP VIEW user_with_favorite;
DROP VIEW  company_all;
DROP VIEW company_with_product;


COMMIT;
