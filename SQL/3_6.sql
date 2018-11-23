-- 3.6
select tipe, time, location
from (
    select * from (
        select 'pick-up' as tipe, 'Morning' as time, "from" as location, 1 as ord
        from "Order"
        where time(datetime) >= time('07:00') and time(datetime) <= time('10:00')
        group by 3
        order by count(*) desc
        limit 3
    )
    union
    select * from (
        select 'pick-up' as tipe, 'Afternoon' as time, "from" as location, 2 as ord
        from "Order"
        where time(datetime) >= time('12:00') and time(datetime) <= time('14:00')
        group by 3
        order by count(*) desc
        limit 3
    )
    union
    select * from (
        select 'pick-up' as tipe, 'Evening' as time, "from" as location, 3 as ord
        from "Order"
        where time(datetime) >= time('17:00') and time(datetime) <= time('19:00')
        group by 3
        order by count(*) desc
        limit 3
    )
    union
    select * from (
        select 'destination' as tipe, 'Morning' as time, "to" as location, 1 as ord
        from "Order"
        where time(datetime) >= time('07:00') and time(datetime) <= time('10:00')
        group by 3
        order by count(*) desc
        limit 3
    )
    union
    select * from (
        select 'destination' as tipe, 'Afternoon' as time, "to" as location, 2 as ord
        from "Order"
        where time(datetime) >= time('12:00') and time(datetime) <= time('14:00')
        group by 3
        order by count(*) desc
        limit 3
    )
    union
    select * from (
        select 'destination' as tipe, 'Evening' as time, "to" as location, 3 as ord
        from "Order"
        where time(datetime) >= time('17:00') and time(datetime) <= time('19:00')
        group by 3
        order by count(*) desc
        limit 3
    )
    order by ord
);