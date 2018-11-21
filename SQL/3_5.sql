-- 3.5
SELECT CAST("AVG"(distance_to_user) AS INT) AS [Average distance (m)],
       CAST("AVG"(trip_duration) AS INT) AS [Average trip duration (min)]
FROM "Order"
WHERE date(datetime) = ? -- date parameter