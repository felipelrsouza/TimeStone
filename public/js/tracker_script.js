///// AUXILIARY DATE AND TIME FUNCTIONS ////

let gmt = -4;

function addDays(numOfDays, date = new Date()) {
    const dateCopy = new Date(date.getTime());

    dateCopy.setDate(dateCopy.getDate() + numOfDays);

    return dateCopy;
}

function subtractDays(numOfDays, date = new Date()) {
    const dateCopy = new Date(date.getTime());

    dateCopy.setDate(dateCopy.getDate() - numOfDays);

    return dateCopy;
}

// Int to month names
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
// Int to days names
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

/// CONVERT TIME FORMAT TO SECONDS AND FROM SECONDS TO TIME FORMAT

// Time converter (to seconds)
function timestrToSec(timestr) {
    let parts = timestr.split(":");
    return parts[0] * 3600 + parts[1] * 60 + +parts[2];
}

// Function needed in time converter
function pad(num) {
    if (num < 10) {
        return "0" + num;
    } else {
        return "" + num;
    }
}

// Time converter (to time format)
function formatTime(seconds) {
    return [
        pad(Math.floor(seconds / 3600)),
        pad(Math.floor(seconds / 60) % 60),
        pad(seconds % 60),
    ].join(":");
}

//// OTHERS AUXULIARIES FUNCTIONS

//  Remove one item from a array through it's value
function removeItemOnce(arr, value) {
    let index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}

function myArrayMin(arr) {
    return Math.min.apply(null, arr);
}

//// OBJECTS THAT LIST ACTIVITIES, PROJECTS AND TAGS.
let actList = {};
let projList = {};
let tagList = {};


//Create a new activity data in actList
function newActivity(id) {
    let date = new Date();
    actList[id] = {
        title: "",
        project: [],
        tags: [],
        billable: 0,
        timeList: [date.toISOString()],
        isClosed: 0,
        actDate: new Date().toISOString(),
        weekStart: subtractDays(date.getDay(), date).toISOString(),
    };
}

//// CACHE VARIABLE FOR ACTIVITIES NOT YET CREATED.
let cache = {
    project: [],
    tags: [],
    billable: 0,
    isClosed: 0,
};

//// PROJECTS AND TAGS RELATED FUNCTIONS ////

//Insert and remove a project from a activity
function projectsManager(id, projectId, arg) {
    if (actList[id]) {
        //If activity has been created

        if (actList[id]["project"].includes(projectId)) {
            removeItemOnce(actList[id]["project"], projectId);
            arg.classList.remove("selected");
            putActivity(id);
            iconUpdate(id);
        } else {
            actList[id]["project"].push(projectId);
            arg.classList.add("selected");
            putActivity(id);
            iconUpdate(id);
        }
    } else {
        //If activity hasn't been created yet
        if (cache["project"].includes(projectId)) {
            removeItemOnce(cache["project"], projectId);
            arg.classList.remove("selected");
            iconUpdate("creatorRow");
        } else {
            cache["project"].push(projectId);
            arg.classList.add("selected");
            iconUpdate("creatorRow");
        }
    }
}

//Insert and remove a tag from a activity
function tagsManager(id, tagId, arg) {
    if (actList[id]) {
        //If activity has been created

        if (actList[id]["tags"].includes(tagId)) {
            removeItemOnce(actList[id]["tags"], tagId);
            arg.classList.remove("selected");
            putActivity(id);
            iconUpdate(id);
        } else {
            actList[id]["tags"].push(tagId);
            arg.classList.add("selected");
            putActivity(id);
            iconUpdate(id);
        }
    } else {
        //If activity hasn't been created yet

        if (cache["tags"].includes(tagId)) {
            removeItemOnce(cache["tags"], tagId);
            arg.classList.remove("selected");
            iconUpdate("creatorRow");
        } else {
            cache["tags"].push(tagId);
            arg.classList.add("selected");
            iconUpdate("creatorRow");
        }
    }
}

//// TO CLOSE A ACTIVITY ////

function closeActivity(id) {

    if (actList[id]["isClosed"] == 0) {
        if (actList[id]["timeList"].length % 2 == 1) {
            activityManager(id, arg);
        }
        actList[id]["isClosed"] = 1;
        putActivity(id);
        iconUpdate(id);

        document.getElementById("activity-table-" + id).innerHTML = "";
        createSubRow(id);
    } else {
        alert("Unable to reactivate activity.");
    }
}

//Update row icons

