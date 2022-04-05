///// AUXILIARY DATE AND TIME FUNCTIONS ////

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

//// OBJECTS THAT LIST ACTIVITIES, PROJECTS AND TAGS.
let actList = {};
let projList = {};
let tagList = {};

//Create a new activity data in actList
function newActivity(id) {
    actList[id] = {
        title: "",
        project: [],
        tags: [],
        billable: 0,
        timeList: [],
        isClosed: 0,
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
    if (actList[id]) { //If activity has been created

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
    } else {//If activity hasn't been created yet 
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

    if (actList[id]) { //If activity has been created

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
    } else { //If activity hasn't been created yet 

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
                .classList.add("active-btn");
        } else {
            document
                .getElementById("activity-row-id")
                .getElementsByClassName("ctrl")[0]
                .classList.remove("active-btn");
        }

        if (cache["tags"].length > 0) {
            document
                .getElementById("activity-row-id")
                .getElementsByClassName("tags")[0]
                .classList.add("active-btn");
        } else {
            document
                .getElementById("activity-row-id")
                .getElementsByClassName("tags")[0]
                .classList.remove("active-btn");
        }

        if (cache["billable"] == 0) {
            document
                .getElementById("activity-row-id")
                .getElementsByClassName("billable")[0]
                .classList.remove("active.btn");
        } else {
            document
                .getElementById("activity-row-id")
                .getElementsByClassName("billable")[0]
                .classList.add("active-btn");
        }
    } else {
        if (actList[id]["project"].length > 0) {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("project")[0]
                .classList.add("active-btn");
        } else {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("project")[0]
                .classList.remove("active-btn");
        }

        if (actList[id]["tags"].length > 0) {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("tags")[0]
                .classList.add("active-btn");
        } else {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("tags")[0]
                .classList.remove("active-btn");
        }

        if (actList[id]["billable"] == 0) {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("billable")[0]
                .classList.remove("active-btn");
        } else {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("billable")[0]
                .classList.add("active-btn");
        }

        if (
            actList[id]["timeList"].length % 2 == 0 &&
            actList[id]["isClosed"] === 0
        ) {

            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("ctrl-btn")[0].innerHTML =
                '<i class="fa-solid fa-play"></i> Start';
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("ctrl-btn")[0]
                .classList.remove("active-btn");
        } else {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("ctrl")[0].innerHTML =
                '<i class="fa-solid fa-pause"></i> Pause';
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("ctrl")[0]
                .classList.add("active-btn");
        }

        if (actList[id]["isClosed"] === 1) {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("ctrl")[0].innerHTML =
                '<i class="fa-solid fa-stop"></i> Closed';
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("ctrl")[0]
                .classList.remove("active-btn");
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
}

//// Update a sub-activity

function updateSubactivity(){
    let updateId = parseInt(
        arg.parentNode.getElementsByClassName("sub-activities")[0]
            .innerText
    );
    let nowTime = new Date();

    let startTimeList = updateId * 2 - 2;
    let endTimeList = startTimeList + 1;

    let currentStartDate = new Date(
        actList[id]["timeList"][startTimeList]
    );
    let currentEndDate = new Date(actList[id]["timeList"][endTimeList]);

    if (currentStartDate.getFullYear() < nowTime.getFullYear()) {
        nowTime = new Date(
            currentStartDate.getFullYear() +
                "-" +
                (currentStartDate.getMonth() + 1) +
                "-" +
                currentStartDate.getDate() +
                " 18:00:00"
        );
    } else if (currentStartDate.getMonth() < nowTime.getMonth()) {
        nowTime = new Date(
            currentStartDate.getFullYear() +
                "-" +
                (currentStartDate.getMonth() + 1) +
                "-" +
                currentStartDate.getDate() +
                " 18:00:00"
        );
    } else if (currentStartDate.getDate() < nowTime.getDate()) {
        nowTime = new Date(
            currentStartDate.getFullYear() +
                "-" +
                (currentStartDate.getMonth() + 1) +
                "-" +
                currentStartDate.getDate() +
                " 18:00:00"
        );
    }

    if ([endTimeList] in actList[id]["timeList"]) {
        currentEndDate = new Date(actList[id]["timeList"][endTimeList]); //Start current date
    } else {
        currentEndDate = nowTime;
    }

    let nowSeconds =
        nowTime.getHours() * 3600 +
        nowTime.getMinutes() * 60 +
        nowTime.getSeconds();

    let startDate =
        arg.parentNode.getElementsByClassName("start-time")[0].value;

    let startHour = startDate.slice(0, 2);
    let startMinutes = startDate.slice(3, 5);
    let startSeconds = startDate.slice(6, 8);

    let startTotalSeconds =
        parseInt(startHour) * 3600 +
        parseInt(startMinutes) * 60 +
        parseInt(startSeconds);

    let endDate =
        arg.parentNode.getElementsByClassName("end-time")[0].value;

    let endHour = endDate.slice(0, 2);
    let endMinutes = endDate.slice(3, 5);
    let endSeconds = endDate.slice(6, 8);

    let endTotalSeconds =
        parseInt(endHour) * 3600 +
        parseInt(endMinutes) * 60 +
        parseInt(endSeconds);

    // 18h = 64800s
    if (startTotalSeconds > endTotalSeconds) {
        alert("Error! End time greater than start time.");
    } else if (startTotalSeconds > 64800 || endTotalSeconds > 64800) {
        alert("Error! Time is past 18h00.");
    } else if (
        endTotalSeconds > nowSeconds ||
        startTotalSeconds > nowSeconds
    ) {
        alert(
            "Error! Time is in the future or it's past 18h00."
        );
    } else {
        currentStartDate.setHours(
            startHour,
            startMinutes,
            startSeconds
        );
        currentEndDate.setHours(endHour, endMinutes, endSeconds);

        actList[id]["timeList"][startTimeList] = currentStartDate;

        if ([endTimeList] in actList[id]["timeList"]) {
            actList[id]["timeList"][endTimeList] = currentEndDate;
        } else {
            actList[id]["timeList"].push(currentEndDate);
        }
        putActivity(id);
        iconUpdate(id);
    }
}

//Start a new activity or new time
function activityManager(id, arg) {
    let date = new Date();

    if (id == currentId + 1) {
        newActivity(id); 

        //Pass cache variable data to activity data

        actList[id]["project"] = cache["project"];
        actList[id]["tags"] = cache["tags"];
        actList[id]["billable"] = 0;
        actList[id]["isClosed"] = cache["isClosed"];

        //Inserts the title in the activity and date in the object.
        actList[id]["title"] = document
            .getElementById("activity-row-id")
            .getElementsByClassName("activity-title")[0].value;
        actList[id]["timeList"].push(date);

        //Reset cache variable and update currentId
        cache["project"] = [];
        cache["tags"] = [];
        cache["billable"] = false;

        //Update currentiD
        currentId++;

        //Reset input
        document
            .getElementById("activity-row-id")
            .getElementsByClassName("activity-title")[0].value = "";
        iconUpdate("creatorRow");

        //Post new activity to the database
        postActivity(id);

        //Create row with activity data
        createRow(id, date, arg);
        iconUpdate(id);
        createSubRow(id);
    } else {
        //Only insert new time
        actList[id]["timeList"].push(date);
        putActivity(id);
        document.getElementById("activity-table-" + id).innerHTML = "";
        createSubRow(id);
    }
}

//Create row for activity

let currentId = 0;
let dateTimerResume = {};

let weekTimerResume = {};

function createRow(id, date) {
    let weekStart = subtractDays(date.getDay(), date);

    createDateTitleResume(date); 

    dateTimerResume[
        date.getDate().toString() + date.getMonth().toString()
    ].push(id);
    weekTimerResume[
        weekStart.getDate().toString() + weekStart.getMonth().toString()
    ].push(id);

    let newRow = document.getElementById("activity-row-id").innerHTML;
    let actTable = document.getElementById(
        "date-title-" + date.getMonth() + "-" + date.getDate()
    );

    actTable.insertAdjacentHTML(
        "afterend",
        '<div id="activity-row-' +
            id +
            '" class="input-group">' +
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
            let startDate = new Date(actList[id]["timeList"][i]);
            let endDate = new Date(actList[id]["timeList"][i + 1]);

            let startTime =
                startDate.getHours() * 3600 +
                startDate.getMinutes() * 60 +
                startDate.getSeconds();
            let endTime =
                endDate.getHours() * 3600 +
                endDate.getMinutes() * 60 +
                endDate.getSeconds();

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
                    let calendarDate = new Date(actList[id]["timeList"][0]);
                    let calendarrealdate = String(
                        calendarDate.getFullYear() +
                            "-" +
                            ("0" + (calendarDate.getMonth() + 1)).slice(-2) +
                            "-" +
                            ("0" + calendarDate.getDate()).slice(-2)
                    );

                    document
                        .getElementById("calendar-act-" + id)
                        .getElementsByClassName("manual-date")[0]
                        .setAttribute("value", calendarrealdate);
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
                    let calendarDate = new Date(actList[id]["timeList"][0]);
                    let calendarrealdate = String(
                        calendarDate.getFullYear() +
                            "-" +
                            ("0" + (calendarDate.getMonth() + 1)).slice(-2) +
                            "-" +
                            ("0" + calendarDate.getDate()).slice(-2)
                    );

                    document
                        .getElementById("calendar-act-" + id)
                        .getElementsByClassName("manual-date")[0]
                        .setAttribute("value", calendarrealdate);
                }
            }
        }
    }
}



