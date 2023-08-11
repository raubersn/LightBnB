/*
Select the properties of a certain city containing a average rating higher than the parameter passed

The suggested solutions uses LIKE instead of the equal operator, but we understand that 'North Vancouver' is not a desired prperty if we are looking for 'Vancouver'
*/

SELECT properties.id, title, cost_per_night, AVG(rating) AS average_rating
FROM properties 
LEFT JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE city = 'Vancouver' -- to be converted to a parameter
GROUP BY properties.id
HAVING AVG(rating) >= 4 -- to be converted to a parameter
ORDER BY cost_per_night ASC
LIMIT 10; -- to be converted to a parameter