function iconUpdate(id) {

    if (id == "creatorRow") {
        if (cache["project"].length > 0) {
            document
                .getElementById("activity-row-id")
                .getElementsByClassName("project")[0]
                .classList.add("btn-secondary");
        } else {
            document
                .getElementById("activity-row-id")
                .getElementsByClassName("ctrl")[0]
                .classList.remove("btn-secondary");
        }

        if (cache["tags"].length > 0) {
            document
                .getElementById("activity-row-id")
                .getElementsByClassName("tags")[0]
                .classList.add("btn-secondary");
        } else {
            document
                .getElementById("activity-row-id")
                .getElementsByClassName("tags")[0]
                .classList.remove("btn-secondary");
        }

        if (cache["billable"] == 0) {
            document
                .getElementById("activity-row-id")
                .getElementsByClassName("billable")[0]
                .classList.remove("btn-secondary");
        } else {
            document
                .getElementById("activity-row-id")
                .getElementsByClassName("billable")[0]
                .classList.add("btn-secondary");
        }
    } else {
        if (actList[id]["project"].length > 0) {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("project")[0]
                .classList.add("btn-secondary");
        } else {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("project")[0]
                .classList.remove("btn-secondary");
        }

        if (actList[id]["tags"].length > 0) {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("tags")[0]
                .classList.add("btn-secondary");
        } else {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("tags")[0]
                .classList.remove("btn-secondary");
        }

        if (actList[id]["billable"] == 0) {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("billable")[0]
                .classList.remove("btn-secondary");
        } else {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("billable")[0]
                .classList.add("btn-secondary");
        }

        if (
            actList[id]["timeList"].length % 2 == 0 &&
            actList[id]["isClosed"] === 0
        ) {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("ctrl")[0].innerHTML =
                '<i class="fa-solid fa-play"></i> Start';
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("ctrl")[0]
                .classList.remove("btn-secondary");
        } else {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("ctrl")[0].innerHTML =
                '<i class="fa-solid fa-pause"></i> Pause';
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("ctrl")[0]
                .classList.add("btn-secondary");
        }

        if (actList[id]["isClosed"] === 1) {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("ctrl")[0].innerHTML =
                '<i class="fa-solid fa-stop"></i> Closed';
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("ctrl")[0]
                .classList.remove("btn-secondary");
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("ctrl")[0]
                .classList.add("disabled-btn");
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("billable")[0]
                .classList.add("disabled-btn");
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("project")[0]
                .classList.add("disabled-btn");
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("tags")[0]
                .classList.add("disabled-btn");
        }

    }
    timersManagement()
}

let activeTimers = [];
let activeDailyTimers = {}
let activeWeeklyTimers = {}

function timersManagement(){

    stopPassiveUpdate = 0

    for (var prop in actList) {
        if(actList[prop]['timeList'].length % 2){ // Está ativo

            if(activeTimers.includes(prop)){
  
            }else{
                activeTimers.push(prop)
            }

        }else{
            if(activeTimers.includes(prop)){
                removeItemOnce(activeTimers, prop)
            }else{

            }        
        }

        let idActDate = actList[prop]['actDate'].slice(0,10)

        if (!(idActDate in activeDailyTimers)){

            activeDailyTimers[idActDate] = []
            activeDailyTimers[idActDate].push(prop)

        }else{

            if(activeDailyTimers[idActDate].includes(prop) == false){
                activeDailyTimers[idActDate].push(prop)
            }

        }

        let idWeekStart = actList[prop]['weekStart'].slice(0,10)

        if (!(idWeekStart in activeWeeklyTimers)){

            activeWeeklyTimers[idWeekStart] = []
            activeWeeklyTimers[idWeekStart].push(prop)

        }else{

            if(activeWeeklyTimers[idWeekStart].includes(prop) == false){
                activeWeeklyTimers[idWeekStart].push(prop)
            }

        }
    }
}

//// Update a sub-activity

