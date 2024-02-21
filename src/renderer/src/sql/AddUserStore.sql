DELETE
FROM user_list
WHERE name = 'tmp';
INSERT INTO user_list (user, password, authority,name,card)
VALUES ('tmp', 'tmp', 'guest', 'tmp', '00000');