-- 3.7
select car, count(*) as count
from "Order"
where date(datetime) > date('now', '-3 month')
group by car
order by count
limit cast(0.1*(select count(*) from Self_driving_car) as int);