-- Deploy maraicher:functions to pg

BEGIN;

CREATE FUNCTION add_user (json) RETURNS "user" AS $$
	INSERT INTO "user" (last_name, first_name, pseudo, address, zip, city, mail, phone, password, role)
	VALUES (
		$1->>'last_name', 
		$1->>'first_name', 
		$1->>'pseudo', 
		$1->>'address', 
		$1->>'zip',
        $1->>'city',
        $1->>'mail',
		$1->>'phone',
        $1->>'password',
		$1->>'role'
	)
	RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_user(json) RETURNS "user" AS $$
	UPDATE "user" SET
		last_name=$1->>'last_name',
		first_name=$1->>'first_name',
		pseudo=$1->>'pseudo',
		address=$1->>'address',
		zip=$1->>'zip',
		city=$1->>'city',
		mail=$1->>'mail',
		phone=$1->>'phone',
        password=$1->>'password'
	WHERE id=($1->>'id')::int
	RETURNING *;
$$ LANGUAGE SQL STRICT;


CREATE FUNCTION add_company(json) RETURNS company AS $$
	INSERT INTO company (name, siret, address, city, zip, phone, mail, x, y, image, detail, communication, user_id )
	VALUES (
		$1->>'name', 
		$1->>'siret',  
		$1->>'address', 
        $1->>'city',
		$1->>'zip',
        $1->>'phone',
        $1->>'mail',
		($1->>'x')::NUMERIC,
        ($1->>'y')::NUMERIC,
        $1->>'image',
		$1->>'detail',
		$1->>'communication',
		($1->>'user_id')::int
	)
	RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_company(json) RETURNS company AS $$
	UPDATE company SET
		name=$1->>'name',
		siret=$1->>'siret',
		address=$1->>'address',
		city=$1->>'city',
		zip=$1->>'zip',
		phone=$1->>'phone',
		mail=$1->>'mail',
		x=($1->>'x')::NUMERIC,
        y=($1->>'y')::NUMERIC,
        image=$1->>'image',
        detail=$1->>'detail',
        communication=$1->>'communication',
		user_id=($1->>'user_id')::int
	WHERE id=($1->>'id')::int
	RETURNING *;
$$ LANGUAGE SQL STRICT;


CREATE FUNCTION update_XYcompany(json) RETURNS company AS $$
	UPDATE company SET
		name=$1->>'name',
		siret=$1->>'siret',
		address=$1->>'address',
		city=$1->>'city',
		zip=$1->>'zip',
		phone=$1->>'phone',
		mail=$1->>'mail',
		x=($1->>'x')::NUMERIC,
        y=($1->>'y')::NUMERIC,
        image=$1->>'image',
        detail=$1->>'detail',
        communication=$1->>'communication'
	WHERE user_id=($1->>'user_id')::int
	RETURNING *;
$$ LANGUAGE SQL STRICT;


CREATE FUNCTION add_product(json) RETURNS product AS $$
	INSERT INTO product (type, name, detail, price_kg, price, image, company_id)
	VALUES (
		($1->>'type')::text, 
		($1->>'name')::text, 
		($1->>'detail')::text, 
		($1->>'price_kg')::BOOLEAN, 
		($1->>'price')::NUMERIC,
        ($1->>'image')::text,
        ($1->>'company_id')::int		
	)
	RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_product(json) RETURNS product AS $$
	UPDATE product SET
		type=$1->>'type',
		name=$1->>'name',
		detail=$1->>'detail',
		price_kg=($1->>'price_kg'):: BOOLEAN,
		price=($1->>'price')::NUMERIC,
		image=$1->>'image'
	WHERE id=($1->>'id')::int
	RETURNING *;
$$ LANGUAGE SQL STRICT;


-- CREATE FUNCTION check_favorite (json) RETURNS favorite AS $$
-- case WHEN  select * from favorite  having "company_id" and "user_id"
-- 	INSERT INTO favorite (type, name, detail, price_kg, price, image, company_id)
-- 	VALUES (
-- 		($1->>'type')::text, 
-- 		($1->>'name')::text, 
-- 		($1->>'detail')::text, 
-- 		($1->>'price_kg')::BOOLEAN, 
-- 		($1->>'price')::NUMERIC,
--          ($1->>'image')::text,
--          ($1->>'company_id')::int		
-- 	)
-- 	RETURNING *;
-- $$ LANGUAGE SQL STRICT;



COMMIT;
