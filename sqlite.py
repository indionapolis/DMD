import random
import sqlite3

path = b'D:\Assignment3.sqlite'

connection = sqlite3.connect(path)

c = connection.cursor()
zip_all = []
for i in range(30):
    zip = random.randint(100000, 999999)
    zip_all.append(zip)
    city_2 = ["Innopolis", "Kazan"]
    city = random.choice(city_2)
    c.execute("INSERT INTO Location VALUES (?,?,?)", (zip, city, "Russia"))

username_all = []
for i in range(30):
    username_2 = ['Aboutilbore', 'Alignaf', 'Annamilla', 'Apetasysl', 'CraziismalDicliba', 'Doggjobsjo', 'Echarrist',
                  'EpicGlamour', 'ExpertNozy', 'Exxcell', 'Faaserwe', 'FlyInside',
                  'Friediant', 'FunkKaptain', 'Gigamphoop', 'GiveWzyCaptain', 'GodzillaPac', 'GoobleSupreme',
                  'Guitarist', 'Guitariston', 'Hannaholat', 'Infamousti', 'Instfors', 'Intergi', 'ThegaStories',
                  'ThePhat', 'Timesnticeo', 'Underns', 'Unifilm', 'Unlimitedit']
    username = username_2[i]
    username_all.append(username)
    full_name_2 = ["Wylie Bailey", "Joelle Perry", "Brian Hendricks", "Beatrice Kirkland", "Tatyana Maddox",
                   "Ross Burnett", "Nevada Solomon",
                   "Solomon Mcintyre", "Erich Richmond", "Craig Richards""Fatima Dunn", "Chandler Coffey",
                   "Ulla Garrison", "Felicia White", "Hoyt Robinson",
                   "Jelani Simon", "Adrienne Wilkerson", "Jordan Perkins", "Christen Fox", "James Snow", "Conan King",
                   "Cassandra Mendoza",
                   "Lynn Lara", "Hilel Obrien", "Blossom Calderon", "Sydnee Mckinney", "Mason Flynn", "Cruz Kelley",
                   "Odysseus Morrow", "Hayfa Battle", "Rylee Johns"]

    full_name = full_name_2[i]
    email = str(username) + "@dmd.com"
    location = random.choice(zip_all)
    phone = random.randint(10000000000, 99999999999)
    c.execute("INSERT INTO User VALUES (?,?,?,?,?)", (username, full_name, email, phone, location))

cid_all = []
for i in range(30):
    cid = random.randint(10000, 99999)
    cid_all.append(cid)
    color_2 = ["white", "red", "blue", "orange", "pink", "yellow", "black", "green", "brown", "grey"]
    color = random.choice(color_2)
    type_2 = ["A", "B", "C", "D"]
    type = random.choice(type_2)
    license_plate = chr(random.randint(65, 90)) + str(random.randint(1000, 9999))
    sshape = random.randint(1, 4)
    c.execute("INSERT INTO Self_driving_car VALUES (?,?,?,?,?)", (cid, color, type, license_plate, sshape))

for i in range(30):
    oid = random.randint(10000, 99999)
    fromm = random.choice(["Kazan", "Innopolis"])
    to = random.choice(["Kazan", "Innopolis"])
    distance_to_user = random.randint(100, 30000)
    datetime = str(random.randint(1, 12)) + random.choice(["AM", "PM"])
    trip_duration = random.randint(1000, 15000)
    price = random.randint(55, 999)
    user = random.choice(username_all)
    car = random.choice(cid_all)
    c.execute("INSERT INTO 'Order' VALUES (?,?,?,?,?,?,?,?,?)",(oid, fromm, to, distance_to_user, datetime, trip_duration, price, user, car))

uid_all = []
for i in range(30):
    uid = random.randint(10000, 99999)
    uid_all.append(uid)
    sockets_available = random.randint(1, 6)
    price_per_w = str(random.randint(1, 50)) + " $"
    gps_location = str(random.randint(0, 90)) + "E" + str(random.randint(0, 90)) + "/" + str(
        random.randint(0, 90)) + "N" + str(random.randint(0, 90))
    pshape = random.randint(1, 4)
    c.execute("INSERT INTO Charging_station VALUES (?,?,?,?,?)", (uid, sockets_available, price_per_w, gps_location, pshape))

lid_all = []
for i in range(30):
    lid = random.randint(10000, 20000)
    lid_all.append(lid)
    datetime = str(random.randint(1, 12)) + random.choice(["AM", "PM"])
    price = str(random.randint(1, 200)) + " $"
    charge_duration = str(random.randint(5, 200)) + " min"
    station = random.choice(uid_all)
    car = random.choice(cid_all)
    c.execute("INSERT INTO Charge_log VALUES (?,?,?,?,?,?)", (lid, datetime, price, charge_duration, station, car))

pid_all = []
for i in range(30):
    pid = random.randint(1000, 9999)
    pid_all.append(pid)
    type = random.choice(["A", "B", "C", "D"])
    c.execute("INSERT INTO Car_part VALUES (?,?)", (pid, type))

wid_all = []
for i in range(30):
    wid = random.randint(10000, 99999)
    wid_all.append(wid)
    gps_location = str(random.randint(0, 90)) + "E" + str(random.randint(0, 90)) + "/" + str(
        random.randint(0, 90)) + "N" + str(random.randint(0, 90))
    c.execute("INSERT INTO Workshop VALUES (?,?)", (wid, gps_location))

lid_rep_all=[]
for i in range(30):
    lid_rep = random.randint(20000, 30000)
    lid_rep_all.append(lid_rep)
    datetime = str(random.randint(1, 12)) + random.choice(["AM", "PM"])
    repair_duration = str(random.randint(1, 1000)) + " min"
    price = str(random.randint(1, 200)) + " $"
    car = random.choice(cid_all)
    workshop = random.choice(wid_all)
    c.execute("INSERT INTO Repair_log VALUES (?,?,?,?,?,?)", (lid_rep,datetime,repair_duration,price,car,workshop ))

for i in range(30):
    lid = random.choice(lid_rep_all)
    part=random.choice(pid_all)
    count = random.randint(1, 200)
    c.execute("INSERT INTO Repair_part_log VALUES (?,?,?)",(lid,part,count))


for i in range(30):
    lid = random.randint(30000, 40000)
    workshop = random.choice(wid_all)
    part = random.choice(pid_all)
    count = random.randint(1, 100)
    c.execute("INSERT INTO Workshop_part_log VALUES (?,?,?,?)", (lid, workshop, part, count))

cid_pr_all = []
for i in range(30):
    cid_pr = random.randint(10000, 99999)
    cid_pr_all.append(cid_pr)
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
    c.execute("INSERT INTO Provider VALUES (?,?,?,?,?,?)", (cid_pr,name,phone,location,street,building))

for i in range(30):
    lid = random.randint(40000, 50000)
    provider = random.choice(cid_pr_all)
    part = random.choice(pid_all)
    count = random.randint(1, 100)
    c.execute("INSERT INTO Provider_part_log VALUES(?,?,?,?)",(lid,provider,part,count))

for i in range(30):
    oid = random.randint(10000, 99999)
    date = str(random.randint(1, 31)) + str(random.choice(
        ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November",
         "December"]))
    count = random.randint(1, 100)
    price = str(random.randint(1, 200)) + " $"
    workshop = random.choice(wid_all)
    provider = random.choice(cid_pr_all)
    part = random.choice(pid_all)
    c.execute("INSERT INTO Part_order VALUES (?,?,?,?,?,?,?)", (oid, date, count, price, workshop, provider, part))

connection.commit()
