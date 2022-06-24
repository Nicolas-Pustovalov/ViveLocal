-- Verify maraicher:table_favorite on pg

BEGIN;

SELECT * FROM favorite WHERE false;

ROLLBACK;
