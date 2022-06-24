-- Revert maraicher:table_favorite from pg

BEGIN;

DROP TABLE favorite CASCADE ;

CREATE TABLE user_has_company (
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "company_id" INT NOT NULL REFERENCES "company"("id") ON DELETE CASCADE
    
);

COMMIT;
