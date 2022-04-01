//To get month and day name from integer.
const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

//Time converter (to seconds)
function timestrToSec(timestr) {
    var parts = timestr.split(":");
    return parts[0] * 3600 + parts[1] * 60 + +parts[2];
}

//Function needed in time converter
function pad(num) {
    if (num < 10) {
        return "0" + num;
    } else {
        return "" + num;
    }
}

//Time converter (to time format)
function formatTime(seconds) {
    return [
        pad(Math.floor(seconds / 3600)),
        pad(Math.floor(seconds / 60) % 60),
        pad(seconds % 60),
    ].join(":");
}

//Button action manager

function actionManager(arg) {
    let id = null;
    switch (true) {
        case arg.id.includes("ctrl--"): //Caso seja botão de controle start/pause
            id = arg.id.replace("ctrl--", "");
            startAct(id);
            iconUpdate(id);
            break;
        case arg.id.includes("tags--"): //Caso seja tag
            break;

        case arg.id.includes("billable-"): //Caso seja billable
            id = arg.id.replace("billable--", "");
            isBillable(id);
            break;
        default:
            console.log("Houve um erro. Contate o administrador do site.");
    }
}

//List with all activities running.
let actList = {};

//Cache variable for activities not yet created.
let cache = {
    project: null,
    tags: null,
    billable: 0,
};

//Create a new activity data in actList
function newActivity(id) {
    actList[id] = {
        title: null,
        project: null,
        tags: null,
        billable: null,
        timeList: [],
    };
}

//Change start to pause, and vice-versa.
function iconUpdate(id) {
    if (actList[id]["timeList"].length % 2) {
        //Insere icone de pause
        document.getElementById("ctrl--" + id).innerHTML =
            '<i class="fa-solid fa-pause"></i> Pause';
    } else {
        document.getElementById("ctrl--" + id).innerHTML =
            '<i class="fa-solid fa-play"></i> Start';
    }
}

//Set activity as billable or not, and change his icon.
function isBillable(id) {
    if (!actList[id]) {
        //If activity hasnt been created, set in cache variable.
        if (cache["billable"] == 0 || cache["billable"] == null) {
            document.getElementById("billable--" + id).style.color = "#0d6efd";
            cache["billable"] = 1;
        } else {
            document.getElementById("billable--" + id).style.color = "gray";
            cache["billable"] = 0;
        }
    } else {
        //If activity has been created, set in the activity object.
        if (actList[id]["billable"] == 0 || actList[id]["billable"] == null) {
            document.getElementById("billable--" + id).style.color = "#0d6efd";
            actList[id]["billable"] = 1;
        } else {
            document.getElementById("billable--" + id).style.color = "gray";
            actList[id]["billable"] = 0;
        }
    }
}

4;
//Start a new activity or new time
function startAct(id) {
    let date = new Date();

    if (!actList[id]) {
        newActivity(id); //Cria a atividade e seus atributos

        //Passa os dados da variavel de cache para os dados da atividade

        actList[id]["project"] = cache["project"];
        actList[id]["tags"] = cache["tags"];
        actList[id]["billable"] = cache["billable"];

        actList[id]["title"] = document.getElementById(
            "activity-title--" + id
        ).value;
        actList[id]["timeList"].push(date);

        //Reinicia a variável de cache
        cache["project"] = null;
        cache["tags"] = null;
        cache["billable"] = false;

        //Post new activity in database

        postActivity(id);

        //Cria a linha com os dados das atividade
        createLine(id, date, false);
    } else {
        //Only insert new time
        actList[id]["timeList"].push(date);
    }
}

//Create line for activity

function createLine(id, date, recreate) {

    let theLine
    let current_int_id = "--" + parseInt(id);
    let new_int_id = "--" + (parseInt(id) + 1);
    let sRegExInput = new RegExp(current_int_id, "g");

    createDateTitleResume(date); //Verifica se existe titulo com resumo para o dia
    
    let inputTxt = null
    let modelDate
    if(recreate == false || recreate == null){

        theLine = document.getElementById("line-"+id);
        inputTxt = document.getElementById("activity-title--" + id).value;
        modelDate

    }else{
        theLine = document.getElementById("line-"+id);
        input_txt = actList[id]['title']
        date = new Date(date)
    }
    
    

    document.getElementById("date-title-" + (date.getMonth() + 1) + "-" + date.getDate()).insertAdjacentHTML("afterend",'<div class="create-activity-line input-group">' + theLine.innerHTML + "</div>");
    
    theLine.innerHTML = theLine.innerHTML.replace(sRegExInput, new_int_id);

    document.getElementById("activity-title" + current_int_id).value = inputTxt;
}

