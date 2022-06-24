-- Revert maraicher:functions from pg

BEGIN;

DROP FUNCTION update_XYcompany(json);


DROP FUNCTION update_product(json);
DROP FUNCTION add_product(json);

DROP FUNCTION update_company(json);
DROP FUNCTION add_company(json);

DROP FUNCTION update_user(json);
DROP FUNCTION add_user(json);


COMMIT;
