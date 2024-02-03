DELETE
FROM user_list
WHERE user = 'tmp';
INSERT INTO user_list (user, password, authority,name,card)
VALUES (100, 'tmp', 'guest', 'tmp', '00000');