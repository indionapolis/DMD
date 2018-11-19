/*
*	Assignment 3,
*	Task 10;
*/
select type
from
  (
	select type, avg(C.price) + avg(R.price) as avg_price
	from Self_driving_car
    inner join Repair_log R on Self_driving_car.cid = R.car
    inner join Charge_log C on Self_driving_car.cid = C.car
    group by type
    order by avg_price desc
  )
limit 1