SELECT city, COUNT(reservations.id) AS total_reservations
FROM reservations
INNER JOIN properties ON property_id = properties.id
GROUP BY city
ORDER BY total_reservations DESC;