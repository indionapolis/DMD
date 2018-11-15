import random
import sqlite3


# path = b'D:\Assignment3.sqlite'
# Connect to database
path = '/Users/Pavel/programs/DMD/Assignment3.sqlite'

connection = sqlite3.connect(path)

c = connection.cursor()

# Constants declaration

# Number of records
N = 30
# Number of orders
O_N = 100

# Cities
cities = ["Innopolis", "Kazan"]

places = {'Dorm', 'University', 'Medicalcenter', 'IT Park', 'Supermarket', 'School'}

# Usernames
usernames = ['Aboutilbore', 'Alignaf', 'Annamilla', 'Apetasysl', 'CraziismalDicliba', 'Doggjobsjo', 'Echarrist',
              'EpicGlamour', 'ExpertNozy', 'Exxcell', 'Faaserwe', 'FlyInside',
              'Friediant', 'FunkKaptain', 'Gigamphoop', 'GiveWzyCaptain', 'GodzillaPac', 'GoobleSupreme',
              'Guitarist', 'Guitariston', 'Hannaholat', 'Infamousti', 'Instfors', 'Intergi', 'ThegaStories',
              'ThePhat', 'Timesnticeo', 'Underns', 'Unifilm', 'Unlimitedit']

full_names = ["Wylie Bailey", "Joelle Perry", "Brian Hendricks", "Beatrice Kirkland", "Tatyana Maddox",
                   "Ross Burnett", "Nevada Solomon",
                   "Solomon Mcintyre", "Erich Richmond", "Craig Richards""Fatima Dunn", "Chandler Coffey",
                   "Ulla Garrison", "Felicia White", "Hoyt Robinson",
                   "Jelani Simon", "Adrienne Wilkerson", "Jordan Perkins", "Christen Fox", "James Snow", "Conan King",
                   "Cassandra Mendoza",
              "Lynn Lara", "Hilel Obrien", "Blossom Calderon", "Sydnee Mckinney", "Mason Flynn", "Cruz Kelley",
                   "Odysseus Morrow", "Hayfa Battle", "Rylee Johns"]
# set of all zips
zip_all = list(set(random.randint(100000, 999999) for i in range(3*N)))[:N]

# set of car ids
cid_all = [i for i in range(1, N+1)]

# set of all colours
colors = ["white", "red", "blue", "orange", "pink", "yellow", "black", "green", "brown", "grey"]

types_of_car = ["A", "B", "C", "D"]

# set of all charge stations
uid_all = [i for i in range(1, N+1)]

car_parts = ['Car seat', 'Doors', 'Exhaust system', 'Transmission system',
             'Electrical supply system', 'Electrical switches', 'Wiring harnesses', 'Windows',
             'Air conditioning system (A/C)']

# set of part ids
pid_all = [i for i in range(1, len(car_parts)+1)]

# set of workshop ids
wid_all = [i for i in range(1, N+1)]

# set of repair log ids
lid_rep_all = [i for i in range(1, N*10+1)]

# set of provider ids
prid_all = [i for i in range(1, N+1)]


def get_datatime():
    from random import randint as ri
    if ri(0, 1):
        if ri(0, 1):
            datetime = '2018-0{0}-0{1} 0{2}:{3}'.format(ri(6, 9), ri(1, 9), ri(0, 9), ri(10, 59))
        else:
            datetime = '2018-0{0}-{1} {2}:{3}'.format(ri(6, 9), ri(10, 28), ri(10, 23), ri(10, 59))
    else:
        if ri(0, 1):
            datetime = '2018-0{0}-0{1} 0{2}:{3}'.format(ri(6, 9), ri(1, 9), ri(0, 9), ri(10, 59))
        else:
            datetime = '2018-0{0}-{1} {2}:{3}'.format(ri(6, 9), ri(10, 28), ri(10, 23), ri(10, 59))

    return datetime


# Create random locations
for zip in zip_all:
    city = random.choice(cities)
    c.execute("INSERT INTO Location VALUES (?,?,?)", (zip, city, "Russia"))

# Create random user
for i, username in enumerate(usernames):
    full_name = full_names[i]
    email = str(username) + "@dmd.com"
    location = random.choice(zip_all)
    phone = random.randint(10000000000, 99999999999)
    c.execute("INSERT INTO User VALUES (?,?,?,?,?)", (username, full_name, email, phone, location))

# Create random cars
for i in cid_all:
    color = random.choice(colors)
    type = random.choice(types_of_car)
    license_plate = chr(random.randint(65, 90)) + str(random.randint(1000, 9999))
    sshape = random.randint(1, 4)
    c.execute("INSERT INTO Self_driving_car VALUES (?,?,?,?,?)", (i, color, type, license_plate, sshape))

# Create random order
for i in range(O_N):
    fromm = random.choice(list(places))
    to = random.choice(list(places.difference({fromm})))
    distance_to_user = random.randint(100, 30000)
    datetime = get_datatime()
    trip_duration = random.randint(10, 150)
    price = trip_duration * 10
    user = random.choice(usernames)
    car = random.choice(cid_all)
    c.execute("INSERT INTO \"Order\" VALUES (?,?,?,?,?,?,?,?,?)",(i+1, fromm, to, distance_to_user, datetime, trip_duration, price, user, car))