//Create title for resume (day)
function createDateTitleResume(date) {
    if (
        document.getElementById(
            "date-title-" + (date.getMonth() + 1) + "-" + date.getDate()
        ) == null
    ) {
        document
            .getElementById("resume-table")
            .insertAdjacentHTML(
                "afterbegin",
                '<div id="date-title-' +
                    (date.getMonth() + 1) +
                    "-" +
                    date.getDate() +
                    '" class="resume-day-title d-flex justify-content-between"><div>' +
                    dayNames[date.getDay()] +
                    ", " +
                    monthNames[date.getMonth()] +
                    " " +
                    date.getDate() +
                    '.</div><div>Total:<span id="date-time-' +
                    date.getDate() +
                    date.getMonth() +
                    '" class="time"> 00:00:00</span></div></div>'
            );
    }
}

//This function updates all timers running.
!(function updateTimers() {
    setTimeout(updateTimers, 500); //Update every 0.5 seconds.

    for (var prop in actList) {
        //Check for all activities.
        if (actList[prop]["timeList"].length % 2) {
            //Active timer.
            let sum = 0;
            for (
                var i = 0;
                i < actList[prop]["timeList"].length - 1;
                i = i + 2
            ) {
                //Sum of time of activity.
                sum =
                    sum +
                    Math.abs(
                        actList[prop]["timeList"][i + 1] -
                            actList[prop]["timeList"][i]
                    ) /
                        1000;
            }
            let a = Math.round(
                sum +
                    Math.abs(
                        new Date() -
                            actList[prop]["timeList"][
                                actList[prop]["timeList"].length - 1
                            ]
                    ) /
                        1000
            );

            document.getElementById("timer--" + [prop]).innerText =
                formatTime(a); //Insert time in div.
        }
    }
})();

function recriateActivities(data) {
    for (var prop in data) {

        new newActivity(data[prop]["id"])

        actList[data[prop]["id"]] = {
            title: data[prop]["title"],
            project: data[prop]["project"],
            tags: data[prop]["tags"],
            billable: data[prop]["billable"],
            timeList: JSON.parse(data[prop]["timeList"])
        };  
        createLine(data[prop]["id"], actList[data[prop]["id"]]['timeList'][0], true)
     }
     console.log(actList)
     
}

const url = "http://127.0.0.1:8000/api/";

//Connection with API - Projects

function getProject() {
    axios
        .get(url + "projects/")
        .then((response) => {
            const data = response.data;
            console.log(data["data"][0]["title"]);
        })
        .catch((error) => alert(error));
}

function postProject() {
    axios
        .post(url + "projects/", {
            title: "Mais um projeto javascript",
            description: "Esse foi criado pela API",
        })
        .then((response) => {
            alert(JSON.stringify(response.data));
        })
        .catch((error) => alert(error));
}

function putProject() {
    let id = 2;
    axios
        .put(url + "projects/" + id, {
            title: "Novo titulo 2323",
            description: "Nova des323crição",
        })
        .then((response) => {
            alert(response.data);
        })
        .catch((error) => alert(error));
}
function deleteProject() {
    let id = 4;
    axios
        .delete(url + "projects/" + id)
        .then((response) => alert(response.data))
        .catch((error) => alert(error));
}

//Connection with API - Activities

function getActivity() {
    axios
        .get(url + "activities/")
        .then((response) => {
            const data = response.data.data;
            recriateActivities(data);
        })
        .catch((error) => alert(error));
}

getActivity();

function postActivity(id) {
    axios
        .post(url + "activities/", {
            title: actList[id]["title"],
            project: JSON.stringify(actList[id]["project"]),
            tags: JSON.stringify(actList[id]["tags"]),
            billable: JSON.stringify(actList[id]["billable"]),
            timeList: JSON.stringify(actList[id]["timeList"]),
        })
        .then((response) => {
            alert(JSON.stringify(response.data));
        })
        .catch((error) => alert(error));
}

function putActivity() {
    let id = 1;
    axios
        .put(url + "activities/" + id, {
            title: "Odsfsdsdsdsssdsla",
            project: "olsad",
            tags: "fdsfsdfds",
        })
        .then((response) => {
            alert(response.data);
        })
        .catch((error) => alert(error));
}

function deleteActivity() {
    let id = 1;
    axios
        .delete(url + "activities/" + id)
        .then((response) => alert(response.data))
        .catch((error) => alert(error));
}

//Connection with API - Tags

function getTag() {
    axios
        .get(url + "tags/")
        .then((response) => {
            const data = response.data;
            console.log(data["data"][0]["title"]);
        })
        .catch((error) => alert(error));
}

function postTag() {
    axios
        .post(url + "tags/", {
            title: "Mais um projeto javascript",
            description: "Esse foi criado pela API",
        })
        .then((response) => {
            alert(JSON.stringify(response.data));
        })
        .catch((error) => alert(error));
}

function putTag() {
    let id = 2;
    axios
        .put(url + "tags/" + id, {
            title: "Novo titulo 2323",
            description: "Nova des323crição",
        })
        .then((response) => {
            alert(response.data);
        })
        .catch((error) => alert(error));
}
function deleteTag() {
    let id = 4;
    axios
        .delete(url + "tags/" + id)
        .then((response) => alert(response.data))
        .catch((error) => alert(error));
}
