CREATE DATABASE listify_db;

-- Lists

CREATE TABLE lists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    share BOOLEAN DEFAULT FALSE
);

INSERT INTO lists (name, share) VALUES ('Grocery List', True);
INSERT INTO lists (name) VALUES ('Packing List');
INSERT INTO lists (name) VALUES ('Gift Ideas');
INSERT INTO lists (name) VALUES ('House Projects');

SELECT * FROM lists;

-- ----------------- Create a unique 6-character  numeric codes -----------------
-- ----------------1. add shared_code column
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

-- ------------- 6. Update Specific Rows
UPDATE lists
SET shared_code = (
    SELECT string_agg(
                   substr('0123456789', floor(random() * 10 + 1)::int, 1), '')
    FROM generate_series(1, 6)
)
WHERE id IN (2);

-- ----------------------------------------------------------------------------------


-- alter table lists alter column created_at type date;

-- Users
CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   username VARCHAR(255) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ALERT ID COLUMNS
ALTER TABLE users RENAME COLUMN id TO user_id;
ALTER TABLE users RENAME COLUMN user_id TO id;
ALTER TABLE lists RENAME COLUMN id TO list_id;
ALTER TABLE lists RENAME COLUMN list_id TO id;

-- USER_LISTS JUNCTION TABLE
CREATE TABLE users_lists (
    user_id INT REFERENCES users(id) ON DELETE CASCADE, -- References the `users` table
    list_id INT REFERENCES lists(id) ON DELETE CASCADE, -- References the `lists` table
    PRIMARY KEY (user_id, list_id)                     -- Composite primary key to ensure uniqueness
);
INSERT INTO users_lists (user_id, list_id) VALUES (16, 1), (16, 2), (16, 3), (16, 4);

-- select lists associated with a specific user id
SELECT l.* FROM lists l      -- select all columns from teh lists table, l is its alias
JOIN users_lists ul          -- joins the lists table with the users_lists table where the list_id matches
ON l.id = ul.list_id         -- only rows where list_id in both tables match are includes
WHERE ul.user_id = 16        -- filter the results to include only rows where user_id is 16
ORDER BY l.created_at DESC;  -- order the lists

-- create list item, many-to-one with lists
create table list_item (
    id serial primary key,
    description varchar(255) not null,
    units varchar (255),
    list_id int references lists(id) on delete cascade  -- when a list is deleted, its associated list items are also deleted automatically
);
INSERT INTO lists (name, share) VALUES ('Grocery List', True);

insert into list_item (description, units, list_id) values ('Carrot', '1 bag', 1);
insert into list_item (description, units, list_id) values ('Potato', '1 lbs', 1);
insert into list_item (description, units, list_id) values ('Soymilk', '1 bottle', 1);
insert into list_item (description, units, list_id) values ('Tomatoes', '3', 1);
insert into list_item (description, units, list_id) values ('Carrot', '1 bag', 2);
insert into list_item (description, units, list_id) values ('Diapers', '1 box', 3);
insert into list_item (description, units, list_id) values ('Living room closet', '1', 4);
insert into list_item (description, units, list_id) values ('bookshelves', '3', 4);
--
SELECT * FROM list_item WHERE list_id  = 1;
alter table list_item add checked boolean;
alter table list_item drop column if exists checked;
alter table list_item add checked boolean default false;
--
update list_item set checked = true where id = 1;

--
select id, name, share,
to_char(created_at, 'DD Mon YYYY HH12:MI:SS AM') as created_at
from lists
order by id asc;
--
update users set ${setClause} where id = $2 returning id, username, email,
    TO_CHAR(created_at, 'DD Mon YYYY HH12:MI:SS AM') AS formatted_created_at,  [email, 16]
