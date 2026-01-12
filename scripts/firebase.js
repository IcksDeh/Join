// Wenn keine Fehler auftauchen, können die 3 Variablen gelöscht werden.
// let newUserID = 0;
// let user = [];
// let contacts = [];


async function putToStorage(path, Data, elements =""){
    let userStorage = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"},
        body: JSON.stringify(Data),    
        }
    );
    
    checkClearElements(path, elements)
}


function checkClearElements(path, elements){
    if(path == 'user' || path == 'contacts'){
        clearElements(elements);
    } else {
        clearInputs();
    }
}


function clearElements(elements){
    Object.values(elements).forEach(element =>{
        element.value = ""
    })
}


async function loadFirebaseData(path){
    let responseFirebaseData = await fetch(BASE_URL + path + ".json");
    let responseFirebaseDataToJSON = await responseFirebaseData.json();
    let firebaseKeys = Object.keys(responseFirebaseDataToJSON);
    await checkPushToArray(firebaseKeys, responseFirebaseDataToJSON, path);
}
 

async function checkPushToArray(firebaseKeys, responseFirebaseDataToJSON,  path){
    if (path == 'contacts'){
        await pushToContactsArray(firebaseKeys, responseFirebaseDataToJSON);
    } else if ( path == 'tasks'){
        await pushToTaskArray(firebaseKeys, responseFirebaseDataToJSON);
    } else {
        await pushToUserArray(firebaseKeys, responseFirebaseDataToJSON); 
    }    
}


async function pushToContactsArray(firebaseKeys, responseFirebaseDataToJSON){
    contactsList = [];   
    for (let index = 0; index < firebaseKeys.length; index++) {
        contactsList.push(
            {
                "id" : firebaseKeys[index],
                "contact": responseFirebaseDataToJSON[firebaseKeys[index]],
            }
        )
    }
    console.log(contactsList);
}


async function pushToTaskArray(firebaseKeys, responseFirebaseDataToJSON) {
    taskList = [];
    for (let index = 0; index < firebaseKeys.length; index++) {
        taskList.push(
            {
                "id": firebaseKeys[index],
                "task": responseFirebaseDataToJSON[firebaseKeys[index]],
            }
        )
    }
}


async function deleteTaskFromFirebase(taskID, path) {
    let userStorage = await fetch(BASE_URL + path + taskID +".json", {
        method: "DELETE",
        });
    closeTaskDetailDialog();
    location.reload();
}


async function updateSubtaskStatus(subtaskId, taskID, statusSubtask, taskIndex, taskContent){
    let userStorage = await fetch(BASE_URL + "tasks/" + taskID + "/" + "subtasks/" + subtaskId + "/done.json",{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(statusSubtask),
    });
    loadSummarySubtasks(taskID, taskIndex);
    loadCounterDoneSubtasks(taskID, taskIndex);
}


async function updateTaskStatus(category){
    let taskElement = await fetch(BASE_URL+ "tasks/"+ currentDraggedElementID + "/statusTask.json",{
        method: "PUT",
         headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    });
}   