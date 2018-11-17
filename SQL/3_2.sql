-- 3.2
SELECT strftime('%H',datetime) || 'h-' || strftime('%H',time(datetime, '+1 hour')) || 'h: ' || count(*) AS OUTPUT
FROM Charge_log
WHERE date(datetime) = ?
GROUP BY strftime('%H',datetime);