/*
* Assignment 3,
* Task 8;
*/
select user, sum(C) as amount from
  (
    select * from "Order"
    inner join
      (
        select count(car) as C, car, datetime as dt from Charge_log
        group by strftime('%m %d', datetime), car
        order by datetime and car asc
      ) as C
    on (strftime('%m %d', dt) = strftime('%m %d', datetime))
    where date(datetime) >= ? & date(datetime) <= date(?, '+1 month')
    group by strftime('%m %d', dt)
  )
group by user;