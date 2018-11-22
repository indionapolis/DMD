let is_mobile = screen.width <= 450 ? 1 : 0;
let base_date = "07-01";

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
const getData = async (date) => {
    const q = await fetch('https://dmd-server-app.herokuapp.com/3_2/2018-' + date);
    return await q.json();
};

// in cycle --

let out2 = document.getElementById("2");
out2.innerHTML = "loadingloadingloadingloadingloadi\nngloadingloadingloadingl\noadingloadingloadingloadingloa\ndingloadingloadingloadingloading\nloadingloadingloading\nloadingloadingloadingloa\ndingloading\nnaN";
getData(base_date).then((d) => out2.innerHTML = d["OUTPUT"].map(q => `<div>${q}</div>`).join(""));

// --

let mm = document.getElementById("mm");
let dd = document.getElementById("dd");

mm.onchange = () => {
    if (!isNaN(mm.value)) {
        let idate = mm.value;
        if (mm.value.length < 2) {
            idate = "0" + mm.value;
        }
        if (Number(mm.value) < 7) {
            idate = "07";
            mm.value = idate;
        }
        if (Number(mm.value) > 9) {
            idate = "09";
            mm.value = idate;
        }
        getData(`${idate}-${dd.value}`).then((d) => out2.innerHTML = d["OUTPUT"].map(q => `<div>${q}</div>`).join(""));
    }
};

dd.onchange = () => {
    if (!isNaN(dd.value)) {
        let idate = dd.value;
        if (dd.value.length < 2) {
            idate = "0" + dd.value;
        }
        if (Number(dd.value) < 1) {
            idate = "01";
            dd.value = idate;
        }
        if (Number(dd.value) > 31) {
            idate = "31";
            dd.value = idate;
        }
        getData(`${mm.value}-${idate}`).then((d) => out2.innerHTML = d["OUTPUT"].map(q => `<div>${q}</div>`).join(""));
    }
};

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