-- Deploy maraicher:table_favorite to pg

BEGIN;

DROP TABLE user_has_company;

CREATE TABLE favorite (
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"company_id" INT NOT NULL REFERENCES company ("id") ON DELETE CASCADE,
"user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
"created_at" TIMESTAMPTZ DEFAULT NOW(),
"updated_at" TIMESTAMPTZ DEFAULT NOW() ,
UNIQUE ("company_id", "user_id")
);

COMMIT;




