SELECT reservations.id, title, start_date, cost_per_night, AVG(rating) AS average_rating
FROM properties
JOIN reservations ON properties.id = reservations.property_id
LEFT JOIN property_reviews ON reservations.id = property_reviews.reservation_id AND reservations.property_id = property_reviews.property_id AND reservations.guest_id = property_reviews.guest_id
WHERE reservations.guest_id = 1
GROUP BY reservations.id, properties.id
ORDER BY start_date
LIMIT 10;

/*
SELECT reservations.id, property_reviews.reservation_id, property_reviews.guest_id, title, start_date, cost_per_night, rating--AVG(rating) AS average_rating
FROM properties
JOIN reservations ON properties.id = reservations.property_id
--LEFT JOIN property_reviews ON reservations.id = property_reviews.reservation_id AND reservations.property_id = property_reviews.property_id AND reservations.guest_id = property_reviews.guest_id
JOIN property_reviews ON reservations.property_id = property_reviews.property_id
WHERE reservations.guest_id = 1
--GROUP BY reservations.id, properties.id
ORDER BY start_date
LIMIT 10;
*/