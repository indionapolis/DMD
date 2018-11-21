-- 3.3
-- Using "Order" we check how many cars were occupied during the time intervals
SELECT CAST(ROUND(CAST(SUM(Morning)*100 AS float)/(SELECT CAST(COUNT(*) AS float) FROM Self_driving_car))AS int) AS Morning,
       CAST(ROUND(CAST(SUM(Afternoon)*100 AS float)/(SELECT CAST(COUNT(*) AS float) FROM Self_driving_car))AS int) AS Afternoon,
       CAST(ROUND(CAST(SUM(Evening)*100 AS float)/(SELECT CAST(COUNT(*) AS float) FROM Self_driving_car))AS int) AS Evening
FROM (SELECT car, MAX(CASE WHEN
    (
          (
--              M			    A		      E
--            <====>		<====>		<====>
--               <———>
--               order
              time(datetime) >= time('07:00') and
              time(datetime) <= time('10:00')
          )
            or
          (
--              M			    A		      E
--            <====>		<====>		<====>
--         <———>
--         order
              time(datetime, '+% minute' % trip_duration) >= time('07:00') and
              time(datetime, '+% minute' % trip_duration) <= time('10:00')
          )
            or
          (
--              M			    A		      E
--            <====>		<====>		<====>
--        <———————————>
--            order
              time(datetime) <= time('07:00') and
              time(datetime, '+% minute' % trip_duration) >= time('10:00')
          )
      ) THEN 1 ELSE 0 END) AS Morning,
    MAX(CASE WHEN
    (
          (
              time(datetime) >= time('12:00') and
              time(datetime) <= time('14:00')
          )
            or
          (
              time(datetime, '+% minute' % trip_duration) >= time('12:00') and
              time(datetime, '+% minute' % trip_duration) <= time('14:00')
          )
            or
          (
              time(datetime) <= time('12:00') and
              time(datetime, '+% minute' % trip_duration) >= time('14:00')
          )
      ) THEN 1 ELSE 0 END) AS Afternoon,
    MAX(CASE WHEN
    (
          (
              time(datetime) >= time('17:00') and
              time(datetime) <= time('19:00')
          )
            or
          (
              time(datetime, '+% minute' % trip_duration) >= time('17:00') and
              time(datetime, '+% minute' % trip_duration) <= time('19:00')
          )
            or
          (
              time(datetime) <= time('17:00') and
              time(datetime, '+% minute' % trip_duration) >= time('19:00')
          )
      ) THEN 1 ELSE 0 END) AS Evening
FROM "Order"
WHERE date(datetime) >= date(?) and -- date parameter
      date(datetime) < date(?, '+7 day') -- date parameter
GROUP BY car);