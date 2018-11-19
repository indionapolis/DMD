/*
* Assignment 3,
* Task 8;
*/
select user, sum(C) as amount from
  (
    select * from "Order"
    inner join
      (
        select count(car) as C, car, datetime as date from Charge_log
        group by strftime('%m %d', datetime), car
        order by datetime and car asc
      )
    on (strftime('%m %d', date) = strftime('%m %d', "Order".datetime))
    group by strftime('%m %d', date)
  )
group by user;