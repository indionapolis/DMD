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
                    <div style="display: inline-block; font-weight: bold">Input</div>:
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
        else {
            input = "elvirka privet)))))))";
            output = "";
        }


        document.getElementById('apocalypse').innerHTML +=
            `
            <div class="card rounded">
                <div id="in1" onclick=""></div>
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
                    if (document.getElementById(`mm${i}`).value.length < 2) {
                        idate = "0" + document.getElementById(`mm${i}`).value;
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
                    if (document.getElementById(`dd${i}`).value.length < 2) {
                        idate = "0" + document.getElementById(`dd${i}`).value;
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
                        getData(i, `${base_date}`).then((d) => {
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
    });

}

function open_popup(id) {
    let main = document.getElementsByTagName("body")[0];
    let obj_rect = document.getElementById(id).getBoundingClientRect();
    let blocker = document.getElementById("popup");
    let cover = document.getElementById("cover");
    let page = document.getElementsByTagName("main")[0];
    let content = "loading";
    current_id = id;
    // action on whether change height and content of page or not
    height_offset = 0;
    top_offset = 0;

    getData().then((d) => content = d["OUTPUT"][0].toString());

    // calculations:from
    start_top = is_mobile ? obj_rect.top * mobile_coeff_w : obj_rect.top;
    start_left = is_mobile ? obj_rect.left * mobile_coeff_w : obj_rect.left;
    start_width = is_mobile ? obj_rect.width * mobile_coeff_w : obj_rect.width;
    start_height = is_mobile ? obj_rect.height * mobile_coeff_h : obj_rect.height;
    // calculations:to
    end_height = height_offset + (is_mobile ? 125 : 400);
    let scroll_top = window.pageYOffset || document.documentElement.scrollTop || main.scrollTop;
    end_top = is_mobile ? 5 + scroll_top * mobile_coeff_w: (window.innerHeight - end_height) / 2 - (50 + top_offset);
    end_left = is_mobile ? 5 : (window.innerWidth - end_width) / 2;
    diff_left = end_left - start_left;
    diff_top = end_top - start_top;

    cover.style.top = start_top + "px";
    cover.style.left = start_left + "px";

    // frame animation of opening.
    document.getElementById(id).style.visibility = "hidden";
    blocker.style.display = "block";
    blocker.style.animationName = "cblur_in";
    page.style.animationName = "blur_in";
    cover.style.display = "block";
    animate({
        duration: 300,
        timing: function (timeFraction) {
            return timeFraction;
        },
        draw: function (coeff) {
            // coeff : [0, 1] (strongly from 0 to 1)
            cover.style.top = (start_top + coeff * diff_top).toString() + width_val;
            cover.style.left = (start_left + coeff * diff_left).toString() + width_val;
            cover.style.height = (start_height + coeff * (end_height - start_height)).toString() + width_val;
            cover.style.width = (start_width + coeff * (end_width - start_width)).toString() + width_val;
        }
    });

    setTimeout(function () {
        // add buttons to bottom of popup and content of cover
        document.getElementsByClassName("cover_content")[0].style.display = "block";
        document.getElementsByClassName("cover_content")[0].innerHTML = content;
        let accept_button = document.getElementById("accept");
        // accept button
        accept_button.style.display = "block";
        accept_button.style.top = (end_top + end_height + (is_mobile ? 3 : 20)) + width_val;
        accept_button.style.left = end_left + width_val;

    }, 300);
}

function close_popup() {
    // de-blur
    let blocker = document.getElementById("popup");
    let page = document.getElementsByTagName("main")[0];
    let cover = document.getElementById("cover");
    blocker.style.animationName = "cblur_out";
    page.style.animationName = "blur_out";
    // disable buttons and content
    document.getElementsByClassName("cover_content")[0].innerHTML = "";
    document.getElementsByClassName("cover_content")[0].style.display = "none";
    document.getElementById("accept").style.display = "none";
    setTimeout(function () {
        blocker.style.display = "none";
        cover.style.display = "none";
        document.getElementById(current_id).style.visibility = "visible";
    }, 250);

    // frame animation of closing
    animate({
        duration: 250,
        timing: function (timeFraction) {
            return timeFraction;
        },
        draw: function (coeff) {
            // coeff : [0, 1] (strongly from 0 to 1)
            cover.style.top = (end_top - coeff * diff_top).toString() + width_val;
            cover.style.left = (end_left - coeff * diff_left).toString() + width_val;
            cover.style.height = (end_height - coeff * (end_height - start_height)).toString() + height_val;
            cover.style.width = (end_width - coeff * (end_width - start_width)).toString() + width_val;
        }
    });
}

// usual way to animate objects using requestAnimationFrame
// p.s. unfortunately, cause freezes in some browsers (chromium-driven, and mozilla's quantum)
// howto-resolve: change method of computing animation from frame rendering to pre-rendering it.
function animate({duration, timing, draw}) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
        let time_fraction = (time - start) / duration;
        if (time_fraction > 1) time_fraction = 1;

        let progress = timing(time_fraction);
        draw(progress);

        if (time_fraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}