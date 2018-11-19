/*
*	Assignment 3,
*	Task 9;
*
* P.S: we divide maximum by 4.289 because it is
* how many weeks are in month.
*/
select workshop, cast(max(C) / 4.289 as int) as average, T as part
from
  (
    select type as T, count(type) as C, *
    from Repair_log
    inner join Repair_part_log Rpl on Repair_log.lid = Rpl.lid
    inner join Car_part Cp on Rpl.part = Cp.pid
    group by type, workshop
    order by workshop asc
  )
group by workshop