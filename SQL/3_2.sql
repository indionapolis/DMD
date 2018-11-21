-- 3.2
-- Given a date, compute how many sockets were occupied each hour.
SELECT strftime('%H',datetime) || 'h-' || strftime('%H',time(datetime, '+1 hour')) || 'h: ' || count(*) AS OUTPUT
FROM Charge_log
WHERE date(datetime) = ? -- date parameter
GROUP BY strftime('%H',datetime);