//Create title for resume (week)
function createWeekTitleResume(date) {
    let weekStart = subtractDays(date.getDay(), date);
    let weekEnd = addDays(7, weekStart);

    if (
        document.getElementById(
            "week-title-" + weekStart.getMonth() + "-" + weekStart.getDate()
        ) == null
    ) {
        document
            .getElementById("resume-table")
            .insertAdjacentHTML(
                "afterbegin",
                '<div id="week-title-' +
                    weekStart.getMonth() +
                    "-" +
                    weekStart.getDate() +
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
                    '.</div><div id="week-timer-' +
                    weekStart.getDate() +
                    weekStart.getMonth() +
                    '">Total of this week: <span class="timer"> 00:00:00</span></div></div>'
            );

        weekTimerResume[
            weekStart.getDate().toString() + weekStart.getMonth().toString()
        ] = [];
    }
}

//Create title for resume (day)
function createDateTitleResume(date) {
    if (
        document.getElementById(
            "date-title-" + date.getMonth() + "-" + date.getDate()
        ) == null
    ) {
        createWeekTitleResume(date);
        let weekStart = subtractDays(date.getDay(), date);
        document
            .getElementById(
                "week-title-" + weekStart.getMonth() + "-" + weekStart.getDate()
            )
            .insertAdjacentHTML(
                "afterend",
                '<div id="date-title-' +
                    date.getMonth() +
                    "-" +
                    date.getDate() +
                    '" class="resume-day-title d-flex justify-content-between"><div>' +
                    dayNames[date.getDay()] +
                    ", " +
                    monthNames[date.getMonth()] +
                    " " +
                    date.getDate() +
                    '.</div><div id="date-timer-' +
                    date.getDate() +
                    date.getMonth() +
                    '"> <span class="first-of-week">( <i class="fa-solid fa-award"></i> 1st)</span> Total: <span class="timer"> 00:00:00</span> <span class="timer-productive"></span></div></div>'
            );

        let timertitle = String(date.getDate()) + String(date.getMonth());

        allDateTimers = {
            timertitle: 0,
        };

        dateTimerResume[
            date.getDate().toString() + date.getMonth().toString()
        ] = [];
    }
}

