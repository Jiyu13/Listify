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
ALTER TABLE lists RENAME COLUMN id TO list_id;
ALTER TABLE users RENAME COLUMN user_id TO id;
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
