let is_mobile = screen.width <= 450 ? 1 : 0;
let base_date = "07-01";
let out = [];

// for popup
let start_top, start_left, start_width, start_height;
let end_top, end_left, diff_left, diff_top;
let end_width = is_mobile ? 90 : 630, end_height;
let height_val = is_mobile ? "vh" : "px", width_val = is_mobile ? "vw" : "px";
let current_crootilka_deg = 210;
let current_id;
// px value multiplied by coeff gives true vw and vh values
let mobile_coeff_h = 100 / window.innerHeight;
let mobile_coeff_w = 100 / window.innerWidth;

// for crootilka (крутилка): offset = number
let top_offset = 0, height_offset = 0;
const getData = async (id, date) => {
    let d = date === undefined ? "" : `2018-${date}`;
    const q = await fetch(`https://dmd-server-app.herokuapp.com/3_${id.toString()}/${d}`);
    return await q.json();
};

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
        else {
            input = "elvirka privet)))))))";
            output = "";
        }

        let j = `in${i}`;
        document.getElementById('apocalypse').innerHTML =
            `
            ${document.getElementById('apocalypse').innerHTML}
            <div id="in${i}" class="card rounded" style="position: relative;">
                <h1 style="margin-bottom: 10px">Query 3.${i}</h1>
                ${input}
                ${output}
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
        else if (i === 9) {
            getData(i).then((d) => out[i - 1].innerHTML = d["workshop"]
                .filter(q => q < 5 )
                .map(e => `Workshop ${e} most often requires ${d["part"][e - 1].toLowerCase()} (about ${d["average"][e - 1]} every week on average). `)
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