function changeSubactTime(id, arg) {

    let itemId = parseInt(
        arg.parentNode.getElementsByClassName("sub-activities")[0].innerText
    ); //Get activity ID

    let nowTime = new Date(); //Get current time to compare later

    let startTimeIndex = itemId * 2 - 2; //Get index in array of sub-activity (start time)
    let endTimeIndex = startTimeIndex + 1; //Index of end time

    //Current sub-activity time
    let actDate = parseInt(actList[id]["actDate"].slice(8, 10)); //dia
    let actMonth = parseInt(actList[id]["actDate"].slice(5, 7)) - 1; //mes
    let actYear = parseInt(actList[id]["actDate"].slice(0, 4)); //ano

    let userStartTime =
        arg.parentNode.getElementsByClassName("start-time")[0].value;

    let startHours = parseInt(userStartTime.slice(0, 2)); //hours
    let startMinutes = parseInt(userStartTime.slice(3, 5)); //minutes
    let startSeconds = parseInt(userStartTime.slice(6, 8)); //seconds

    let startDateTime = new Date(
        Date.UTC(
            actYear,
            actMonth,
            actDate,
            startHours - gmt,
            startMinutes,
            startSeconds
        )
    );

    let userEndTime =
        arg.parentNode.getElementsByClassName("end-time")[0].value;

    let endHours = parseInt(userEndTime.slice(0, 2)); //hours
    let endMinutes = parseInt(userEndTime.slice(3, 5)); //minutes
    let endSeconds = parseInt(userEndTime.slice(6, 8)); //seconds

    let endDateTime = new Date(
        Date.UTC(
            actYear,
            actMonth,
            actDate,
            endHours - gmt,
            endMinutes,
            endSeconds
        )
    );

    let limitTime = new Date(
        Date.UTC(actYear, actMonth, actDate, 18 - gmt, 00, 01)
    );

    if (startDateTime > endDateTime) {
        alert("Error! End time is greater than start time.");
    } else if (startDateTime > limitTime || endDateTime > limitTime) {
        alert("Error! Time is past 18h00.");
    } else if (startDateTime > nowTime || endDateTime > nowTime) {
        alert("Error! Time is in the future.");
    } else {
        actList[id]["timeList"][startTimeIndex] = startDateTime;

        if ([endTimeIndex] in actList[id]["timeList"]) {
            actList[id]["timeList"][endTimeIndex] = endDateTime;
        } else {
            actList[id]["timeList"].push(endDateTime);
        }
        putActivity(id);
        iconUpdate(id);
    }
}

//Start a new activity or new time
function activityManager(id, arg) {
    if (id == currentId + 1) {
        newActivity(id);

        //Pass cache variable data to activity data
        actList[id]["title"] = document
            .getElementById("activity-row-id")
            .getElementsByClassName("activity-title")[0].value;
        actList[id]["project"] = cache["project"];
        actList[id]["tags"] = cache["tags"];
        actList[id]["billable"] = cache["billable"];
        actList[id]["isClosed"] = 0;

        //Reset cache variable and update currentId
        cache = {
            project: [],
            tags: [],
            billable: 0,
            isClosed: 0,
        };

        currentId++;

        //Reset input
        document
            .getElementById("activity-row-id")
            .getElementsByClassName("activity-title")[0].value = "";

        iconUpdate("creatorRow");

        //Post new activity to the database

        postActivity(id);

        //Create row with activity data
        createRow(id, arg);
        iconUpdate(id);
        createSubRow(id);
    } else {
        //Only insert a new time
        actList[id]["timeList"].push(new Date().toISOString());
        putActivity(id);
        createSubRow(id);
        iconUpdate(id)
    }
}

//Create row for activity

let currentId = 0;

function createRow(id) {
    date = new Date(actList[id]["actDate"]);

    createDateTitleResume(id);

    let newRow = document.getElementById("activity-row-id").innerHTML;
    let actTable = document.getElementById(
        "date-title-" + actList[id]["actDate"].slice(0, 10)
    );

    actTable.insertAdjacentHTML(
        "afterend",
        '<div id="activity-row-' +
            id +
            '" class="activity-row input-group">' +
            newRow +
            "</div><div id='activity-table-" +
            id +
            "' class='activity-table d-none'></div>"
    );
    document
        .getElementById("activity-row-" + id)
        .getElementsByClassName("activity-title")[0].value =
        actList[id]["title"];
    document
        .getElementById("activity-row-" + id)
        .getElementsByClassName("activity-title")[0]
        .classList.remove("rounded-start");
    document
        .getElementById("activity-row-" + id)
        .getElementsByClassName("sub-activities")[0].innerHTML =
        '<i class="fa-solid fa-caret-down"></i> ' +
        Math.round(actList[id]["timeList"].length / 2);
    document
        .getElementById("activity-row-" + id)
        .getElementsByClassName("sub-activities")[0]
        .classList.remove("d-none");
    document
        .getElementById("activity-row-" + id)
        .getElementsByClassName("options")[0]
        .classList.remove("d-none");
    document
        .getElementById("activity-row-" + id)
        .getElementsByClassName("ctrl")[0]
        .classList.remove("rounded-end");

    iconUpdate(id);
}

