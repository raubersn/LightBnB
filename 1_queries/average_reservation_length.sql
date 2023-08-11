/*
Selects the average duration of all of the reservations
*/

SELECT AVG(end_date - start_date) AS average_duration
FROM reservations;