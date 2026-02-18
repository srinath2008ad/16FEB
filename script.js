var players_arr = ["Rohit Sharma",
    "Shubman Gill",
    "Virat Kohli",
    "Shreyas Iyer",
    "KL Rahul",
    "Hardik Pandya",
    "Ravindra Jadeja",
    "Kuldeep Yadav",
    "Jasprit Bumrah",
    "Mohammed Siraj",
    "Mohammed Shami"
]

// for (let i = 1; i < 12; i++) {
//     players_arr.push(prompt("enter player no " + i));
// }
var max_overs = +prompt("enter max no of overs :");
var arr = [];
var striker1 = 0,
    striker2 = 0;
var st1balls = 0,
    st2balls = 0;
var wicketcount = 0;
var balls = 0;
var over = 0,
    overballs = 0;
var totalscore;
var strike = true
var playerdown = 1;

document.getElementById("striker1").innerText = players_arr[0];
document.getElementById("striker2").innerText = players_arr[1];

function change_player() {
    if (strike) {
        var player = document.getElementById("striker1").innerText
        var summary = document.createElement("p");
        summary.innerText = player + "-->" + striker1 + "in" + (st1balls + 1);
        document.getElementById("matchsummary").appendChild(summary);
        playerdown++;
        document.getElementById("striker1").innerText = players_arr[playerdown];
        striker1 = 0;
        st1balls = 0;
        document.getElementById("st1_balls").innerText = st1balls;
        document.getElementById("st1_score").innerText = striker1;
    } else if (!strike) {
        var player = document.getElementById("striker2").innerText;
        var summary = document.createElement("p");
        summary.innerText = player + "-->" + striker2 + "in" + (st2balls + 1);
        document.getElementById("matchsummary").appendChild(summary);
        playerdown++;
        document.getElementById("striker2").innerText = players_arr[playerdown];
        striker2 = 0;
        st2balls = 0;
        document.getElementById("st2_balls").innerText = st2balls;
        document.getElementById("st2_score").innerText = striker2;
    }
}

function addscore(n) {
    if (!(n == '1nb' || n == '1wd')) {
        overballs++;
        if (overballs == 6) {
            overballs = 0;
            over++;
        }
        genoverscard();
    }
    if (n == '1nb' || n == '1wd') {
        arr.push(n);
    } else if (balls == 5) {
        arr.push(n);
        arr.push("|")
        balls = 0;
    } else if (balls < 6) {
        balls++;
        arr.push(n);
    }
    if (n == "W") {
        change_player();
        wicketcount++;
        if (wicketcount == 10) {
            alert("all out score = " + totalscore);
            arr.splice(0, arr.length);
            balls = 0;
            over = 0;
            overballs = 0;
            wicketcount = 0;
            totalscore = 0;
            strike = true;
            striker1 = 0;
            striker2 = 0;
            st1balls = 0;
            st2balls = 0;
            playerdown = 1;
            document.getElementById("matchsummary").innerText = "";
            document.getElementById("strike2").style.display = "none";
            document.getElementById("strike1").style.display = "inline";
            document.getElementById("striker1").innerText = players_arr[0];
            document.getElementById("striker2").innerText = players_arr[1];
            document.getElementById("st1_balls").innerText = st1balls;
            document.getElementById("st1_score").innerText = striker1;
            document.getElementById("st2_balls").innerText = st2balls;
            document.getElementById("st2_score").innerText = striker2;
            genoverscard();
            genuiscoreline();
            genuiscore();
        }
    }
    if (strike) {
        if (typeof (n) == "number" || n == "1nb") {
            if (n == "1nb") {
                striker1++;
                document.getElementById("st1_score").innerText = striker1;
            } else {
                st1balls++;
                striker1 += n;
                document.getElementById("st1_balls").innerText = st1balls;
                document.getElementById("st1_score").innerText = striker1;
            }
        }
    }
    if (!strike) {
        if (typeof (n) == "number" || n == "1nb") {
            if (n == "1nb") {
                striker2++;
                document.getElementById("st2_score").innerText = striker2;
            } else {
                st2balls++;
                striker2 += n;
                document.getElementById("st2_balls").innerText = st2balls;
                document.getElementById("st2_score").innerText = striker2;
            }
        }
    }

    if (typeof (n) == "number" || n == "(.)" || n == "W") {
        if (balls == 0 && (n == 1 || n == 3 || n == 5)) {

        } else if (n == 1 || n == 3 || n == 5 || balls == 0) {
            if (strike) {
                document.getElementById("strike1").style.display = "none";
                document.getElementById("strike2").style.display = "inline";
                strike = false
            } else {
                document.getElementById("strike2").style.display = "none";
                document.getElementById("strike1").style.display = "inline";
                strike = true
            }
        }
    }
    if (over == max_overs && overballs == 1) {
        alert("match over score = " + totalscore);
        arr.splice(0, arr.length);
        balls = 0;
        over = 0;
        overballs = 0;
        wicketcount = 0;
        totalscore = 0;
        strike = true;
        striker1 = 0;
        striker2 = 0;
        st1balls = 0;
        st2balls = 0;
        playerdown = 1;
        document.getElementById("matchsummary").innerText = "";
        document.getElementById("strike2").style.display = "none";
        document.getElementById("strike1").style.display = "inline";
        document.getElementById("striker1").innerText = players_arr[0];
        document.getElementById("striker2").innerText = players_arr[1];
        document.getElementById("st1_balls").innerText = st1balls;
        document.getElementById("st1_score").innerText = striker1;
        document.getElementById("st2_balls").innerText = st2balls;
        document.getElementById("st2_score").innerText = striker2;
        genoverscard();
        genuiscoreline();
        genuiscore();
    }

    genuiscoreline();
    genuiscore();
}

function genoverscard() {
    document.getElementById("overcount").innerText = over;
    document.getElementById("overballs").innerText = overballs;
}

function genuiscoreline() {
    document.getElementById("scores").innerText = "";
    var scorestring = ""
    arr.forEach((a) => {
        scorestring += a + " ";
    })
    document.getElementById("scores").innerText = scorestring;
}

function genuiscore() {
    document.getElementById("points").innerText = "";
    document.getElementById("wickets").innerText = "";

    var numbers = arr.filter((a) => typeof (a) === "number");
    totalscore = numbers.reduce((a, b) => a + b, 0);

    arr.forEach((n) => {
        if (n == '1nb' || n == '1wd') {
            totalscore += 1;
        }
    })

    document.getElementById("wickets").innerText = wicketcount;
    document.getElementById("points").innerText = totalscore;
}