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
--
ALTER TABLE lists
ADD COLUMN  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;

INSERT INTO lists (name, share) VALUES ('Grocery List', True);
INSERT INTO lists (name) VALUES ('Packing List');
INSERT INTO lists (name) VALUES ('Gift Ideas');
INSERT INTO lists (name) VALUES ('House Projects');

SELECT * FROM lists;
