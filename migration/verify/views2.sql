-- Verify maraicher:views2 on pg

BEGIN;

SELECT * FROM company_with_product WHERE false;

SELECT * FROM company_all WHERE false;

SELECT * FROM user_with_favorite WHERE false;

SELECT * FROM favorite_info_company WHERE false;


ROLLBACK;
