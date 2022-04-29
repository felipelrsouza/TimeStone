///// DATE AND TIME FUNCTIONS ////
let userTime = new Date()

function showAlert(msg){
    if(msg == null){
        return
    }
        document.getElementById('alert').innerText = msg
        document.getElementById('alert').classList.add("visible-alert")
        document.getElementById('alert').classList.remove("hidden-alert")

        setTimeout(() => {

        document.getElementById('alert').classList.remove("visible-alert")
        document.getElementById('alert').classList.add("hidden-alert")
        }
        , 2750)   
}

function autoCloseActivity(id, delay){
    let actDateLimit
    if(typeof(actList[id]) == 'object'){
        actDateLimit = new Date(actList[id]["timeList"][0])   

        actDateLimit.setHours(actList[id]["autoStop"].slice(0,2)) //activity limit hour
        actDateLimit.setMinutes(actList[id]["autoStop"].slice(3,5)) //activity limit minutes
        actDateLimit.setSeconds(actList[id]["autoStop"].slice(6,8)) //activity limit seconds

        if(delay == null){
            let nowTime = getNewDate();
            autoCloseActivity(id, actDateLimit - nowTime)
            return
        }

    }else{
        return
    }
 
    setTimeout(() => {

        nowTime = getNewDate();

        if(nowTime >= actDateLimit){
            actList[id]["timeList"].push(actDateLimit);
            closeActivity(id);

        }else{
            autoCloseActivity(id, actDateLimit - nowTime)
        }     
      }, delay)
}

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

function formatDate(date){
    string = date.getFullYear()+'-'+zeroPad(date.getMonth()+1,2)+'-'+zeroPad(date.getDate(),2)
    return string
}

function getTimeZone(time){
    let gmtHours = parseInt(time.toTimeString().slice(13,15)) // Horas
    let gmtMinutes = parseInt(time.toTimeString().slice(15,17)) // minutos

    if(userTime.toTimeString().indexOf('+')){

       TimeDiffMin = -(gmtHours*60 + gmtMinutes)
       return TimeDiffMin

   }else if(userTime.toTimeString().indexOf('-')){

       TimeDiffMin = +(gmtHours*60 + gmtMinutes)
       return TimeDiffMin

   }else{

       showAlert('Houve um erro ao obter o tempo')
       return 0
       
   }
}

let userTimeZone = getTimeZone(userTime)
  
//To debug server time
//let serverTime = (new Date((new Date()).setMinutes(userTime.getMinutes()+10))).toISOString()

let trustedTime = 0
let timeCorrector = new Array // 0 -> Year, 1 -> Month, 2 -> Date, 3 -> Hour, 4 -> Minutes, 5 -> Seconds.

if(Math.abs(new Date(serverTime) - userTime)<5000){ //Timer do usuário é confiável
    
    timeCorrector[0] = 0 //Year
    timeCorrector[1] = 0 //Month
    timeCorrector[2] = 0 //Date
    timeCorrector[3] = 0 //Hour
    timeCorrector[4] = 0 //Minutes
    timeCorrector[5] = 0 //Seconds
    trustedTime = 1
    

}else{ //Timer do usuário não é confiável

    timeCorrector[0] = (parseInt(serverTime.slice(0,4))) - parseInt(userTime.toISOString().slice(0,4)) //Year
    timeCorrector[1] = (parseInt(serverTime.slice(5,7)))-1 - parseInt(userTime.toISOString().slice(5,7)-1) //Month
    timeCorrector[2] = (parseInt(serverTime.slice(8,10))) - parseInt(userTime.toISOString().slice(8,10)) //Date
    timeCorrector[3] = (parseInt(serverTime.slice(11,13))) - parseInt(userTime.toISOString().slice(11,13)) //Hour
    timeCorrector[4] = (parseInt(serverTime.slice(14,16))) - parseInt(userTime.toISOString().slice(14,16)) //Minutes
    timeCorrector[5] = (parseInt(serverTime.slice(17,19))) - parseInt(userTime.toISOString().slice(17,19)) //Seconds
    trustedTime = 0
}