function createSubRow(id) {
    let newRow = document.getElementById("sub-act-id").innerHTML;
    let newCalendar = document.getElementById("calendar-act-id").innerHTML;
    let activityTable = document.getElementById("activity-table-" + id);

    let timeList = actList[id]["timeList"];

    if (timeList) {
        for (let i = 0; i < timeList.length; i = i + 2) {
            let startTime = new Date(timeList[i]);
            let endTime = new Date(timeList[i + 1]);

            startTime =
            startTime.getHours() * 3600 +
            startTime.getMinutes() * 60 +
            startTime.getSeconds();

            endTime =
            endTime.getHours() * 3600 +
            endTime.getMinutes() * 60 +
            endTime.getSeconds();

            let item_id;

            if (i == 0) {
                item_id = 1;
            } else {
                item_id = 1 + i / 2;
            }

            if (timeList.length > 1 && timeList.length % 2 == 0) {
                //Se é par, tempo está fechado e último i = length -1
                if (i < timeList.length - 2) {
                    //Corpo de itens

                    activityTable.insertAdjacentHTML(
                        "beforeend",
                        '<div id="sub-act-' +
                            id +
                            "-" +
                            i +
                            '" class="sub-activity-row input-group"">' +
                            newRow +
                            "</div>"
                    );
                    document
                        .getElementById("sub-act-" + id + "-" + i)
                        .getElementsByClassName("start-time")[0].value =
                        formatTime(startTime);
                    document
                        .getElementById("sub-act-" + id + "-" + i)
                        .getElementsByClassName("end-time")[0].value =
                        formatTime(endTime);
                    document
                        .getElementById("sub-act-" + id + "-" + i)
                        .getElementsByClassName("sub-activities")[0].innerHTML =
                        item_id;
                } else if (i < timeList.length - 1) {
                    //Ultima linha, exibe calendario

                    activityTable.insertAdjacentHTML(
                        "beforeend",
                        '<div id="sub-act-' +
                            id +
                            "-" +
                            i +
                            '" class="sub-activity-row input-group"">' +
                            newRow +
                            "</div>"
                    );
                    document
                        .getElementById("sub-act-" + id + "-" + i)
                        .getElementsByClassName("start-time")[0].value =
                        formatTime(startTime);
                    document
                        .getElementById("sub-act-" + id + "-" + i)
                        .getElementsByClassName("end-time")[0].value =
                        formatTime(endTime);
                    document
                        .getElementById("sub-act-" + id + "-" + i)
                        .getElementsByClassName("sub-activities")[0].innerHTML =
                        item_id;

                    document
                        .getElementById("activity-row-" + id)
                        .getElementsByClassName("sub-activities")[0].innerHTML =
                        '<i class="fa-solid fa-caret-down"></i> ' +
                        Math.round(timeList.length / 2);

                    activityTable.insertAdjacentHTML(
                        "beforeend",
                        '<div id="calendar-act-' +
                            id +
                            '" class="calendar-activity-row input-group"">' +
                            newCalendar +
                            "</div>"
                    );
                    let activityDate = actList[id]['actDate'].slice(0, 10)
                    ;

                    document
                        .getElementById("calendar-act-" + id)
                        .getElementsByClassName("manual-date")[0]
                        .setAttribute("value", activityDate);
                }
            }

            if (timeList.length % 2 == 1) {
                //Se é impar, tempo está aberto e último i = length
                if (i < timeList.length - 1) {
                    //Corpo de itens

                    activityTable.insertAdjacentHTML(
                        "beforeend",
                        '<div id="sub-act-' +
                            id +
                            "-" +
                            i +
                            '" class="sub-activity-row input-group"">' +
                            newRow +
                            "</div>"
                    );
                    document
                        .getElementById("sub-act-" + id + "-" + i)
                        .getElementsByClassName("start-time")[0].value =
                        formatTime(startTime);
                    document
                        .getElementById("sub-act-" + id + "-" + i)
                        .getElementsByClassName("end-time")[0].value =
                        formatTime(endTime);
                    document
                        .getElementById("sub-act-" + id + "-" + i)
                        .getElementsByClassName("sub-activities")[0].innerHTML =
                        item_id;
                } else if (i < timeList.length) {
                    //Ultima linha, exibe calendario

                    activityTable.insertAdjacentHTML(
                        "beforeend",
                        '<div id="sub-act-' +
                            id +
                            "-" +
                            i +
                            '" class="sub-activity-row input-group"">' +
                            newRow +
                            "</div>"
                    );
                    document
                        .getElementById("sub-act-" + id + "-" + i)
                        .getElementsByClassName("start-time")[0].value =
                        formatTime(startTime);
                    document
                        .getElementById("sub-act-" + id + "-" + i)
                        .getElementsByClassName("end-time")[0].value =
                        formatTime(endTime);
                    document
                        .getElementById("sub-act-" + id + "-" + i)
                        .getElementsByClassName("sub-activities")[0].innerHTML =
                        item_id;

                    document
                        .getElementById("activity-row-" + id)
                        .getElementsByClassName("sub-activities")[0].innerHTML =
                        '<i class="fa-solid fa-caret-down"></i> ' +
                        Math.round(timeList.length / 2);

                        activityTable.insertAdjacentHTML(
                            "beforeend",
                            '<div id="calendar-act-' +
                                id +
                                '" class="calendar-activity-row input-group"">' +
                                newCalendar +
                                "</div>"
                        );
                        let activityDate = actList[id]['actDate'].slice(0, 10)
                        ;
    
                        document
                            .getElementById("calendar-act-" + id)
                            .getElementsByClassName("manual-date")[0]
                            .setAttribute("value", activityDate);
                }
            }
        }
    }
}

