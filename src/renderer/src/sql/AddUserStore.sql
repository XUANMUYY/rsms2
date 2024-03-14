DELETE
FROM user_list
WHERE name = 'tmp';
INSERT INTO user_list (user, password, authority,name,card,state)
VALUES ('tmp', 'tmp', 'guest', 'tmp', '00000','freeze');