//// MAIN BUTTON ACTION MANAGER ////

// This function takes the actions of the buttons and 
//  directs them to the respective set of functions

let id

function actionManager(arg) {
    
    //Get ID from differents elements    
    if (arg.parentNode.id.includes("activity-row-")) { 

        id = arg.parentNode.id.replace("activity-row-", ""); // Activity row ID

        if (id == "id") { // Activity insert row ID
            id = currentId + 1;
        }
    } else if (arg.parentNode.parentNode.id.includes("activity-table-")) { // Activity table ID
        id = arg.parentNode.parentNode.id.replace("activity-table-", "");
    } else {
        alert('caiu aqui') ////////<<<<<<<<<<<<
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
            if (id == currentId + 1) {                           //Create, start or pause an activity
                
                activityManager(id, arg);
                iconUpdate(id, arg);

            } else {
                if (actList[id]["isClosed"] !== 1) { //Id activity is not closed an activity, allow title change
                    if (
                        arg.parentNode.getElementsByClassName(
                            "activity-title"
                        )[0].value
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

        case arg.getAttribute("data-type").includes("update-subact"): //Update sub-activity 


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
                alert("Error! This cannot be deleted, delete the activity istead");
            }
            break;

        case arg.getAttribute("data-type").includes("update-calendar"): //Updates the date of an activity
            if (actList[id]["isClosed"] == 1) {
                alert("Activity closed");
            } else {
                let newDate = document
                    .getElementById("calendar-act-" + id)
                    .getElementsByClassName("manual-date")[0].value;

                let newDateYear = newDate.slice(0, 4); //ano
                let newDateMonth = parseInt(newDate.slice(5, 7)) - 1; //mes
                let newDateDay = newDate.slice(8, 10); //dia
                let currentDate;

                for (let i = 0; i < actList[id]["timeList"].length; i++) {
                    currentDate = new Date(actList[id]["timeList"][i]);

                    currentDate.setDate(newDateDay);
                    currentDate.setMonth(newDateMonth);
                    currentDate.setFullYear(newDateYear);

                    actList[id]["timeList"][i] = currentDate;
                }

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


//// TIMER UPDATER ////

!(function updateTimers() {
    setTimeout(updateTimers, 500); //Update every second.
    let newDate = new Date();
    for (let prop in actList) {
        //Check for all activities.
        let sum = 0;

        for (let i = 0; i < actList[prop]["timeList"].length - 1; i = i + 2) {
            //Sum of time of activity.
            sum =
                sum +
                Math.abs(
                    new Date(actList[prop]["timeList"][i + 1]) -
                        new Date(actList[prop]["timeList"][i])
                ) /
                    1000;
        }

        if (actList[prop]["timeList"].length % 2) {
            //Active timer.

            let updatedTimer = Math.round(
                sum +
                    Math.abs(
                        newDate -
                            new Date(
                                actList[prop]["timeList"][
                                    actList[prop]["timeList"].length - 1
                                ]
                            )
                    ) /
                        1000
            );

            document.getElementById("activity-row-" + prop).getElementsByClassName("timer")[0].innerText =  formatTime(updatedTimer); //Insert time in div.
        } else {
            let updatedTimer = Math.round(sum);
            document
                .getElementById("activity-row-" + prop)
                .getElementsByClassName("timer")[0].innerText =
                formatTime(updatedTimer); //Insert time in div.
        }
    }
    //update daily timers
    if (dateTimerResume) {
        for (let prop in dateTimerResume) {
            let sum = 0;

            for (let i = 0; i < dateTimerResume[prop].length; i++) {
                //Sum of time of activity.
                sum =
                    sum +
                    timestrToSec(
                        document
                            .getElementById(
                                "activity-row-" + dateTimerResume[prop][i]
                            )
                            .getElementsByClassName("timer")[0].innerText
                    );

                let dayProductivite = Math.round((sum / 28800) * 100);
                if (actList[dateTimerResume[prop][i]]["billable"] == 1) {
                    document
                        .getElementById("date-timer-" + prop)
                        .getElementsByClassName(
                            "timer-productive"
                        )[0].innerText = "(" + dayProductivite + "% work day)";
                }
            }

            document
                .getElementById("date-timer-" + prop)
                .getElementsByClassName("timer")[0].innerText = formatTime(
                sum
            ).slice(0, -3);
        }
    }
    //update week timers
    if (weekTimerResume) {
        let maiordetodos = 0;
        let variavelmaior = 0;

        for (let prop in weekTimerResume) {
            let sum = 0;
            for (let i = 0; i < weekTimerResume[prop].length; i++) {
                //Sum of time of activity.
                let daySum = timestrToSec(
                    document
                        .getElementById(
                            "activity-row-" + weekTimerResume[prop][i]
                        )
                        .getElementsByClassName("timer")[0].innerText
                );

                sum = sum + daySum;
            }
            document
                .getElementById("week-timer-" + prop)
                .getElementsByClassName("timer")[0].innerText = formatTime(
                sum
            ).slice(0, -3);
        }
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
        };
        let lastTime = new Date(
            actList[data[prop]["id"]]["timeList"][
                actList[data[prop]["id"]]["timeList"].length - 1
            ]
        );
        let thisTime = new Date();
        endDate = new Date(
            lastTime.getFullYear() +
                "-" +
                (lastTime.getMonth() + 1) +
                "-" +
                lastTime.getDate() +
                " 18:00:00"
        );

        createRow(
            data[prop]["id"],
            new Date(actList[data[prop]["id"]]["timeList"][0])
        );
        createSubRow(data[prop]["id"]);

        if (actList[data[prop]["id"]]["timeList"].length % 2 == 1) {
            if (lastTime.getFullYear() < thisTime.getFullYear()) {
                actList[data[prop]["id"]]["timeList"].push(endDate);
                closeActivity(data[prop]["id"]);
            } else if (lastTime.getMonth() < thisTime.getMonth()) {
                actList[data[prop]["id"]]["timeList"].push(endDate);
                closeActivity(data[prop]["id"]);
            } else if (lastTime.getDate() < thisTime.getDate()) {
                actList[data[prop]["id"]]["timeList"].push(endDate);
                closeActivity(data[prop]["id"]);
            } else if (lastTime.getHours() > 18 && lastTime.getMinutes() > 01) {
                actList[data[prop]["id"]]["timeList"].push(endDate);
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
            title: data[prop]["title"],
            description: data[prop]["description"],
            activities: data[prop]["activities"],
        };
    }
}

function recreateTags(data) {
    for (let prop in data) {
        tagList[data[prop]["id"]] = {
            title: data[prop]["title"],
            activities: data[prop]["activities"],
        };
    }
}



//// CONNECTION WITH API ////
// Projects

const url = "http://127.0.0.1:8000/api/";

function getProject() {
    axios.get(url + "projects/")
        .then((response) => {
            const data = response.data.data;
            recreateProjects(data);
        })
        .catch((error) => console.log(error));
}

getProject();

function postProject() {
    axios
        .post(url + "projects/", {
            title: "Mais um projeto javascript",
            description: "Esse foi criado pela API",
        })
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => console.log(error));
}

function putProject() {
    let id = 2;
    axios
        .put(url + "projects/" + id, {
            title: "Novo titulo 2323",
            description: "Nova des323crição",
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => console.log(error));
}
function deleteProject() {
    let id = 4;
    axios
        .delete(url + "projects/" + id)
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
}

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
            title: actList[id]["title"],
            project: JSON.stringify(actList[id]["project"]),
            tags: JSON.stringify(actList[id]["tags"]),
            billable: actList[id]["billable"],
            isClosed: actList[id]["isClosed"],
            timeList: JSON.stringify(actList[id]["timeList"]),
        })
        .then((response) => {
            console.log("Atividade criada com sucesso");
        })
        .catch((error) => console.log(error));
}

function putActivity(id) {
    let arg = {
        title: actList[id]["title"],
        project: JSON.stringify(actList[id]["project"]),
        tags: JSON.stringify(actList[id]["tags"]),
        billable: actList[id]["billable"],
        isClosed: actList[id]["isClosed"],
        timeList: JSON.stringify(actList[id]["timeList"]),
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

function postTag() {
    axios
        .post(url + "tags/", {
            title: "Mais um projeto javascript",
            description: "Esse foi criado pela API",
        })
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => console.log(error));
}

function putTag() {
    let id = 2;
    axios
        .put(url + "tags/" + id, {
            title: "Novo titulo 2323",
            description: "Nova des323crição",
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => console.log(error));
}
function deleteTag() {
    let id = 4;
    axios
        .delete(url + "tags/" + id)
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
}

////////
function getTime() {
    axios
        .get("http://worldtimeapi.org/api/timezone/America/Sao_Paulo")
        .then((response) => {
            console.log(response.data.datetime)
            return true
        })
        .catch((error) => console.log(error));
}