//Create title for resume (week)
function createWeekTitleResume(id) {
    let weekStart = new Date(actList[id]["weekStart"]);
    let weekEnd = addDays(6, weekStart);
    if (
        document.getElementById(
            "week-title-" + actList[id]["weekStart"].slice(0, 10)
        ) == null
    ) {
        document
            .getElementById("resume-table")
            .insertAdjacentHTML(
                "afterbegin",
                '<div id="week-title-' +
                    actList[id]["weekStart"].slice(0, 10) +
                    '" class="resume-week-title d-flex justify-content-between align-middle"><div>Week of ' +
                    monthNames[weekStart.getMonth()] +
                    " " +
                    weekStart.getDate() +
                    " to " +
                    monthNames[weekEnd.getMonth()] +
                    " " +
                    weekEnd.getDate() +
                    ", " +
                    weekStart.getFullYear() +
                    '.</div><div id="week-timer-' + actList[id]["weekStart"].slice(0, 10) +
                    '">Total of this week: <span class="timer"> 00:00:00</span></div></div>'
            );
    }
}

//Create title for resume (day)
function createDateTitleResume(id) {
    createWeekTitleResume(id);

    let actDate = new Date(actList[id]["actDate"]);

    if (
        document.getElementById(
            "date-title-" + actList[id]["actDate"].slice(0, 10)
        ) == null
    ) {
        let weekStart = new Date(actList[id]["weekStart"]);

        document
            .getElementById(
                "week-title-" + actList[id]["weekStart"].slice(0, 10)
            )
            .insertAdjacentHTML(
                "afterend",
                '<div id="date-title-' +
                    actList[id]["actDate"].slice(0, 10) +
                    '" class="resume-day-title d-flex justify-content-between"><div>' +
                    dayNames[actDate.getDay()] +
                    ", " +
                    monthNames[actDate.getMonth()] +
                    " " +
                    actDate.getDate() +
                    ' - <span class="timer-productive"></span><span class="first-of-week d-none"> - <i class="fa-solid fa-award"></i> 1st of week</span></div><div id="date-timer-' + actList[id]["actDate"].slice(0, 10) +
                    '">  Total: <span class="timer"> 00:00:00</span></div></div>'
            );
    }
}

//// MAIN BUTTON ACTION MANAGER ////

// This function takes the actions of the buttons and
//  directs them to the respective set of functions

let id;

