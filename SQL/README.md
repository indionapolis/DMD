# Assignment report
Team members:
* Nikulin Pavel
* George Poputnikov
* Elvira Salikhova

## Review

### ERD
![](https://github.com/indionapolis/DMD/blob/master/src/ER.png)
### Schema
![](https://github.com/indionapolis/DMD/blob/master/src/main.png)

## Data Definition

```sql
CREATE TABLE Location
(
    zip INT PRIMARY KEY,
    city VARCHAR(20) NOT NULL,
    country VARCHAR(20) NOT NULL
);


CREATE TABLE User
(
  username VARCHAR(20) PRIMARY KEY,
  full_name VARCHAR(30) NOT NULL,
  email VARCHAR(20) NOT NULL UNIQUE,
  phone INT NOT NULL UNIQUE,
  location INT NOT NULL,
  FOREIGN KEY (location) REFERENCES Location(zip)
);


CREATE TABLE Self_driving_car
(
  cid INTEGER PRIMARY KEY AUTOINCREMENT,
  color VARCHAR(20) NOT NULL,
  type VARCHAR(20) NOT NULL,
  license_plate VARCHAR(10) NOT NULL UNIQUE,
  sshape VARCHAR(20) NOT NULL
);


CREATE TABLE "Order"
(
  oid INTEGER PRIMARY KEY AUTOINCREMENT,
  "from" VARCHAR(30) NOT NULL,
  "to" VARCHAR(30) NOT NULL,
  distance_to_user INT NOT NULL,
  datetime DATETIME NOT NULL,
  trip_duration INT NOT NULL,
  price INT NOT NULL,
  user VARCHAR(20) NOT NULL,
  car INTEGER NOT NULL,
  FOREIGN KEY (user) REFERENCES User(username),
  FOREIGN KEY (car) REFERENCES Self_driving_car(cid)
);


CREATE TABLE Charging_station
(
  uid INTEGER PRIMARY KEY AUTOINCREMENT,
  sockets_available INT NOT NULL,
  price_per_w INT NOT NULL,
  gps_location VARCHAR(30) NOT NULL UNIQUE,
  pshape VARCHAR(20) NOT NULL
);


CREATE TABLE Charge_log
(
  lid INTEGER PRIMARY KEY AUTOINCREMENT,
  datetime DATETIME NOT NULL,
  price INT NOT NULL,
  charge_duration INT NOT NULL,
  station INTEGER NOT NULL,
  car INTEGER NOT NULL,
  FOREIGN KEY (station) REFERENCES Charging_station(uid),
  FOREIGN KEY (car) REFERENCES Self_driving_car(cid)
);


CREATE TABLE Car_part
(
  pid INTEGER PRIMARY KEY AUTOINCREMENT,
  type VARCHAR(50)
);


CREATE TABLE Workshop
(
  wid INTEGER PRIMARY KEY AUTOINCREMENT,
  gps_location VARCHAR(30) NOT NULL UNIQUE
);


CREATE TABLE Repair_log
(
  lid INTEGER PRIMARY KEY AUTOINCREMENT,
  datetime DATETIME NOT NULL,
  repair_duration INT,
  price INT NOT NULL,
  car INTEGER NOT NULL,
  workshop INTEGER NOT NULL,
  FOREIGN KEY (car) REFERENCES Self_driving_car(cid),
  FOREIGN KEY (workshop) REFERENCES Workshop(wid)
);


CREATE TABLE Repair_part_log
(
  lid INTEGER,
  part INTEGER,
  count INT NOT NULL,
  PRIMARY KEY (lid, part),
  FOREIGN KEY (lid) REFERENCES Repair_log(lid),
  FOREIGN KEY (part) REFERENCES Car_part(pid)
);


CREATE TABLE Workshop_part_log
(
  lid INTEGER PRIMARY KEY AUTOINCREMENT,
  workshop INTEGER NOT NULL,
  part INTEGER NOT NULL,
  count INT NOT NULL,
  FOREIGN KEY (workshop) REFERENCES Workshop(wid),
  FOREIGN KEY (part) REFERENCES Car_part(pid)
);


CREATE TABLE Provider
(
  cid INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(20) NOT NULL,
  phone INT NOT NULL,
  location INT NOT NULL,
  street VARCHAR(30) NOT NULL,
  building VARCHAR(30) NOT NULL,
  FOREIGN KEY (location) REFERENCES Location(zip)
);


CREATE TABLE Provider_part_log
(
  lid INTEGER PRIMARY KEY AUTOINCREMENT,
  provider INTEGER NOT NULL,
  part INTEGER NOT NULL,
  count INT NOT NULL,
  FOREIGN KEY (provider) REFERENCES Provider(cid),
  FOREIGN KEY (part) REFERENCES Car_part(pid)
);


CREATE TABLE Part_order
(
  oid INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE NOT NULL,
  count INT NOT NULL,
  price INT NOT NULL,
  workshop INTEGER NOT NULL,
  provider INTEGER NOT NULL,
  part INTEGER NOT NULL,
  FOREIGN KEY (workshop) REFERENCES Workshop(wid),
  FOREIGN KEY (provider) REFERENCES Provider(cid),
  FOREIGN KEY (part) REFERENCES Car_part(pid)
);
```

## Query implementation

### 3.1
```sql
SELECT *
FROM Self_driving_car
WHERE color = 'red' AND license_plate LIKE 'AN%'
```
### 3.2
```sql
SELECT strftime('%H',datetime) || 'h-' || strftime('%H',time(datetime, '+1 hour')) || 'h: ' || count(*) AS OUTPUT
FROM Charge_log
WHERE date(datetime) = ? -- date parameter
GROUP BY strftime('%H',datetime);
```

### 3.3
```sql
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
```

### 3.4
```sql

```

### 3.5
```sql
SELECT CAST("AVG"(distance_to_user) AS INT) AS [Average distance (m)],
       CAST("AVG"(trip_duration) AS INT) AS [Average trip duration (min)]
FROM "Order"
WHERE date(datetime) = ? -- date parameter
```

### 3.6
```sql
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
```

### 3.7
```sql
select car, count(*) as count
from "Order"
where date(datetime) > date('now', '-3 month')
group by car
order by count
limit cast(0.1*(select count(*) from Self_driving_car) as int);
```

### 3.8
```sql
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
```

### 3.9
```sql
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
```

### 3.10
```sql
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
```