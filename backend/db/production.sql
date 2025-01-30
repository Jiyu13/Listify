CREATE DATABASE listify_db;

CREATE TABLE lists (
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   share BOOLEAN DEFAULT FALSE
);
-- ----------------1. ad new column ----
ALTER TABLE lists ADD COLUMN shared_code VARCHAR(6);
-- ----------------2.populates the column with random 6-character alphanumeric codes
UPDATE lists
SET shared_code = (
    SELECT string_agg(
                   substr('0123456789', floor(random() * 10 + 1)::int, 1), '')
    FROM generate_series(1, 6)
)
WHERE shared_code IS NULL;
-- ----------------3.Add a UNIQUE Constraint

-- trigger error (key shared_code is duplicated?????????????????????????????????????????????????????????
update lists set shared_code = 123456 where id = 2;

ALTER TABLE lists ADD CONSTRAINT unique_shared_code UNIQUE (shared_code);

-- ----------------4.Function to Generate Unique 6-Digit Numeric Codes
CREATE OR REPLACE FUNCTION generate_shared_code()
    RETURNS TRIGGER AS $$
DECLARE
    new_code VARCHAR(6);
BEGIN
    LOOP
        -- Generate a random 6-digit numeric code
        new_code := (
            SELECT string_agg(
                           substr('0123456789', floor(random() * 10 + 1)::int, 1), '')
            FROM generate_series(1, 6)
        );

        -- Check for uniqueness
        IF NOT EXISTS (SELECT 1 FROM lists WHERE shared_code = new_code) THEN
            EXIT;
        END IF;
    END LOOP;

    NEW.shared_code := new_code;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- -------------5.Trigger to Automatically Generate Codes
CREATE TRIGGER set_shared_code
    BEFORE INSERT ON lists
    FOR EACH ROW
    WHEN (NEW.shared_code IS NULL)
EXECUTE FUNCTION generate_shared_code();

-- ==================================================== users table ===================================================
CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   username VARCHAR(255) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ==================================================== users_lists table ==============================================
CREATE TABLE users_lists (
     user_id INT REFERENCES users(id) ON DELETE CASCADE, -- References the `users` table
     list_id INT REFERENCES lists(id) ON DELETE CASCADE, -- References the `lists` table
     PRIMARY KEY (user_id, list_id)                     -- Composite primary key to ensure uniqueness
);

-- ==================================================== list_item table ==============================================
create table list_item (
       id serial primary key,
       description varchar(255) not null,
       units varchar (255),
       list_id int references lists(id) on delete cascade  -- when a list is deleted, its associated list items are also deleted automatically
);

alter table list_item add checked boolean default false;
-- ====================================================================================================================