function actionManager(arg) {
    //Get ID from differents elements
    if (arg.parentNode.id.includes("activity-row-")) {
        id = arg.parentNode.id.replace("activity-row-", ""); // Activity row ID

        if (id == "id") {
            // Activity insert row ID
            id = currentId + 1;
        }
    } else if (arg.parentNode.parentNode.id.includes("activity-table-")) {
        // Activity table ID
        id = arg.parentNode.parentNode.id.replace("activity-table-", "");
    } else {
        alert("caiu aqui"); ////////<<<<<<<<<<<<
        id = arg.parentNode.parentNode.id.replace("activity-row-", "");
    }

    switch (true) {
        case arg.getAttribute("data-type").includes("sub-activities"): //Display sub-activities
            // and update icon
            if (
                document
                    .getElementById("activity-table-" + id)
                    .classList.contains("d-none")
            ) {
                document
                    .getElementById("activity-table-" + id)
                    .classList.remove("d-none");
                arg.classList.add("icon-selected");
            } else {
                document
                    .getElementById("activity-table-" + id)
                    .classList.add("d-none");
                arg.classList.remove("icon-selected");
            }

            break;
        case arg.getAttribute("data-type").includes("activity-title"): // Update title if changed
            if (id == currentId + 1) {
                cache["title"] = arg.value;
            } else if (actList[id]["isClosed"] == 1) {
                alert("Activity closed");
            } else {
                if (arg.value) {
        
                    actList[id]["title"] = arg.value;
                    putActivity(id);
                }
            }
            break;
        case arg.getAttribute("data-type").includes("project"): //Add or remove a project from an activity
            let projectId = arg.getAttribute("data-id");
            projectsManager(id, projectId, arg);

            break;
        case arg.getAttribute("data-type").includes("tags"): //Add or remove a tag from an activity
            let tagId = arg.getAttribute("data-id");
            tagsManager(id, tagId, arg);

            break;
        case arg.getAttribute("data-type").includes("billable"): //If is billable
            if (!actList[id]) {
                //If activity hasnt been created, set in cache variable.
                if (cache["billable"] == 0) {
                    cache["billable"] = 1;
                } else {
                    cache["billable"] = 0;
                }
                iconUpdate("creatorRow");
            } else {
                //If activity has been created, set in the activity object.
                if (actList[id]["billable"] == 0) {
                    actList[id]["billable"] = 1;
                } else {
                    actList[id]["billable"] = 0;
                }
                putActivity(id);
                iconUpdate(id);
            }
            break;
        case arg.getAttribute("data-type").includes("ctrl-btn"): //Start the activity manager
            if (id == currentId + 1) {
                //Create, start or pause an activity

                activityManager(id, arg);
                iconUpdate(id, arg);
            } else {
                if (actList[id]["isClosed"] !== 1) {
                    //Id activity is not closed an activity, allow title change
                    if (arg.parentNode.getElementsByClassName("activity-title")[0].value
                    ) {
                        activityManager(id, arg);
                        iconUpdate(id, arg);
                    } else {
                        alert("Enter a title");
                    }
                } else {
                    alert("Activity closed");
                }
            }

            break;
        case arg.getAttribute("data-type").includes("delete-activity"): //Delete an activity
            deleteActivity(id);

            break;

        case arg.getAttribute("data-type").includes("changeSubactTime"): //Update sub-activity
            changeSubactTime(id, arg);

            break;
        case arg.getAttribute("data-type").includes("del-subact"): //Delete a sub-activity
            if (actList[id]["timeList"].length > 2) {
                let subId = parseInt(
                    arg.parentNode.getElementsByClassName("sub-activities")[0]
                        .innerText
                );
                let itemIndex = subId * 2 - 2;

                actList[id]["timeListCopy"] = [];
                actList[id]["timeListCopy"] = actList[id]["timeList"];
                actList[id]["timeList"] = [];

                for (let i = 0; i < actList[id]["timeListCopy"].length; i++) {
                    if (
                        actList[id]["timeListCopy"][i] &&
                        i != itemIndex &&
                        i != itemIndex + 1
                    ) {
                        actList[id]["timeList"].push(
                            actList[id]["timeListCopy"][i]
                        );
                    }
                }
                delete actList[id]["timeListCopy"];
                putActivity(id);
                iconUpdate(id);
                document.getElementById("activity-table-" + id).innerHTML = "";
                createSubRow(id);
            } else {
                alert(
                    "Error! This cannot be deleted, delete the activity instead"
                );
            }
            break;

        case arg.getAttribute("data-type").includes("update-calendar"): //Updates the date of an activity
                let today = new Date()
                let userInput = document
                    .getElementById("calendar-act-" + id)
                    .getElementsByClassName("manual-date")[0].value;
                 
                    let userInputDate = parseInt(userInput.slice(8, 10)); //Date
                    let userInputMonth = parseInt(userInput.slice(5, 7))-1; //Month
                    let userInputYear = parseInt(userInput.slice(0, 4)); //Year

                    let userDate = new Date(
                        Date.UTC(
                            userInputYear,
                            userInputMonth,
                            userInputDate,
                            1 - gmt,
                            0,
                            0
                        )
                    );
                            
                if(userDate > today){
                    alert("Error! Date is in the future.")
                }else{
                actList[id]['actDate'] = userDate.toISOString()
                putActivity(id);
                document.location.reload();
            }
            
            break;
        case arg.getAttribute("data-type").includes("close-activity"): //Close acitivity
            closeActivity(id);

            break;
        default:
            console.log("Houve um erro. Contate o administrador do site.");
    }
}

let stopPassiveUpdate = 0

//// TIMER UPDATER ////

