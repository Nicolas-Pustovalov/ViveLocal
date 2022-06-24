-- Verify maraicher:init on pg

BEGIN;

SELECT * FROM user WHERE false;
SELECT * FROM company WHERE false;
SELECT * FROM product WHERE false;
SELECT * FROM user_has_company WHERE false;

ROLLBACK;
