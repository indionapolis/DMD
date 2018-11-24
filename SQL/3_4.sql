/*
*	Assignment 3,
*	Task 4;
*/
select actions, oid, user, datetime from (
select count(datetime) as actions, oid, car, price, datetime, user from "Order"
where
  user = 'Guitarist' and
  date(datetime) < '2018-08-01'
group by datetime, car
)
where actions > 1