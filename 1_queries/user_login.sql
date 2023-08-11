/*
Selects the information of a particular user based on their e-mail
*/

SELECT id, name, email, password 
FROM users
WHERE email = 'tristanjacobs@gmail.com'; -- to be converted to a parameter