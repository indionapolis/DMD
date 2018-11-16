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