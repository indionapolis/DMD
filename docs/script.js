let base_date = "07-01";
let out = [];

const getData = async (id, date) => {
    let d = date === undefined ? "" : `2018-${date}`;
    const q = await fetch(`https://dmd-server-app.herokuapp.com/3_${id.toString()}/${d}`);
    return await q.json();
};

function start_rotate(id) {
    let el = document.getElementById(`content${id}`);
    let e = document.getElementById(`back${id}`);
    e.style.transform = "rotateY(0deg)";
    el.style.transform = "rotateY(180deg)";
}

function end_rotate(id) {
    let el = document.getElementById(`content${id}`);
    let e = document.getElementById(`back${id}`);
    e.style.transform = "rotateY(180deg)";
    el.style.transform = "rotateY(0deg)";
}
// init all

for (let i = 1; i < 11; ++i) {
    // generate card and content
    new Promise((resolve) => {
        // render card
        let input, output;
        output =
            `
            <div style="display: inline-block; font-weight: bold; margin-bottom: 7px;">Output</div>:
            <div id="${i}" style="width: 200px;"></div>
        `;
        if (i === 2 || i === 3 || i === 5 || i === 8) {
            input =
                `
                <div style="display: inline-block; font-weight: bold">Input</div> 
                <div style="display: inline-block;font-size: 11px; color: #828282;">(2018-07-01 - 2018-09-31)</div>:<br>
                <div>
                    2018
                    / <input type="text" maxlength="2" minlength="2" datatype="number" title="Scroll this or change value manually" class="text scrollable" id="mm${i}" placeholder="mm" value="07">
                    / <input type="text" maxlength="2" minlength="2" title="Scroll this or change value manually" class="text scrollable" id="dd${i}" placeholder="dd" value="01">
                </div>
            `;
        }
        else if (i === 9) {
            input =
                `
                    <div style="display: inline-block; font-weight: bold;">Input</div>:
                    <div style="width: 100%; margin-bottom: 10px; margin-top: 6px;">
                        Workshop statistics on parts being used
                    </div>
                `;
        }
        else if (i === 10) {
            input =
                `
                    <div style="display: inline-block; font-weight: bold">Input</div>:
                    <div style="width: 100%; margin-bottom: 10px; margin-top: 6px;">
                        Cost of repairs and charging of cars
                    </div>
                `;
        }
        else if (i === 6) {
            input =
                `
                    <div style="display: inline-block; font-weight: bold">Input</div>:
                    <div style="width: 100%; margin-bottom: 10px; margin-top: 6px;">
                        Information about car travellings and the places
                    </div>
                `;
        }
        else if (i === 7) {
            input =
                `
                    <div style="display: inline-block; font-weight: bold">Input</div>:
                    <div style="width: 100%; margin-bottom: 10px; margin-top: 6px;">
                        Order statistics
                    </div>
                `;
        }
        else if (i === 1) {
            input =
                `
                    <div style="display: inline-block; font-weight: bold">Input</div>:
                    <div style="width: 100%; margin-bottom: 10px; margin-top: 6px;">
                        Information about all cars
                    </div>
                `;
        }
        else {
            input = "elvirka privet)))))))";
            output = "";
        }

        let code = "";
        switch (i) {
            case 1: code = `SELECT *\nFROM Self_driving_car\nWHERE color = 'red' AND license_plate LIKE 'AN%'`; break;
            case 2: code = `SELECT strftime('%H',datetime) || 'h-' || strftime('%H',time(datetime, '+1 hour')) || 'h: ' || count(*) AS OUTPUT\nFROM Charge_log\nWHERE date(datetime) = ? -- date parameter\nGROUP BY strftime('%H',datetime)`; break;
            case 3: code = `SELECT CAST(ROUND(CAST(SUM(Morning)*100 AS float)/(SELECT CAST(COUNT(*) AS float) FROM Self_driving_car))AS int) AS Morning,\nCAST(ROUND(CAST(SUM(Afternoon)*100 AS float)/(SELECT CAST(COUNT(*) AS float) FROM Self_driving_car))AS int) AS Afternoon,\nCAST(ROUND(CAST(SUM(Evening)*100 AS float)/(SELECT CAST(COUNT(*) AS float) FROM Self_driving_car))AS int) AS Evening\nFROM (SELECT car, MAX(CASE WHEN\n(\n(\ntime(datetime) >= time('07:00') and\ntime(datetime) <= time('10:00')\n)\nor\n(\ntime(datetime, '+% minute' % trip_duration) >= time('07:00') and\ntime(datetime, '+% minute' % trip_duration) <= time('10:00')\n)\nor\n(\ntime(datetime) <= time('07:00') and\ntime(datetime, '+% minute' % trip_duration) >= time('10:00')\n)\n) THEN 1 ELSE 0 END) AS Morning,\nMAX(CASE WHEN\n(\n(\ntime(datetime) >= time('12:00') and\ntime(datetime) <= time('14:00')\n)\nor\n(\ntime(datetime, '+% minute' % trip_duration) >= time('12:00') and\ntime(datetime, '+% minute' % trip_duration) <= time('14:00')\n)\nor\n(\ntime(datetime) <= time('12:00') and\ntime(datetime, '+% minute' % trip_duration) >= time('14:00')\n)\n) THEN 1 ELSE 0 END) AS Afternoon,\nMAX(CASE WHEN\n(\n(\ntime(datetime) >= time('17:00') and\ntime(datetime) <= time('19:00')\n)\nor\n(\ntime(datetime, '+% minute' % trip_duration) >= time('17:00') and\ntime(datetime, '+% minute' % trip_duration) <= time('19:00')\n)\nor\n(\ntime(datetime) <= time('17:00') and\ntime(datetime, '+% minute' % trip_duration) >= time('19:00')\n)\n) THEN 1 ELSE 0 END) AS Evening\nFROM "Order"\nWHERE date(datetime) >= date(?) and -- date parameter\ndate(datetime) < date(?, '+7 day') -- date parameter\nGROUP BY car)`; break;
            case 4: code = ""; break;
            case 5: code = `SELECT CAST("AVG"(distance_to_user) AS INT) AS [Average distance (m)],\nCAST("AVG"(trip_duration) AS INT) AS [Average trip duration (min)]\nFROM "Order"\nWHERE date(datetime) = ?`; break;
            case 6: code = `select tipe, time, location\nfrom (\nselect * from (\nselect 'pick-up' as tipe, 'Morning' as time, "from" as location, 1 as ord\nfrom "Order"\nwhere time(datetime) >= time('07:00') and time(datetime) <= time('10:00')\ngroup by 3\norder by count(*) desc\nlimit 3\n)\nunion\nselect * from (\nselect 'pick-up' as tipe, 'Afternoon' as time, "from" as location, 2 as ord\nfrom "Order"\nwhere time(datetime) >= time('12:00') and time(datetime) <= time('14:00')\ngroup by 3\norder by count(*) desc\nlimit 3\n)\nunion\nselect * from (\nselect 'pick-up' as tipe, 'Evening' as time, "from" as location, 3 as ord\nfrom "Order"\nwhere time(datetime) >= time('17:00') and time(datetime) <= time('19:00')\ngroup by 3\norder by count(*) desc\nlimit 3\n)\nunion\nselect * from (\nselect 'destination' as tipe, 'Morning' as time, "to" as location, 1 as ord\nfrom "Order"\nwhere time(datetime) >= time('07:00') and time(datetime) <= time('10:00')\ngroup by 3\norder by count(*) desc\nlimit 3\n)\nunion\nselect * from (\nselect 'destination' as tipe, 'Afternoon' as time, "to" as location, 2 as ord\nfrom "Order"\nwhere time(datetime) >= time('12:00') and time(datetime) <= time('14:00')\ngroup by 3\norder by count(*) desc\nlimit 3\n)\nunion\nselect * from (\nselect 'destination' as tipe, 'Evening' as time, "to" as location, 3 as ord\nfrom "Order"\nwhere time(datetime) >= time('17:00') and time(datetime) <= time('19:00')\ngroup by 3\norder by count(*) desc\nlimit 3\n)\norder by ord\n)`; break;
            case 7: code = `select car, count(*) as count\nfrom "Order"\nwhere date(datetime) > date('now', '-3 month')\ngroup by car\norder by count\nlimit cast(0.1*(select count(*) from Self_driving_car) as int)`; break;
            case 8: code = `select user, sum(C) as amount from\n(\nselect * from "Order"\ninner join\n(\nselect count(car) as C, car, datetime as dt from Charge_log\ngroup by strftime('%m %d', datetime), car\norder by datetime and car asc\n) as C\non (strftime('%m %d', dt) = strftime('%m %d', datetime))\nwhere date(datetime) >= ? & date(datetime) <= date(?, '+1 month')\ngroup by strftime('%m %d', dt)\n)\ngroup by user;`; break;
            case 9: code = `select workshop, cast(max(C) / 4.289 as int) as average, T as part\nfrom\n(\nselect type as T, count(type) as C, *\nfrom Repair_log\ninner join Repair_part_log Rpl on Repair_log.lid = Rpl.lid\ninner join Car_part Cp on Rpl.part = Cp.pid\ngroup by type, workshop\norder by workshop asc\n)\ngroup by workshop`; break;
            case 10: code = `select type\nfrom\n(\nselect type, avg(C.price) + avg(R.price) as avg_price\nfrom Self_driving_car\ninner join Repair_log R on Self_driving_car.cid = R.car\ninner join Charge_log C on Self_driving_car.cid = C.car\ngroup by type\norder by avg_price desc\n)\nlimit 1`; break;
        }
        code = code
            .split("\n")
            .map(d => d
                .replace(/((select)|(from)|(where)|(and)|(group by)|( as )|(limit)|(union)|(order by)|(SELECT)|(FROM)|(WHERE)|(AND)|(GROUP BY)|( AS )|(LIMIT)|(UNION)|(ORDER BY)|( = )|( != )|( >= )|( <= )|(\*))/g, '<div class="red">$1</div>')
            )
            .map((d, index) => `
                                <div class="code">
                                    <div class="code_index" data-pseudo-content="${index + 1}">
                                        
                                    </div>
                                    <div style="display: inline-block; margin-left: 20px;">
                                        ${d}
                                    </div>
                                </div>`)
            .join("");

        document.getElementById('apocalypse').innerHTML =
            `
            ${document.getElementById('apocalypse').innerHTML}
            <div id="in${i}" class="card rounded" style="position: relative;">
                <div id="content${i}" class="content rounded animated">
                    <h1 style="margin-bottom: 10px">Query 3.${i}</h1>
                    <div onclick="start_rotate('${i}')" style="position: absolute; right: 15px; top: 17px;font-size: 10px; color: #3657ae">Show code</div>
                    ${input}
                    ${output}
                </div>
                <div id="back${i}" class="card_back rounded animated">
                    <div style="font-weight: bold;">Code:</div>
                    <div onclick="end_rotate('${i}')" style="position: fixed; right: 15px; top: 17px;font-size: 10px; color: #3657ae">close</div>
                    ${code}
                </div>
            </div>
        `;
        // returns info that promise is handled
        resolve();
    }).then(() => {
        // generate outer content
        out = [...out, document.getElementById(i.toString())];

        out[i - 1].innerHTML = "<img style=\"height: 20px; width: 20px;margin-top:7px;\" src=\"WaitCover.gif\">";

        if (i === 2 || i === 3 || i === 5 || i === 8) {
            if (i === 2)
                getData(i, `${base_date}`).then((d) => out[i - 1].innerHTML = d["OUTPUT"].map(q => `<div style="width: 100%">${q}</div>`).join(""));
            else if (i === 8)
                getData(i, `${base_date}`).then((d) => {
                    out[i - 1].innerHTML = '';
                    for (let x = 0; x < d['user'].length; ++x)
                        out[i - 1].innerHTML = `${out[i - 1].innerHTML}<div style="width: 100%">${d['user'][x]}: ${d['amount'][x]}</div>`
                });
            else
                getData(i, `${base_date}`).then((d) => out[i - 1].innerHTML = Object.keys(d).map(q => `<div style="width: 100%">${q}: ${d[q][0]}</div>`).join(""));

            document.getElementById(`mm${i}`).onchange = () => {
                out[i - 1].innerHTML = "<img style=\"height: 20px; width: 20px;margin-top:7px;\" src=\"WaitCover.gif\">";
                if (!isNaN(document.getElementById(`mm${i}`).value)) {
                    let idate = Number(document.getElementById(`mm${i}`).value).toString();
                    if (idate < 10) {
                        idate = "0" + idate;
                        document.getElementById(`mm${i}`).value = idate;
                    }
                    if (Number(document.getElementById(`mm${i}`).value) < 7) {
                        idate = "07";
                        document.getElementById(`mm${i}`).value = idate;
                    }
                    if (Number(document.getElementById(`mm${i}`).value) > 9) {
                        idate = "09";
                        document.getElementById(`mm${i}`).value = idate;
                    }
                    if (i === 2)
                        getData(i, `${idate}-${document.getElementById(`dd${i}`).value}`).then((d) => out[i - 1].innerHTML = d["OUTPUT"].map(q => `<div style="width: 100%">${q}</div>`).join(""));
                    else if (i === 8)
                        getData(i, `${base_date}`).then((d) => {
                            out[i - 1].innerHTML = '';
                            for (let x = 0; x < d['user'].length; ++x)
                                out[i - 1].innerHTML = `${out[i - 1].innerHTML}<div style="width: 100%">${d['user'][x]}: ${d['amount'][x]}</div>`
                        });
                    else
                        getData(i, `${idate}-${document.getElementById(`dd${i}`).value}`).then((d) => out[i - 1].innerHTML = Object.keys(d).map(q => `<div style="width: 100%">${q}: ${d[q][0]}</div>`).join(""));
                }
            };

            document.getElementById(`dd${i}`).onchange = () => {
                out[i - 1].innerHTML = "<img style=\"height: 20px; width: 20px;margin-top:7px;\" src=\"WaitCover.gif\">";
                if (!isNaN(document.getElementById(`dd${i}`).value)) {
                    let idate = Number(document.getElementById(`dd${i}`).value).toString();
                    if (idate < 10) {
                        idate = "0" + idate;
                        document.getElementById(`dd${i}`).value = idate;
                    }
                    if (Number(document.getElementById(`dd${i}`).value) < 1) {
                        idate = "01";
                        document.getElementById(`dd${i}`).value = idate;
                    }
                    if (Number(document.getElementById(`dd${i}`).value) > 31) {
                        idate = "31";
                        document.getElementById(`dd${i}`).value = idate;
                    }
                    if (i === 2)
                        getData(i, `${document.getElementById(`mm${i}`).value}-${idate}`).then((d) => out[i - 1].innerHTML = d["OUTPUT"].map(q => `<div style="width: 100%">${q}</div>`).join(""));
                    else if (i === 8)
                        getData(i, `${document.getElementById(`mm${i}`).value}-${idate}`).then((d) => {
                            out[i - 1].innerHTML = '';
                            for (let x = 0; x < d['user'].length; ++x)
                                out[i - 1].innerHTML = `${out[i - 1].innerHTML}<div style="width: 100%">${d['user'][x]}: ${d['amount'][x]}</div>`
                        });
                    else
                        getData(i, `${document.getElementById(`mm${i}`).value}-${idate}`).then((d) => out[i - 1].innerHTML = Object.keys(d).map(q => `<div style="width: 100%">${q}: ${d[q][0]}</div>`).join(""));
                }
            }
        }
        else if (i === 10) {
            getData(i).then((d) => out[i - 1].innerHTML = d["type"][0]);
        }
        else if (i === 7) {
            getData(i).then((d) => out[i - 1].innerHTML = d["car"].map((x, index) => `<div style="width: 100%">Car with ID ${x} was ordered ${d["count"][index]} times.</div>`).join(""));
        }
        else if (i === 9) {
            getData(i).then((d) => out[i - 1].innerHTML = d["workshop"]
                .filter(q => q < 5 )
                .map(e => `Workshop ${e} most often requires ${d["part"][e - 1].toLowerCase()} (about ${d["average"][e - 1]} every week on average). `)
                .join("")
            );
        }
        else if (i === 1) {
            getData(i).then((d) => out[i - 1].innerHTML = d["cid"]
                .map((e, index) => `<div style="width: 100%;">Car ${e} has license plate ${d["license_plate"][index]}</div>`)
                .join("")
            );
        }
        else if (i === 6) {
            getData(i).then((d) =>
                out[i - 1].innerHTML =
                    `
                    <div style="margin-bottom: 10px;">
                        For morning top3 destinations are ${d["location"][0]}, ${d["location"][1]} and ${d["location"][2]}, 
                        pick up locations are ${d["location"][3]}, ${d["location"][4]} and ${d["location"][5]}.
                    </div>
                    <div style="margin-bottom: 10px;">
                        For afternoon top3 destinations are ${d["location"][6]}, ${d["location"][7]} and ${d["location"][8]}, 
                        pick up locations are ${d["location"][9]}, ${d["location"][10]} and ${d["location"][11]}.
                    </div>
                    <div>
                        For evening top3 destinations are ${d["location"][12]}, ${d["location"][13]} and ${d["location"][14]}, 
                        pick up locations are ${d["location"][15]}, ${d["location"][16]} and ${d["location"][17]}.
                    </div>
                    `
            );
        }
    });

}