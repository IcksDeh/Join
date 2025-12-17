const BASE_URL = "https://join-f5da0-default-rtdb.europe-west1.firebasedatabase.app/";
let newUserID = 0;
let users = [];

async function pushToUserData(newUserID, userName, userEmail, userPassword){
   let userData = {
        "id" : newUserID,
        "name" : userName,
        "eMail" : userEmail,
        "password" : userPassword,
        }
    console.log(userData);
    await putToStorage("user", userData);
}

async function putToStorage(path, userData){
    let userStorage = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        header: {
            "Content-Type": "application/json"},
        body: JSON.stringify(userData),    
        }
    );
   clearElements();
}

function clearElements(){
    const elements = getElements();
    Object.values(elements).forEach(element =>{
        element.value = ""
    })
}
