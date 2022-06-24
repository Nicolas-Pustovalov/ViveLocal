-- Revert maraicher:index from pg

BEGIN;

DROP INDEX favorite_user_id_hash_idx;

DROP INDEX favorite_company_id_hash_idx ;

DROP INDEX favorite_id_hash_idx;

DROP INDEX favorite_created_at_hash_idx;

DROP INDEX favorite_updated_at_idx;

DROP INDEX product_created_at_hash_idx;

DROP INDEX product_updated_at_idx;

DROP INDEX product_company_id_idx;

DROP INDEX product_image_idx_btree;

DROP INDEX product_price_idx_btree;

DROP INDEX product_price_kg_idx_btree;

DROP INDEX product_detail_idx_btree;

DROP INDEX product_type_idx_btree;

DROP INDEX product_name_idx_btree;

DROP INDEX product_id_idx_btree;

DROP INDEX company_siret_idx;

DROP INDEX company_updated_at_idx;

DROP INDEX company_created_at_hash_idx;

DROP INDEX company_user_id_hash_idx;

DROP INDEX company_communication_idx_btree;

DROP INDEX company_detail_idx_btree;

DROP INDEX company_image_idx_btree;

DROP INDEX company_name_idx_btree;

DROP INDEX company_mail_idx_btree;

DROP INDEX company_phone_idx_btree;

DROP INDEX company_y_idx_btree;

DROP INDEX company_x_idx_btree;

DROP INDEX company_city_idx_btree;

DROP INDEX company_address_idx_btree;

DROP INDEX company_zip_idx_btree;

DROP INDEX company_id_idx_btree;

DROP INDEX user_updated_at_idx;

DROP INDEX user_created_at_hash_idx;

DROP INDEX user_role_hash_idx;

DROP INDEX user_mail_hash_idx;

DROP INDEX user_password_hash_idx;

DROP INDEX user_phone_idx_btree;

DROP INDEX user_y_idx_btree;

DROP INDEX user_x_idx_btree;

DROP INDEX user_city_idx_btree;

DROP INDEX user_zip_idx_btree;

DROP INDEX user_address_idx_btree;

DROP INDEX user_pseudo_idx_btree;

DROP INDEX user_first_name_idx_btree;

DROP INDEX user_last_name_idx_btree;

DROP INDEX user_id_idx_btree;

COMMIT;
