SELECT CAST("AVG"(distance_to_user) AS INT) AS Average_distance, CAST("AVG"(trip_duration) AS INT) AS Average_trip_duration
FROM "Order"
WHERE date(datetime) = ?