!(function updateTimers() {
    setTimeout(updateTimers, 500); //Update every 0.5 second.

    let nowTime = new Date()

    //Update activity timers
 
    for (let i = 0; i < activeTimers.length; i++) {

        let sum = 0;
        let itemId = activeTimers[i]

        for (let i = 0; i < actList[itemId]["timeList"].length - 1; i = i + 2) {

            sum =
                sum +
                Math.abs(
                    new Date(actList[itemId]["timeList"][i + 1]) -
                        new Date(actList[itemId]["timeList"][i])
                ) /
                    1000;

        }

        let newTimerValue = Math.round(sum + Math.abs( nowTime - new Date( actList[itemId]["timeList"][actList[itemId]["timeList"].length - 1])) / 1000 );
        document.getElementById('activity-row-'+itemId).getElementsByClassName('timer')[0].innerText = formatTime(newTimerValue)
    }

    //Update passive activities timers
    if(stopPassiveUpdate == 0){ //If any passive timers has changed
        for (let itemId in actList) {
            let sum = 0
            
            if (actList[itemId]["timeList"].length % 2 == 0) { //Está passivo
                
                for (let i = 0; i < actList[itemId]["timeList"].length - 1; i = i + 2) {

                    sum =
                        sum +
                        Math.abs(
                            new Date(actList[itemId]["timeList"][i + 1]) -
                                new Date(actList[itemId]["timeList"][i])
                        ) /
                            1000;        
                }

            let newTimerValue = Math.round(sum )
            document.getElementById('activity-row-'+itemId).getElementsByClassName('timer')[0].innerText = formatTime(newTimerValue)

            }
            stopPassiveUpdate = 1
        }
    }

    // //Update Daily timers
    for (let datestring in activeDailyTimers) {
        let sum = 0

        for (let i = 0; i < activeDailyTimers[datestring].length; i++) {
            let itemId = activeDailyTimers[datestring][i]
            
            sum = sum + timestrToSec(document.getElementById('activity-row-'+itemId).getElementsByClassName('timer')[0].innerText)
        }      
        
        dayTimerId = getKeyByValue(activeDailyTimers, activeDailyTimers[datestring])
        document.getElementById('date-title-'+dayTimerId).getElementsByClassName('timer')[0].innerText = formatTime(sum).slice(0, -3)
        document.getElementById('date-title-'+dayTimerId).getElementsByClassName('timer-productive')[0].innerText = Math.round((sum / 28800) * 100)+'% prod.'
    }

    // //Update Weekly timers
    for (let weekstring in activeWeeklyTimers) {
        let sum = 0
        let longerTimer = 0
        let longerTimerId = null
        let oldLongerTimerId = null
            
        for (let i = 0; i < activeWeeklyTimers[weekstring].length; i++) {
            let itemId = activeWeeklyTimers[weekstring][i]
            let daySum = timestrToSec(document.getElementById('activity-row-'+itemId).getElementsByClassName('timer')[0].innerText)
            sum = sum + daySum
            
              if(daySum>longerTimer){ //Set the longer day in the week
                if(longerTimerId != null){oldLongerTimerId = longerTimerId}                
                longerTimer = daySum
                longerTimerId = actList[activeWeeklyTimers[weekstring][i]]['actDate'].slice(0, 10)
            }  
        }

        weekTimerId = getKeyByValue(activeWeeklyTimers, activeWeeklyTimers[weekstring])

        if(oldLongerTimerId != null){
        document.getElementById('date-title-'+oldLongerTimerId).getElementsByClassName('first-of-week')[0].classList.add('d-none') // Show/hide largest day icon
        }
        document.getElementById('date-title-'+longerTimerId).getElementsByClassName('first-of-week')[0].classList.remove('d-none')// Show/hide largest day icon

        document.getElementById('week-timer-'+weekTimerId).getElementsByClassName('timer')[0].innerText = formatTime(sum).slice(0, -3)
    
    }    
})();