function getNewDate(){

    if(trustedTime == 1){
        return new Date()
    }else{

    let currentDate = new Date().toISOString()

    let newDate = new Date(Date.UTC(
        parseInt(currentDate.slice(0,4)) + timeCorrector[0],
        parseInt(currentDate.slice(5,7)) -1 + timeCorrector[1],
        parseInt(currentDate.slice(8,10)) + timeCorrector[2],
        parseInt(currentDate.slice(11,13)) + timeCorrector[3],
        parseInt(currentDate.slice(14,16)) + timeCorrector[4],
        parseInt(currentDate.slice(17,19)) + timeCorrector[5]
    ))

    return newDate
    }
}

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

//Create a new project data in projList
function newProject(id) {
    projList[id] = {
        title: "",
        description: "",
        activities: [],
    };
}

//Create a new activity data in actList
function createActivity(id) {
    let date = getNewDate();
    actList[id] = {
        title: "",
        project: [],
        tags: [],
        autoStop: "23:59:00"+userTime.toTimeString().slice(8,17),
        timeList: [date.toISOString()],
        isClosed: 0,
    };
}

//// CACHE VARIABLE FOR ACTIVITIES NOT YET CREATED.
let cache = {
    id: 1,
    project: [],
    tags: [],
    autoStop: "23:59:00"+userTime.toTimeString().slice(8,17),
    isClosed: 0,
};

//// PROJECTS AND TAGS RELATED FUNCTIONS ////

