const BASE_URL = "https://join-f5da0-default-rtdb.europe-west1.firebasedatabase.app/";
let newUserID = 0;
let user = [];
let contacts = [];

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
    console.log(taskList);
}