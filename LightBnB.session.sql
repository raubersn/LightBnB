SELECT properties.*, start_date, end_date, AVG(rating) AS average_rating
FROM properties
JOIN reservations ON properties.id = reservations.property_id
LEFT JOIN property_reviews ON reservations.id = property_reviews.reservation_id AND reservations.property_id = property_reviews.property_id AND reservations.guest_id = property_reviews.guest_id
WHERE reservations.guest_id = 2
GROUP BY reservations.id, properties.id
ORDER BY start_date
LIMIT 10;