function recreateActivities(data) {
    for (var prop in data) {
        actList[data[prop]["id"]] = {
            title: data[prop]["title"],
            project: JSON.parse(data[prop]["project"]),
            tags: JSON.parse(data[prop]["tags"]),
            billable: data[prop]["billable"],
            isClosed: data[prop]["isClosed"],
            timeList: JSON.parse(data[prop]["timeList"]),
            actDate: data[prop]["actDate"],
            weekStart: data[prop]["weekStart"],
        };

        
        let actDate = actList[data[prop]["id"]]['actDate']

        let actDateDate = parseInt(actDate.slice(8, 10)); //Date
        let actDateMonth = parseInt(actDate.slice(5, 7))-1; //Month
        let actDateYear = parseInt(actDate.slice(0, 4)); //Year

        let actDateLimit = new Date(
            Date.UTC(
                actDateYear,
                actDateMonth,
                actDateDate,
                18 - gmt,
                0,
                0
            )
        );

        createRow(data[prop]["id"], actDate)
        createSubRow(data[prop]["id"]);

        let thisTime = new Date()
        let thisTimeString = (thisTime).toISOString()

        let thisTimeLimitDate = parseInt(thisTimeString.slice(8, 10)); //Date
        let thisTimeLimitMonth = parseInt(thisTimeString.slice(5, 7))-1; //Month
        let thisTimeLimitYear = parseInt(thisTimeString.slice(0, 4)); //Year

        let thisTimeLimit = new Date(
            Date.UTC(
                thisTimeLimitYear,
                thisTimeLimitMonth,
                thisTimeLimitDate,
                18 - gmt,
                0,
                0
            )
        );

        let thisTimeStart = new Date(
            Date.UTC(
                thisTimeLimitYear,
                thisTimeLimitMonth,
                thisTimeLimitDate,
                0 - gmt,
                0,
                0
            )
        );

        if (actList[data[prop]["id"]]["timeList"].length % 2) {
            if (thisTime > actDateLimit || actDateLimit < thisTimeStart || thisTime > actDateLimit) {
                alert('caiu aqui 1')
                actList[data[prop]["id"]]["timeList"].push(actDateLimit);
                closeActivity(data[prop]["id"]);

            } else if (thisTime < thisTimeStart && actList[data[prop]["id"]]["isClosed"] == 0){
                alert('caiu aqui 2')
                actList[data[prop]["id"]]["timeList"].push(actDateLimit);
                closeActivity(data[prop]["id"]);
            }
        }else if (actList[data[prop]["id"]]["timeList"].length % 2 == 0){

            if (thisTime > actDateLimit && actList[data[prop]["id"]]["isClosed"] == 0 || thisTime > thisTimeLimit) {
                alert('caiu aqui 3')
                closeActivity(data[prop]["id"]);

            } else if (thisTime < thisTimeStart && actList[data[prop]["id"]]["isClosed"] == 0){
                alert('caiu aqui 4')
                closeActivity(data[prop]["id"]);

            }
        }


        if (data[prop]["id"] > currentId) {
            currentId = data[prop]["id"];
        }
    }
}

function recreateProjects(data) {
    for (let prop in data) {
        projList[data[prop]["id"]] = {
            id: id,
            title: data[prop]["title"],
            description: data[prop]["description"],
            activities: data[prop]["activities"],
        };
    }
}

function recreateTags(data) {
    for (let prop in data) {
        tagList[data[prop]["id"]] = {
            id: id,
            title: data[prop]["title"],
            activities: data[prop]["activities"],
        };
    }
}

//// CONNECTION WITH API ////
// Projects

const url = "http://127.0.0.1:8000/api/";

function getProject() {
    axios
        .get(url + "projects/")
        .then((response) => {
            const data = response.data.data;
            recreateProjects(data);
        })
        .catch((error) => console.log(error));
}

getProject();

// Activities

function getActivity() {
    axios
        .get(url + "activities/")
        .then((response) => {
            let data = response.data.data;
            recreateActivities(data);
        })
        .catch((error) => console.log(error));
}

getActivity();

function postActivity(id) {
    axios
        .post(url + "activities/", {
            id: id,
            title: actList[id]["title"],
            project: JSON.stringify(actList[id]["project"]),
            tags: JSON.stringify(actList[id]["tags"]),
            billable: actList[id]["billable"],
            isClosed: actList[id]["isClosed"],
            timeList: JSON.stringify(actList[id]["timeList"]),
            actDate: actList[id]["actDate"],
            weekStart: actList[id]["weekStart"],
        })
        .then((response) => {
            console.log("Atividade criada com sucesso");
        })
        .catch((error) => console.log(error));
}

function putActivity(id) {
    alert(id)
    let arg = {
        id: id,
        title: actList[id]["title"],
        project: JSON.stringify(actList[id]["project"]),
        tags: JSON.stringify(actList[id]["tags"]),
        billable: actList[id]["billable"],
        isClosed: actList[id]["isClosed"],
        timeList: JSON.stringify(actList[id]["timeList"]),
        actDate: actList[id]["actDate"],
        weekStart: actList[id]["weekStart"],
    };

    axios
        .put(url + "activities/" + id, arg)
        .then((response) => {
            response.data;
        })
        .catch((error) => console.log(error));
}

function deleteActivity(id) {
    delete actList[id];

    document.location.reload();

    axios
        .delete(url + "activities/" + id)
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
}

//Tags

function getTag() {
    axios
        .get(url + "tags/")
        .then((response) => {
            const data = response.data.data;
            recreateTags(data);
        })
        .catch((error) => console.log(error));
}

getTag();

////////
function getTime() {
    axios
        .get("http://worldtimeapi.org/api/timezone/America/Sao_Paulo")
        .then((response) => {
            console.log(response.data.datetime);
            return true;
        })
        .catch((error) => console.log(error));
}