# Create random Charging station
for i in uid_all:
    sockets_available = random.randint(1, 16)
    price_per_w = random.randint(1, 50)
    gps_location = str(random.randint(0, 90)) + "E" + str(random.randint(0, 90)) + "/" + str(
        random.randint(0, 90)) + "N" + str(random.randint(0, 90))
    pshape = random.randint(1, 4)
    c.execute("INSERT INTO Charging_station VALUES (?,?,?,?,?)", (i, sockets_available, price_per_w, gps_location, pshape))

# Create charge log
for i in range(N*20):
    datetime = get_datatime()
    price = random.randint(1, 200)
    charge_duration = random.randint(5, 200)
    station = random.choice(uid_all)
    car = random.choice(cid_all)
    c.execute("INSERT INTO Charge_log VALUES (?,?,?,?,?,?)", (i+1, datetime, price, charge_duration, station, car))

# Create car parts
for i, type in enumerate(car_parts):
    c.execute("INSERT INTO Car_part VALUES (?,?)", (i+1, type))


# Create Workshop
for i in range(N):
    gps_location = str(random.randint(0, 90)) + "E" + str(random.randint(0, 90)) + "/" + str(
        random.randint(0, 90)) + "N" + str(random.randint(0, 90))
    c.execute("INSERT INTO Workshop VALUES (?,?)", (i+1, gps_location))

# Create Repair log
for i in lid_rep_all:
    datetime = get_datatime()
    repair_duration = random.randint(1, 1000)
    price = random.randint(1, 200)
    car = random.choice(cid_all)
    workshop = random.choice(wid_all)
    c.execute("INSERT INTO Repair_log VALUES (?,?,?,?,?,?)", (i, datetime, repair_duration, price, car, workshop))

# Create Repair part log
for i in range(N*2):
    lid = random.choice(lid_rep_all)
    part = random.choice(pid_all)
    count = random.randint(1, 20)
    c.execute("INSERT INTO Repair_part_log VALUES (?,?,?)", (lid, part, count))

# Create random set of parts for Workshop
n = 1
for i in wid_all:
    for j in pid_all:
        count = random.randint(1, 100)
        c.execute("INSERT INTO Workshop_part_log VALUES (?,?,?,?)", (n, i, j, count))
        n += 1

# Create random providers
for i in range(N):
    name_pr = ["Zahir Stein", "Aline Shepard", "April Caldwell", "Hoyt Stout", "Idola Bright", "Perry Houston",
               "Hoyt Booth", "Nigel Lynch", "Hanna Rose", "Inez Langley", "Bree Skinner", "Maile Little",
               "Shelby Massey", "Andrew Douglas", "Merritt Gould", "Talon Logan", "Hiram Stanton", "Quamar Bell",
               "Hiram Bradford", "Bernard Forbes", "Kadeem West", "Tanek Good", "Sade Underwood", "Geoffrey Gray",
               "Cheryl Obrien", "Dylan Fisher", "Carlos Bender", "Ezekiel Hays", "Kaitlin Kemp", "Rudyard Ferguson"]
    name = name_pr[i]
    phone = "8" + str(random.randint(1000000000, 9999999999))
    location = random.choice(zip_all)
    strret_pr = ["228-8824 Nullam St.", "177-9813 Scelerisque Road", "Ap #828-4970 Enim. Street",
                 "Ap #783-7401 Ipsum St.", "P.O. Box 175, 2364 Consectetuer Av.", "8144 Interdum. Rd.",
                 "344-6024 Risus. Rd.", "2141 Metus Street", "Ap #471-8972 Cursus Ave", "9893 Morbi Avenue",
                 "398-9805 Ipsum Road", "823-9214 Nibh. St.", "P.O. Box 984, 7443 Eu St.",
                 "P.O. Box 520, 4277 Enim. St.", "9297 Non Rd.", "Ap #688-3585 Elit Avenue", "Ap #129-1406 Non St.",
                 "404-3938 Eros St.", "P.O. Box 806, 8135 Cras Street", "Ap #523-2801 Bibendum St.",
                 "233-5484 Ullamcorper. Av.", "569 Vestibulum, St.", "7833 Lorem. Rd.", "P.O. Box 515, 4874 Mollis St.",
                 "P.O. Box 560, 4603 Ultricies St.", "5879 Eu Ave", "Ap #405-6456 Quis Av.",
                 "P.O. Box 896, 8923 Est, Av.", "P.O. Box 433, 7557 Faucibus Rd.", "Ap #945-9375 Vel, Rd."]
    street = strret_pr[i]
    building = random.randint(1, 100)
    c.execute("INSERT INTO Provider VALUES (?,?,?,?,?,?)", (i+1,name,phone,location,street,building))

# Create random set of parts for Provider
n = 1
for i in prid_all:
    for j in range(len(car_parts)):
        type = car_parts[j]
        count = random.randint(1, 100)
        c.execute("INSERT INTO Provider_part_log VALUES (?,?,?,?)", (n, i, j, count))
        n += 1

# Create Part order
for i in range(O_N):
    date = get_datatime().split(' ')[0]
    count = random.randint(1, 100)
    price = random.randint(1, 200)
    workshop = random.choice(wid_all)
    provider = random.choice(prid_all)
    part = random.choice(pid_all)
    c.execute("INSERT INTO Part_order VALUES (?,?,?,?,?,?,?)", (i+1, date, count, price, workshop, provider, part))

connection.commit()
