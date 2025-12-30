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

async function loadFirebaseData(path, array){
    let responseFirebaseData = await fetch(BASE_URL + path + ".json");
    let responseFirebaseDataToJSON = await responseFirebaseData.json();
    let firebaseKeys = Object.keys(responseFirebaseDataToJSON);
    for (let index = 0; index < firebaseKeys.length; index++) {
        array.push(
            {
                "id" : firebaseKeys[index],
                "user": responseFirebaseDataToJSON[firebaseKeys[index]],
            }
        )
    }
    console.log(array);
}
    
