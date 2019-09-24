DROP TABLE if exists comments;
CREATE TABLE comments (comment_id serial primary key, comment varchar, user_id varchar);
INSERT INTO comments VALUES (0, 'this is a comment', 'kerry');

DROP TABLE if exists passwords;
CREATE TABLE passwords (password_id serial primary key, password varchar, user_name varchar);
INSERT INTO passwords VALUES (0, 'password', 'kerry');