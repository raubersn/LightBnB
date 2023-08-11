
/*
Selects all of the reservations of a particular user

The query presents changes when compared to the proposed solution:
It's used a LEFT JOIN instead of an INNER JOIN with property_reviews, once the desired result is all of my reservations, whether they have reviews or not
2. Extra fields were used on the join to assure data integrity. The foreign keys present on property_reviews are independent thus this step is necessary. 
2.1 To prove it, if we run the query below (the proposed solution including the reservation id from both tables) we can confirm they don't match. 
      SELECT reservations.id, property_reviews.reservation_id, property_reviews.guest_id, title, start_date, cost_per_night, rating --AVG(rating) AS average_rating //removed to allow the inclusion of property_reviews.reservation_id on the SELECT clause
      FROM properties
      JOIN reservations ON properties.id = reservations.property_id
      JOIN property_reviews ON reservations.property_id = property_reviews.property_id
      WHERE reservations.guest_id = 1
      --GROUP BY reservations.id, properties.id //removed to allow the inclusion of property_reviews.reservation_id on the SELECT clause
      ORDER BY start_date
      LIMIT 10;
*/

SELECT reservations.id, title, start_date, cost_per_night, AVG(rating) AS average_rating
FROM properties
JOIN reservations ON properties.id = reservations.property_id
LEFT JOIN property_reviews ON reservations.id = property_reviews.reservation_id AND reservations.property_id = property_reviews.property_id AND reservations.guest_id = property_reviews.guest_id
WHERE reservations.guest_id = 1 -- to be converted to a parameter
GROUP BY reservations.id, properties.id
ORDER BY start_date
LIMIT 10; -- to be converted to a parameter
