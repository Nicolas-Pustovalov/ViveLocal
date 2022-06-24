-- Deploy maraicher:init to pg

BEGIN;


CREATE DOMAIN posint AS INT CHECK(value > 0);

CREATE TABLE "user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "last_name" TEXT NOT NULL , 
  "first_name" TEXT NOT NULL , 
  "pseudo" TEXT NOT NULL UNIQUE, 
  "address" TEXT NOT NULL, 
  "zip" TEXT NOT NULL,
  "city" TEXT NOT NULL , 
  "x" NUMERIC ,
  "y" NUMERIC ,
  "mail" TEXT NOT NULL UNIQUE, 
  "phone" TEXT NOT NULL,
  "password" TEXT NOT NULL, 
  "role" TEXT,
--   "favorite" INT REFERENCES "company"("id")
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ DEFAULT NOW() 
);



CREATE TABLE "company" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "siret" TEXT NOT NULL UNIQUE,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "mail" TEXT NOT NULL UNIQUE,
    "x" NUMERIC ,
    "y" NUMERIC ,
    "image" TEXT,
    "detail"TEXT,
    "communication" TEXT,
    "user_id" INT NOT NULL UNIQUE REFERENCES "user"("id"),
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()

    
);

CREATE TABLE product (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "detail" TEXT,
    "price_kg" BOOLEAN DEFAULT TRUE,
    "price" TEXT NOT NULL, 
    "image" TEXT,
    "company_id" INT NOT NULL REFERENCES "company"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()

);

CREATE TABLE user_has_company (
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "company_id" INT NOT NULL REFERENCES "company"("id") ON DELETE CASCADE
    
);

COMMIT;
