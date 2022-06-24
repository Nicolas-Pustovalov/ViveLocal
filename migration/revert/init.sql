-- Revert maraicher:init from pg

BEGIN;
DROP TABLE user_has_company;
DROP TABLE product;
DROP TABLE company CASCADE;
DROP TABLE "user";
DROP DOMAIN posint;
COMMIT;