//Insert and remove a project from a activity
function projectsManager(id, projectId, arg) {
    if (actList[id]) {
        //If activity has been created

        if (actList[id]["project"].includes(projectId)) {
            removeItemOnce(actList[id]["project"], projectId);
            removeItemOnce(projList[projectId]["activities"], id);
            arg.classList.remove("selected");
            putActivity(id, 'Activity '+id+' is no longer part of the project.');
            putProject(projectId);
            iconUpdate(id);
        } else {
            actList[id]["project"].push(projectId);
            projList[projectId]["activities"].push(id);

            arg.classList.add("selected");

            putActivity(id, 'Activity '+id+' is now part of the project');
            putProject(projectId);

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
            putActivity(id, 'Tag removed.');
            iconUpdate(id);
        } else {
            actList[id]["tags"].push(tagId);
            arg.classList.add("selected");
            putActivity(id, 'Tag inserted.');
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

function closeActivity(id, arg) {
    if (actList[id]["isClosed"] == 0) {
        if (actList[id]["timeList"].length % 2) {
            activityManager(id, arg);
        }

        actList[id]["isClosed"] = 1;
        putActivity(id, 'Done.');
        iconUpdate(id);

        document.getElementById("activity-table-" + id).innerHTML = "";
        createSubRow(id);
    } else {
        showAlert("Unable to reactivate activity.");
    }
}

//Update row icons

function iconUpdate(id) {
    timersManager();

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

        if (cache["autoStop"].includes('23:59:00')) { 
            document
                .getElementById("activity-row-id")
                .getElementsByClassName("auto-stop")[0]
                .classList.remove("btn-secondary");     
            } else {
            document
                .getElementById("activity-row-id")
                .getElementsByClassName("auto-stop")[0]
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
        if (actList[id]["autoStop"].includes('23:59:00')) {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("auto-stop")[0]
                .classList.remove("btn-secondary");
        } else {
            document
                .getElementById("activity-row-" + id)
                .getElementsByClassName("auto-stop")[0]
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
                .getElementsByClassName("auto-stop")[0]
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

let activeTimers = [];
let activeDailyTimers = {};
let activeWeeklyTimers = {};

function timersManager() {
    stopPassiveUpdate = 0;

    for (var prop in actList) {
        let actDate = new Date(actList[prop]["timeList"][0])
        if (actList[prop]["timeList"].length % 2) {
            // Está ativo

            if (activeTimers.includes(prop)) {
            } else {
                activeTimers.push(prop);
            }
        } else {
            if (activeTimers.includes(prop)) {
                removeItemOnce(activeTimers, prop);
            } else {
            }
        }

        let idActDate = formatDate(actDate)

        if (!(idActDate in activeDailyTimers)) {
            activeDailyTimers[idActDate] = [];
            activeDailyTimers[idActDate].push(prop);
        } else {
            if (activeDailyTimers[idActDate].includes(prop) == false) {
                activeDailyTimers[idActDate].push(prop);
            }
        }

        let weekStart = subtractDays(actDate.getDay(), actDate)
        let idWeekStart = formatDate(weekStart)

        if (!(idWeekStart in activeWeeklyTimers)) {
            activeWeeklyTimers[idWeekStart] = [];
            activeWeeklyTimers[idWeekStart].push(prop);
        } else {
            if (activeWeeklyTimers[idWeekStart].includes(prop) == false) {
                activeWeeklyTimers[idWeekStart].push(prop);
            }
        }
    }
}

//// Update a sub-activity

function changeSubactTime(id, arg) {
    let itemId = parseInt(
        arg.parentNode.getElementsByClassName("sub-activities")[0].innerText
    ); //Get activity ID

    let nowTime = getNewDate(); //Get current time to compare later

    let startTimeIndex = itemId * 2 - 2; //Get index in array of sub-activity (start time)
    let endTimeIndex = startTimeIndex + 1; //Index of end time

    //Current sub-activity time

    let actDate = new Date(actList[id]["timeList"][0])
    let actDateGMT = getTimeZone(actDate)  

    let userStartTime =
        arg.parentNode.getElementsByClassName("start-time")[0].value;

    let startHours = parseInt(userStartTime.slice(0, 2)); //hours
    let startMinutes = parseInt(userStartTime.slice(3, 5)); //minutes
    let startSeconds = parseInt(userStartTime.slice(6, 8)); //seconds

    let startDateTime = new Date(
        Date.UTC(
            actDate.getUTCFullYear() + timeCorrector[0],
            actDate.getUTCMonth() + timeCorrector[1],
            actDate.getUTCDate() + timeCorrector[2],
            startHours + timeCorrector[3],
            startMinutes + timeCorrector[4] - actDateGMT,
            startSeconds + timeCorrector[5]
        )
    );

    let userEndTime =
        arg.parentNode.getElementsByClassName("end-time")[0].value;
        
        let endDateTime

   if(userEndTime.includes(':')){
    let endHours = parseInt(userEndTime.slice(0, 2)); //hours
    let endMinutes = parseInt(userEndTime.slice(3, 5)); //minutes
    let endSeconds = parseInt(userEndTime.slice(6, 8)); //seconds
    

    endDateTime = new Date(
        Date.UTC(
            actDate.getUTCFullYear() + timeCorrector[0],
            actDate.getUTCMonth() + timeCorrector[1],
            actDate.getUTCDate() + timeCorrector[2],
            endHours + timeCorrector[3],
            endMinutes + timeCorrector[4] - actDateGMT,
            endSeconds + timeCorrector[5]
        )
    );  
   }else{
        endDateTime = null
   } 

    let actDateLimit = new Date(actList[id]["timeList"][0])        
    actDateLimit.setHours(actList[id]["autoStop"].slice(0,2)) //activity limit hour
    actDateLimit.setMinutes(parseInt(actList[id]["autoStop"].slice(3,5))) //activity limit minutes
    actDateLimit.setSeconds(actList[id]["autoStop"].slice(6,8)) //activity limit seconds

    if (startDateTime > endDateTime && endDateTime !== null) {
        showAlert("Error! End time is greater than start time.");
        return
    } else if (startDateTime > actDateLimit || (endDateTime > actDateLimit && endDateTime !== null)) {
        showAlert("Error! Time is past activity limit.");
        return
    } else if (startDateTime > nowTime || (endDateTime > nowTime && endDateTime !== null)) {
        showAlert("Error! Time is in the future.");
        return
    } else {
        actList[id]["timeList"][startTimeIndex] = startDateTime.toISOString();
        if ([endTimeIndex] in actList[id]["timeList"]) {
            actList[id]["timeList"][endTimeIndex] = endDateTime.toISOString();
        } else {
            if(endDateTime !== null){
            actList[id]["timeList"].push(endDateTime.toISOString());
            }
        }
        putActivity(id, 'Done.');
        timersManager()
        iconUpdate(id);        
    }
}

//Start a new activity or new time
function activityManager(id, arg) {

    if (id == currentId + 1) {

        createActivity(id)

        //Pass cache variable data to activity data
        actList[id]["title"] = document
            .getElementById("activity-row-id")
            .getElementsByClassName("activity-title")[0].value;
        actList[id]["project"] = cache["project"];
        actList[id]["tags"] = cache["tags"];
        actList[id]["autoStop"] = cache["autoStop"];
        actList[id]["isClosed"] = 0;

        //Reset cache variable and update currentId
        cache = {
            project: [],
            tags: [],
            autoStop: "23:59:00"+userTime.toTimeString().slice(8,17),
            isClosed: 0,
        };

        currentId++;

        //If any, insert activity into projList

        for (let i = 0; i < actList[id]["project"].length; i++) {
            projId = actList[id]["project"][i];
            if (projList[projId]["activities"].includes(id) == 0) {
                projList[projId]["activities"].push(id);

                putProject(projId);
            }
        }
        //Reset input
        document
            .getElementById("activity-row-id")
            .getElementsByClassName("activity-title")[0].value = "";
        document
            .getElementById("activity-row-id")
            .getElementsByClassName("act-id-input")[0].value = (currentId+1);

        iconUpdate("creatorRow");

        //Post new activity to the database
        
        postActivity(id,'Activity '+id+' created.');

        //Create row with activity data
        createRow(id, arg);
        createSubRow(id);
        autoCloseActivity(id)
        iconUpdate(id);
    } else {
        //Only insert a new time

        actList[id]["timeList"].push(getNewDate().toISOString());
        putActivity(id);
        createSubRow(id);
        iconUpdate(id);
    }
}

//Create row for activity

let currentId = 0;

function createRow(id) {
    date = new Date(actList[id]["timeList"][0]);

    createDateTitleResume(id);

    let newRow = document.getElementById("activity-row-id").innerHTML;
    let actTable = document.getElementById(
        "date-title-" + actList[id]["timeList"][0].slice(0, 10)
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
        .getElementsByClassName("act-id-input")[0].value = id;
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
                    let activityDate = actList[id]["timeList"][0].slice(0, 10);
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
                    let activityDate = actList[id]["timeList"][0].slice(0, 10);
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
    let actDate = new Date(actList[id]['timeList'][0])
    let weekStart = subtractDays(actDate.getDay(), actDate)
    let weekEnd = addDays(6, weekStart);
    if (
        document.getElementById(
            "week-title-" + formatDate(weekStart).slice(0, 10)
        ) == null
    ) {
        document
            .getElementById("resume-table")
            .insertAdjacentHTML(
                "afterbegin",
                '<div id="week-title-' +
                formatDate(weekStart).slice(0, 10) +
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
                    formatDate(weekStart).slice(0, 10) +
                    '">Total of this week: <span class="timer"> 00:00:00</span></div></div>'
            );
    }
}

//Create title for resume (day)
function createDateTitleResume(id) {
    createWeekTitleResume(id);

    let actDate = new Date(actList[id]["timeList"][0]);

    if (
        document.getElementById(
            "date-title-" + actList[id]["timeList"][0].slice(0, 10)
        ) == null
    ) {
        let weekStart = subtractDays(actDate.getDay(), actDate)

        document
            .getElementById(
                "week-title-" + formatDate(weekStart)
            )
            .insertAdjacentHTML(
                "afterend",
                '<div id="date-title-' +
                    actList[id]["timeList"][0].slice(0, 10) +
                    '" class="resume-day-title d-flex justify-content-between"><div>' +
                    dayNames[actDate.getDay()] +
                    ", " +
                    monthNames[actDate.getMonth()] +
                    " " +
                    actDate.getDate() +
                    ' - <span class="timer-productive"></span><span class="first-of-week d-none"> - <i class="fa-solid fa-award"></i> 1st of week</span></div><div id="date-timer-' +
                    actList[id]["timeList"][0].slice(0, 10) +
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
            // Activity inseractivityManagert row ID
            id = currentId + 1;
        }
    } else if (arg.parentNode.parentNode.id.includes("activity-table-")) {
        // Activity table ID
        id = arg.parentNode.parentNode.id.replace("activity-table-", "");
    } else {
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
                showAlert("Activity is closed.");
            } else {
                if (arg.value) {
                    actList[id]["title"] = arg.value;
                    putActivity(id)                  
                }
            }
            break;
        case arg.getAttribute("data-type").includes("update-id"): // Update ID of activity
            newId =
                arg.parentNode.getElementsByClassName("act-id-input")[0].value;

            if (newId in actList) {
                showAlert("Error! ID already in use.");
            } else {
                if (id in actList) {
                    actList[newId] = actList[id];
                    delete actList[id];

                    for (var prop in projList) {
                        if (projList[prop]["activities"].includes(id)) {
                            removeItemOnce(projList[prop]["activities"], id);
                            projList[prop]["activities"].push(newId);
                            putProject(prop);
                        }
                    }
                    deleteActivity(id);
                    postActivity(newId,'Activity ID updated.');
                } else {
                    cache[id] = newId;
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
        case arg.getAttribute("data-type").includes("auto-stop"): //If is to set an auto stop time
                if(arg.getAttribute("data-action").includes("open-modal")){
                //Insert activity id in modal
                document.getElementById('auto-stop-modal').getElementsByClassName('btn')[1].setAttribute('act-id',id)
                    
                    if(id == currentId +1){ // If activity doesnt exists
                        //verificar se gmt é igual  
                        document.getElementById('auto-stop-time').value = cache['autoStop'].slice(0,8)

                    }else{ // If activity exists

                        document.getElementById('auto-stop-time').value = actList[id]['autoStop'].slice(0,8)

                    }             
                }
                if(arg.getAttribute("data-action").includes("new-auto-stop")){
                    id = arg.getAttribute("act-id")

                    if(id == currentId +1){

                        cache['autoStop'] = document.getElementById('auto-stop-time').value + userTime.toTimeString().slice(8,17)
                        iconUpdate("creatorRow")

                    }else{

                        actList[id]['autoStop'] = document.getElementById('auto-stop-time').value + userTime.toTimeString().slice(8,17)
                        putActivity(id)
                        autoCloseActivity(id)
                        iconUpdate(id)
                    }     
                }
            break;
        case arg.getAttribute("data-type").includes("ctrl-btn"): //Start the activity manager
            if (id == currentId + 1) {
                //Create, start or pause an activity
                let input = arg.parentNode.parentNode.getElementsByClassName('activity-title')[0]
                if(input.value == ""){
                    showAlert('Error! Activity must have a title.')
                    return
                }


                activityManager(id, arg);
            } else {
                if (actList[id]["isClosed"] !== 1) {
                    //Id activity is not closed an activity, allow title change
                    if (
                        arg.parentNode.getElementsByClassName(
                            "activity-title"
                        )[0].value
                    ) {
                        activityManager(id, arg);
                        document.getElementById(
                            "activity-table-" + id
                        ).innerHTML = "";
                        createSubRow(id);
                        iconUpdate(id);
                    } else {
                        showAlert("Enter a title.");
                    }
                } else {
                    showAlert("Activity is closed.");
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
                iconUpdate(id);
                document.getElementById("activity-table-" + id).innerHTML = "";
                createSubRow(id);
                putActivity(id);
            } else {
                showAlert(
                    "Error! This cannot be deleted, delete the activity instead."
                );
            }
            break;

        case arg.getAttribute("data-type").includes("update-calendar"): //Updates the date of an activity
            let nowTime = getNewDate();
            let userInput = document
                .getElementById("calendar-act-" + id)
                .getElementsByClassName("manual-date")[0].value;

            let userInputDate = parseInt(userInput.slice(8, 10)); //Date
            let userInputMonth = parseInt(userInput.slice(5, 7)) - 1; //Month
            let userInputYear = parseInt(userInput.slice(0, 4)); //Year

            let actDate = new Date(actList[id]["timeList"][0]);
            let actDateGMT = getTimeZone(actDate)

            let lastActDate = new Date(actList[id]['timeList'][actList[id]['timeList'].length -1])
            let newLastActDate = new Date(Date.UTC(
                userInputYear + timeCorrector[0],
                userInputMonth + timeCorrector[1],
                userInputDate + timeCorrector[2],
                lastActDate.getHours() + timeCorrector[3],
                lastActDate.getMinutes() + timeCorrector[4] - actDateGMT,
                lastActDate.getSeconds() + timeCorrector[5]
            ))

            if (newLastActDate > nowTime) {
                showAlert("Error! Date is in the future.");
            } else {

                for (let date in actList[id]['timeList']) {

                    let oldDate = new Date(actList[id]['timeList'][date])
                    
                    actList[id]['timeList'][date] = (new Date(Date.UTC(
                        userInputYear + timeCorrector[0],
                        userInputMonth + timeCorrector[1],
                        userInputDate + timeCorrector[2],
                        oldDate.getHours() + timeCorrector[3],
                        oldDate.getMinutes() + timeCorrector[4] - actDateGMT,
                        oldDate.getSeconds() + timeCorrector[5]
                    ))).toISOString()
                }
                actDate = new Date(actList[id]["timeList"][0]);
                let userWeekStart = subtractDays(actDate.getDay(), actDate);
                actList[id]["weekStart"] = userWeekStart.toISOString();
                putActivity(id);
                document.location.reload();
            }

            break;
        case arg.getAttribute("data-type").includes("close-activity"): //Close acitivity
            closeActivity(id);

            break;
        default:
            showAlert("Houve um erro. Contate o administrador do site.");
    }
}

let stopPassiveUpdate = 0;

//// TIMER UPDATER ////

!(function updateTimers() {  

    if(Object.keys(actList).length == 0){
        setTimeout(updateTimers, 1000); //Update every 0.5 second.
        return
    }

    setTimeout(updateTimers, 500); //Update every 0.5 second.

    let nowTime = getNewDate();

    //Update activity timers

    for (let i = 0; i < activeTimers.length; i++) {
        let sum = 0;
        let itemId = activeTimers[i];

        for (let i = 0; i < actList[itemId]["timeList"].length - 1; i = i + 2) {
            let startDate = new Date(actList[itemId]["timeList"][i]);
            let endDate = new Date(actList[itemId]["timeList"][i + 1]);
            let actDate = new Date(actList[itemId]['timeList'][0]);

            startDate.setFullYear(actDate.getUTCFullYear());
            startDate.setDate(actDate.getUTCDate());
            startDate.setMonth(actDate.getUTCMonth()-1);

            endDate.setFullYear(actDate.getUTCFullYear());
            endDate.setDate(actDate.getUTCDate());
            endDate.setMonth(actDate.getUTCMonth()-1);

            sum = sum + Math.abs(endDate - startDate) / 1000;
        }

        let newTimerValue = Math.round(
            sum +
                Math.abs(
                    nowTime -
                        new Date(
                            actList[itemId]["timeList"][
                                actList[itemId]["timeList"].length - 1
                            ]
                        )
                ) /
                    1000
        );
        document
            .getElementById("activity-row-" + itemId)
            .getElementsByClassName("timer")[0].innerText =
            formatTime(newTimerValue);
    }

    //Update passive activities timers
    if (stopPassiveUpdate == 0) {
        //If any passive timers has changed
        for (let itemId in actList) {
            let sum = 0;

            if (actList[itemId]["timeList"].length % 2 == 0) {
                //Está passivo

                for (
                    let i = 0;
                    i < actList[itemId]["timeList"].length - 1;
                    i = i + 2
                ) {
                    let startDate = new Date(actList[itemId]["timeList"][i]);
                    let endDate = new Date(actList[itemId]["timeList"][i + 1]);
                    let actDate = new Date(actList[itemId]["timeList"][0]);

                    startDate.setFullYear(actDate.getUTCFullYear());
                    startDate.setDate(actDate.getUTCDate());
                    startDate.setMonth(actDate.getUTCMonth()-1);

                    endDate.setFullYear(actDate.getUTCFullYear());
                    endDate.setDate(actDate.getUTCDate());
                    endDate.setMonth(actDate.getUTCMonth()-1);

                    sum = sum + Math.abs(endDate - startDate) / 1000;
                }

                let newTimerValue = Math.round(sum);
                document
                    .getElementById("activity-row-" + itemId)
                    .getElementsByClassName("timer")[0].innerText =
                    formatTime(newTimerValue);
            }
            stopPassiveUpdate = 1;
        }
    }

    let longerTimer = 0;
    let longerTimerId;
    let oldLongerTimerId;

    // //Update Daily timers
    for (let datestring in activeDailyTimers) {
        let sum = 0;
        let actSum = 0;

        for (let i = 0; i < activeDailyTimers[datestring].length; i++) {
            let itemId = activeDailyTimers[datestring][i];
            
            actSum = timestrToSec(
                document
                    .getElementById("activity-row-" + itemId)
                    .getElementsByClassName("timer")[0].innerText
            );
            sum = sum + actSum;
        }

        if (sum > longerTimer) {
            //Set the longer day in the week
            if (longerTimerId != null) {
                oldLongerTimerId = longerTimerId;
            }
            longerTimer = sum;
            longerTimerId = actList[activeDailyTimers[datestring][0]]["timeList"][0].slice(0, 10);            
        }

        dayTimerId = getKeyByValue(
            activeDailyTimers,
            activeDailyTimers[datestring]
        );
        
        document
            .getElementById("date-title-" + dayTimerId)
            .getElementsByClassName("timer")[0].innerText = formatTime(
            sum
        ).slice(0, -3);
        document
            .getElementById("date-title-" + dayTimerId)
            .getElementsByClassName("timer-productive")[0].innerText =
            Math.round((sum / 28800) * 100) + "% prod.";
    }

    //Get largest day in week
    if (longerTimerId != null) {
        if (oldLongerTimerId != null) {
            timersManager();
            document
                .getElementById("date-title-" + oldLongerTimerId)
                .getElementsByClassName("first-of-week")[0]
                .classList.add("d-none"); // Show/hide largest day icon
        }
        document
            .getElementById("date-title-" + longerTimerId)
            .getElementsByClassName("first-of-week")[0]
            .classList.remove("d-none"); // Show/hide largest day icon
    }

    // //Update Weekly timers
    for (let weekstring in activeWeeklyTimers) {
        //Roda nos dias por semana
        let sum = 0;
        let actSum = 0;

        for (let i = 0; i < activeWeeklyTimers[weekstring].length; i++) {
            //Roda por dia
            let itemId = activeWeeklyTimers[weekstring][i];
            actSum = timestrToSec(
                document
                    .getElementById("activity-row-" + itemId)
                    .getElementsByClassName("timer")[0].innerText
            );

            sum = sum + actSum;
        }

        weekTimerId = getKeyByValue(
            activeWeeklyTimers,
            activeWeeklyTimers[weekstring]
        );

        document
            .getElementById("week-timer-" + weekTimerId)
            .getElementsByClassName("timer")[0].innerText = formatTime(
            sum
        ).slice(0, -3);
    }

    //Update projects timers
    for (let projID in projList) {
        let projTimer = 0;

        for (let i = 0; i < projList[projID]["activities"].length; i++) {
            let actId = projList[projID]["activities"][i];
            if(document.getElementById("activity-row-" + actId)){
            actTimer = timestrToSec(
                document
                    .getElementById("activity-row-" + actId)
                    .getElementsByClassName("timer")[0].innerText
            );
            projTimer = projTimer + actTimer;
        }
        }

        document
            .getElementById("project-card-" + projID)
            .getElementsByClassName("proj-timer")[0].innerText = formatTime(
            projTimer
        ).slice(0, -3);
    }

})();

function recreateActivities(data) {
    for (var prop in data) {

        actList[data[prop]["id"]] = {
            title: data[prop]["title"],
            project: JSON.parse(data[prop]["project"]),
            tags: JSON.parse(data[prop]["tags"]),
            autoStop: data[prop]["autoStop"],
            isClosed: data[prop]["isClosed"],
            timeList: JSON.parse(data[prop]["timeList"]),
        };

        //Activity limit time

        let actDate = new Date(actList[data[prop]["id"]]["timeList"][0]);
        let actDateTimeZone = getTimeZone(actDate)

        let actDateLimit = new Date(actList[data[prop]["id"]]["timeList"][0])        
        actDateLimit.setHours(actList[data[prop]["id"]]["autoStop"].slice(0,2)) //activity limit hour
        actDateLimit.setMinutes(parseInt(actList[data[prop]["id"]]["autoStop"].slice(3,5)) - (actDateTimeZone - userTimeZone)) //activity limit minutes
        actDateLimit.setSeconds(actList[data[prop]["id"]]["autoStop"].slice(6,8)) //activity limit seconds

        //User time
        let nowTime = getNewDate();

        createRow(data[prop]["id"], actDate);
        createSubRow(data[prop]["id"]);

        //Se atividade está pausada e aberta
        if (actList[data[prop]["id"]]["timeList"].length % 2 == 0 && actList[data[prop]["id"]]["isClosed"] == 0) {             
            if (nowTime >= actDateLimit) {  
                actList[data[prop]["id"]]["timeList"][actList[data[prop]["id"]]["timeList"].length - 1] = actDateLimit.toISOString();
                closeActivity(data[prop]["id"]);
            }else{
                autoCloseActivity(data[prop]["id"], actDateLimit - nowTime)
            }                            
        }

        //Se atividade está ativa
        if (actList[data[prop]["id"]]["timeList"].length % 2) { 
            if (nowTime >= actDateLimit) {
                actList[data[prop]["id"]]["timeList"].push(actDateLimit);
                closeActivity(data[prop]["id"]);
            } else{
                autoCloseActivity(data[prop]["id"], actDateLimit - nowTime)
            }
        }
        
        if (data[prop]["id"] >= currentId) {
            currentId = parseInt(data[prop]["id"]) + 1;
            document
                .getElementById("activity-row-id")
                .getElementsByClassName("act-id-input")[0].value =
                currentId;
        }
    }    
}

function recreateProjects(data) {
    for (let prop in data) {
        new newProject(data[prop]["id"]);

        projList[data[prop]["id"]] = {
            title: data[prop]["title"],
            description: data[prop]["description"],
            activities: JSON.parse(data[prop]["activities"]),
        };

        let idProject = data[prop]["id"];

        if (projList[idProject]["activities"] == null) {
            projList[idProject]["activities"] = [];
        }
        let projTable = document.getElementById("project-cards");
        let card = document.getElementById("project-card-id").innerHTML;

        projTable.insertAdjacentHTML(
            "beforeend",
            '<div id="project-card-' +
                idProject +
                '" class="col-sm-3 pt-3">' +
                card +
                "</div>"
        );
        document
            .getElementById("project-card-" + idProject)
            .getElementsByClassName("card-title")[0].innerText =
            idProject + " - " + projList[idProject]["title"];
        document
            .getElementById("project-card-" + idProject)
            .getElementsByClassName("card-text")[0].innerText =
            projList[idProject]["description"];
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

function getProject() {
    axios
        .get(apiURL + "projects")
        .then((response) => {
            const data = response.data.data;
            recreateProjects(data);
        })
        .catch((error) => showAlert("Error getting data from server."));
}

getProject();

function putProject(id) {

    let arg = {
        title: projList[id]["title"],
        description: projList[id]["description"],
        activities: JSON.stringify(projList[id]["activities"]),
    };
    axios
        .put(apiURL + "projects/" + id, arg)
        .then((response) => {
            showAlert("Project "+id+" updated.");
        })
        .catch((error) => showAlert("Error entering data on the server."));
}

// Activities

function getActivity() {
    axios
        .get(apiURL + "activities")
        .then((response) => {
            let data = response.data.data;
            recreateActivities(data);
        })
        .catch((error) => showAlert("Error getting data from server."));
}

getActivity();

function postActivity(id,msg) {
    axios
        .post(apiURL + "activities", {
            id: id,
            title: actList[id]["title"],
            project: JSON.stringify(actList[id]["project"]),
            tags: JSON.stringify(actList[id]["tags"]),
            autoStop: actList[id]["autoStop"],
            isClosed: actList[id]["isClosed"],
            timeList: JSON.stringify(actList[id]["timeList"]),
        })
        .then((response) => {
            showAlert(msg);
        })
        .catch((error) => showAlert("Error inserting data on the server."));
}

function putActivity(id,msg) {
    let arg = {
        id: id,
        title: actList[id]["title"],
        project: JSON.stringify(actList[id]["project"]),
        tags: JSON.stringify(actList[id]["tags"]),
        autoStop: actList[id]["autoStop"],
        isClosed: actList[id]["isClosed"],
        timeList: JSON.stringify(actList[id]["timeList"]),
    };

    axios
        .put(apiURL + "activities/" + id, arg)
        .then((response) => {
            showAlert(msg);
        })
        .catch((error) => showAlert('Error inserting data on the server.'));
}

function deleteActivity(id) {
    delete actList[id];
    for (var prop in projList) {
        if (projList[prop]["activities"].includes(id)) {
            removeItemOnce(projList[prop]["activities"], id);
            putProject(prop);
        }else if(projList[prop]["activities"].includes('"'+id+'"'))
        removeItemOnce(projList[prop]["activities"], '"'+id+'"');
            putProject(prop);
    }    
    axios
        .delete(apiURL + "activities/" + id)
        .then((response) => document.location.reload())
        .catch((error) => showAlert("Error deleting data on the server."));
}

//Tags

function getTag() {
    axios
        .get(apiURL + "tags")
        .then((response) => {
            const data = response.data.data;
            recreateTags(data);
        })
        .catch((error) => showAlert("Error getting data from server."));
}

getTag();
