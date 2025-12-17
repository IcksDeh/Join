const BASE_URL = "https://join-f5da0-default-rtdb.europe-west1.firebasedatabase.app/";
let newUserID = 0;
let users = [];

async function putToStorage(path, userData){
    let userStorage = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"},
        body: JSON.stringify(userData),    
        }
    );
    clearElements();
}

function clearElements(){
    const elements = getElementsUser();
    Object.values(elements).forEach(element =>{
        element.value = ""
    })
}
